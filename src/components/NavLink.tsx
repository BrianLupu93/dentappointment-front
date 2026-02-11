import { Button } from "./ui/button";
import { NavLink } from "react-router";
import { useNavigate } from "react-router";
import { useAuth, type User } from "@/context/auth/authContext";

export interface NavLinksProps {
  user: User | null;
  mobile?: boolean;
  closeMenu: () => void;
}

export function NavLinks({ user, mobile = false, closeMenu }: NavLinksProps) {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const baseClass = mobile ? "text-lg font-medium" : "text-sm font-medium";

  return (
    <div className={mobile ? "flex flex-col gap-4" : "flex items-center gap-4"}>
      <NavLink
        to='/'
        className={baseClass}
        onClick={() => mobile && closeMenu()}
      >
        Appointment
      </NavLink>

      {user && (
        <>
          <NavLink
            to='/dashboard'
            className={baseClass}
            onClick={() => mobile && closeMenu()}
          >
            Dashboard
          </NavLink>

          <NavLink
            to='/services'
            className={baseClass}
            onClick={() => mobile && closeMenu()}
          >
            Services
          </NavLink>
        </>
      )}

      {!user ? (
        <Button
          onClick={() => {
            if (mobile) closeMenu();
            navigate("/login");
          }}
          className='mt-20 sm:mt-0'
        >
          Login
        </Button>
      ) : (
        <Button
          onClick={(e) => {
            e.preventDefault();
            logout();
            mobile && closeMenu();
            navigate("/");
          }}
          className='mt-20 sm:mt-0'
        >
          Logout
        </Button>
      )}
    </div>
  );
}
