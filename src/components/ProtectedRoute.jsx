import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './AuthContext'; // Adjust the import path as necessary
import SideBar from './sidebar/SideBar';


// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ children }) => {
    const { token, loading } = useContext(AuthContext);
    console.log("token", token);
    
    if (loading) {
          return null;
    }

    if (!token) {
        // User not authenticated, redirect to login page
        return <Navigate to="/login" replace />;
    }

    return (
        <div>
          <SideBar />
          <div>{children}</div>
        </div>
      );
};

export default ProtectedRoute;