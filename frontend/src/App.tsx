import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import { AxiosProvider } from "./api/AxiosProvider";
import { GlobalBase } from "./App.style";
import ChatRoom from "./chat/component/ChatRoom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { LoginPage } from "./login/component/LoginPage";

// 인증이 필요한 페이지를 보호하는 컴포넌트
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

// 이미 로그인한 사용자를 채팅 페이지로 리다이렉트하는 컴포넌트
const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/chat" replace />;
  }

  return <>{children}</>;
};

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />
        <Route
          path="/chat"
          element={
            <ProtectedRoute>
              <ChatRoom />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

function App() {
  const baseURL = (import.meta as any)?.env?.VITE_API_BASE_URL || "";
  return (
    <AuthProvider>
      <AxiosProvider config={{ baseURL }}>
        <GlobalBase />
        <AppRoutes />
      </AxiosProvider>
    </AuthProvider>
  );
}

export default App;
