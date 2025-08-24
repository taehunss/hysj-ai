import { AxiosProvider } from "./api/AxiosProvider";
import ChatRoom from "./chat/component/ChatRoom";

function App() {
  const baseURL = (import.meta as any)?.env?.VITE_API_BASE_URL || "/api";
  return (
    <AxiosProvider config={{ baseURL }}>
      <ChatRoom />
    </AxiosProvider>
  );
}

export default App;
