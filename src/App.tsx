import type { ReactElement } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "./state/AuthContext";
import { LoginPage } from "./pages/LoginPage";
import { BoardPage } from "./pages/BoardPage";

function ProtectedRoute({ children }: { children: ReactElement }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

export default function App() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route
        path="/login"
        element={isAuthenticated ? <Navigate to="/board" replace /> : <LoginPage />}
      />
      <Route
        path="/board"
        element={
          <ProtectedRoute>
            <BoardPage />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to={isAuthenticated ? "/board" : "/login"} replace />} />
    </Routes>
  );
}
