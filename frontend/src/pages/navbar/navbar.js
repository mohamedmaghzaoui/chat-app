import { useContext } from 'react';
import { UnauthenticatedNavbar } from './unauthenticatedNavbar';
import { AuthenticatedNavbar } from './authenticatedNavbar';
import { UserContext } from '../../Contexts/userContext';

export const Navbar = () => {
  const { userData } = useContext(UserContext);
  console.log(userData);
  return userData ? <AuthenticatedNavbar /> : <UnauthenticatedNavbar />;
};
