import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../contexts/auth_context';
import Cookies from 'js-cookie';

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const token = Cookies.get('token'); // Get the token from cookies
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user and token are valid
    if (!token) {
      navigate('/sign-in');
    } else {
      setIsLoading(false); // User is authenticated
    }
  }, [user, token, navigate]);

  // While checking authentication status, return null to avoid rendering the children
  if (isLoading) return null;

  // If the user is authenticated, render the children
  return children;
};

export default ProtectedRoute;
