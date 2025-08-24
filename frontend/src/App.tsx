import { AxiosProvider } from "./api/AxiosProvider";
import { GlobalBase } from "./App.style";
import ChatRoom from "./chat/component/ChatRoom";

function App() {
  const baseURL = (import.meta as any)?.env?.VITE_API_BASE_URL || "/api";
  return (
    <AxiosProvider config={{ baseURL }}>
      <GlobalBase />
      <ChatRoom />
    </AxiosProvider>
  );
}

export default App;
