import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutAction } from '../redux/slices/student/studentSlice';

const Logout = () => { 
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(logoutAction())
    navigate("/login")
  }, [dispatch, navigate]); 

  return (
    <div>Logging out...</div>
  );
};

export default Logout;