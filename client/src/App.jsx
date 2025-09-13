import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Chat from "./pages/Chat";
import Forgot from "./pages/Forgot";
import ProtectedRoute from "./components/ProtecedRoute";

function App() {

  const token = localStorage.getItem("token");

  return (
    <BrowserRouter>
      <Routes>
        {/* If token exists, redirect from login/forgot to /chat */}
        <Route
          path="/"
          element={token ? <Navigate to="/chat" /> : <Login />}
        />
        <Route
          path="/forgot"
          element={token ? <Navigate to="/chat" /> : <Forgot />}
        />

        {/* Protect /chat route */}
        <Route
          path="/chat"
          element={<ProtectedRoute> <Chat /> </ProtectedRoute>}
        />

        {/* Catch-all route */}
        <Route
          path="*"
          element={<Navigate to={token ? "/chat" : "/"} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
