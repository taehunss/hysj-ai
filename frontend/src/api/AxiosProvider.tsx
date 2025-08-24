import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import React, { createContext, useContext, useMemo } from "react";

export interface HttpClientConfig extends AxiosRequestConfig {
  baseURL: string;
}

interface AxiosContextValue {
  client: AxiosInstance;
  request: <TResponse = unknown, TBody = unknown>(
    config: AxiosRequestConfig<TBody>
  ) => Promise<TResponse>;
  get: <TResponse = unknown, TQuery = unknown>(
    url: string,
    config?: AxiosRequestConfig<TQuery>
  ) => Promise<TResponse>;
  post: <TResponse = unknown, TBody = unknown>(
    url: string,
    data?: TBody,
    config?: AxiosRequestConfig<TBody>
  ) => Promise<TResponse>;
  put: <TResponse = unknown, TBody = unknown>(
    url: string,
    data?: TBody,
    config?: AxiosRequestConfig<TBody>
  ) => Promise<TResponse>;
  patch: <TResponse = unknown, TBody = unknown>(
    url: string,
    data?: TBody,
    config?: AxiosRequestConfig<TBody>
  ) => Promise<TResponse>;
  del: <TResponse = unknown, TQuery = unknown>(
    url: string,
    config?: AxiosRequestConfig<TQuery>
  ) => Promise<TResponse>;
}

const AxiosContext = createContext<AxiosContextValue | null>(null);

export const AxiosProvider: React.FC<{
  children: React.ReactNode;
  config: HttpClientConfig;
}> = ({ children, config }) => {
  const client = useMemo(() => {
    const instance = axios.create({
      timeout: 15000,
      withCredentials: false,
      ...config,
    });

    instance.interceptors.request.use((cfg) => {
      return cfg;
    });

    instance.interceptors.response.use(
      (res) => res,
      (error) => {
        return Promise.reject(error);
      }
    );

    return instance;
  }, [config]);

  const value = useMemo<AxiosContextValue>(() => {
    const unwrap = <T,>(p: Promise<AxiosResponse<T>>): Promise<T> =>
      p.then((r) => r.data);

    return {
      client,
      request: async <TResponse, TBody>(cfg: AxiosRequestConfig<TBody>) =>
        unwrap<TResponse>(
          client.request<TResponse, AxiosResponse<TResponse>, TBody>(cfg)
        ),
      get: async <TResponse, TQuery>(
        url: string,
        cfg?: AxiosRequestConfig<TQuery>
      ) =>
        unwrap<TResponse>(
          client.get<TResponse, AxiosResponse<TResponse>, TQuery>(url, cfg)
        ),
      post: async <TResponse, TBody>(
        url: string,
        data?: TBody,
        cfg?: AxiosRequestConfig<TBody>
      ) =>
        unwrap<TResponse>(
          client.post<TResponse, AxiosResponse<TResponse>, TBody>(
            url,
            data,
            cfg
          )
        ),
      put: async <TResponse, TBody>(
        url: string,
        data?: TBody,
        cfg?: AxiosRequestConfig<TBody>
      ) =>
        unwrap<TResponse>(
          client.put<TResponse, AxiosResponse<TResponse>, TBody>(url, data, cfg)
        ),
      patch: async <TResponse, TBody>(
        url: string,
        data?: TBody,
        cfg?: AxiosRequestConfig<TBody>
      ) =>
        unwrap<TResponse>(
          client.patch<TResponse, AxiosResponse<TResponse>, TBody>(
            url,
            data,
            cfg
          )
        ),
      del: async <TResponse, TQuery>(
        url: string,
        cfg?: AxiosRequestConfig<TQuery>
      ) =>
        unwrap<TResponse>(
          client.delete<TResponse, AxiosResponse<TResponse>, TQuery>(url, cfg)
        ),
    };
  }, [client]);

  return (
    <AxiosContext.Provider value={value}>{children}</AxiosContext.Provider>
  );
};

export const useAxios = () => {
  const ctx = useContext(AxiosContext);
  if (!ctx) throw new Error("useAxios must be used within AxiosProvider");
  return ctx;
};

export type HttpResult<T> = Promise<T>;
