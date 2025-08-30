import { AxiosProvider } from "./api/AxiosProvider";
import { GlobalBase } from "./App.style";
import { LoginPage } from "./login/component/LoginPage";

function App() {
  const baseURL = (import.meta as any)?.env?.VITE_API_BASE_URL || "/api";
  return (
    <AxiosProvider config={{ baseURL }}>
      <GlobalBase />
      <LoginPage />
    </AxiosProvider>
  );
}

export default App;
