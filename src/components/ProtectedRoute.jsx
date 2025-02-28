import { Navigate } from 'react-router-dom';
import SideBar from './sidebar/SideBar';
import { useSelector } from "react-redux";


// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ children }) => {
  const user = useSelector((state) => state?.user);
  const { userAuth, userLoading } = user;
  const token =  userAuth?.token?.access
    
    if (userLoading) {
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