import Logo from "./Logo"
import { useContext } from 'react';
import { UserContext } from '../contexts/user.context';
import { useNavigate } from "react-router-dom";

const Navbar = () => {

  const navigate = useNavigate()

  const { logOutUser } = useContext(UserContext);

  const logOut = async () => {
    try {
      // Calling the logOutUser function from the user context.
      const loggedOut = await logOutUser();
      // Now we will refresh the page, and the user will be logged out and
      // redirected to the login page because of the <PrivateRoute /> component.
      if (loggedOut) {
        window.location.reload(true);
      }
    } catch (error) {
      alert(error)
    }
  }

  const handlePass = () => {
    const redirectTo = location.search.replace("?redirectTo=", "");
    navigate(redirectTo ? redirectTo : "/passwords");
  }

  const handleHome = () => {
    const redirectTo = location.search.replace("?redirectTo=", "");
    navigate(redirectTo ? redirectTo : "/");
  }

  return (
    <nav className='bg-[rgb(8 137 153)] text-white flex justify-between p-3 text-xl items-center'>
      <div className="text-3xl font-semibold font-serif flex gap-2"> <Logo/> MyPass </div>
        <ul className="flex gap-5">
          <li onClick={handleHome} className="hover:cursor-pointer hover:underline">Home</li>
          <li onClick={handlePass} className="hover:cursor-pointer hover:underline">Passwords</li>
          <li><button className="hover:cursor-pointer hover:underline" onClick={logOut}>Logout</button></li>
        </ul>
      
    </nav>
  )
}

export default Navbar
