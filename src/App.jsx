import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./components/LoginForm";
import Logout from "./components/Logout";
import Registration from "./components/RegistrationForm";
import Dashboard from "./components/Dashboard";
import { AuthProvider } from "./components/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import StudentList from "./pages/students/StudentList";
import StudentDetails from "./pages/students/StudentDetails";
import NewAdmissionPage from "./pages/students/NewAdmissionPage";
import ClassList from "./pages/class/ClassList";
function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/register" element={<Registration />} />{" "}
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/student-list" element={<ProtectedRoute><StudentList /></ProtectedRoute>} />
          <Route path="/student-details" element={<ProtectedRoute><StudentDetails /></ProtectedRoute>} />
          <Route path="/new-admission" element={<ProtectedRoute><NewAdmissionPage /></ProtectedRoute>} />
          <Route path="/class" element={<ProtectedRoute><ClassList /></ProtectedRoute>} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
