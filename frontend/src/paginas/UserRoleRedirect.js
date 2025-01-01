import { useEffect, useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';

function UserRoleRedirect({ requiredRole, children }) {
  const { user, isSignedIn } = useUser();
  const navigate = useNavigate();
  const [role, setRole] = useState(null);

  useEffect(() => {
    if (isSignedIn && user) {
      console.log("User Info:", user);  // Log user info in console
      const userEmail = user.primaryEmailAddress.emailAddress;

    /*  if (userEmail.endsWith('@student.vives.be')) {
        localStorage.setItem('role', '0');
        setRole(0); // Rol is student
        console.log("Student ingelogd");

      } */

      if (userEmail.endsWith('@gmail.com')) {

        localStorage.setItem('role', '2');
        setRole(2); // Rol is admin
        console.log("Admin ingelogd");
        
      } else {
        navigate('/'); // Redirect naar home als geen van de rollen matcht
      }
    } else {
      navigate('/'); // Redirect naar home als de gebruiker niet ingelogd is
    }
  }, [user, navigate, requiredRole]);

  // Pas de navigatie aan nadat de rol is ingesteld
  /*useEffect(() => {
    if (role !== null) {
      console.log("Role is set to:", role); // Log de rol wanneer deze is ingesteld
      if (role === 2) {
        navigate('/student-dashboard');
      } else if (role === 0) {
        navigate('/admin-dashboard');
      } else if (role === 1) {
        navigate('/coach-dashboard');
      }
    }
  }, [role, navigate]); // Depend on role to trigger navigation when it's set*/

  return children;
}

export default UserRoleRedirect;
