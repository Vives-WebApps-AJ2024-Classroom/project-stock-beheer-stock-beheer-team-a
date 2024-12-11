import { useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';

function UserRoleRedirect({ requiredRole, children }) {
  const { user, isSignedIn } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSignedIn && user) {
      console.log("User Info:", user);  // Log user info in console
      const userEmail = user.primaryEmailAddress.emailAddress;
      if (userEmail.endsWith('@student.vives.be')) {
        console.log("Student ingelogd");  // Print message when user is a student
        navigate('/student-dashboard');
      } else if (userEmail.endsWith('@vives.be')) {
        if (requiredRole === 'admin') {
          navigate('/admin-dashboard');
        } else if (requiredRole === 'coach') {
          navigate('/coach-dashboard');
        }
      } else {
        navigate('/'); // Redirect naar home als geen van de rollen matcht
      }
    } else {
      navigate('/'); // Redirect naar home als de gebruiker niet ingelogd is
    }
  }, [user, navigate, requiredRole]);

  return children;
}

export default UserRoleRedirect;
