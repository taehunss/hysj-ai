export abstract class WebSocketEventHandler<TEvent, TResponse> {
  abstract handle(event: TEvent): Promise<TResponse>;
}
