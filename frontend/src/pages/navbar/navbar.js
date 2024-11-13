import { useContext } from 'react';
import { UnauthenticatedNavbar } from './unauthenticatedNavbar';
import { AuthenticatedNavbar } from './authenticatedNavbar';
import { UserContext } from '../../Contexts/userContext';
export const Navbar = () => {
  const { username } = useContext(UserContext);
  console.log(username);
  return username ? <AuthenticatedNavbar /> : <UnauthenticatedNavbar />;
};
