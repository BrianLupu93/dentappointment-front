import { Button } from "./ui/button";
import { NavLink } from "react-router";

export interface NavLinksProps {
  isLoggedIn: boolean;
  mobile?: boolean;
}

export function NavLinks({ isLoggedIn, mobile = false }: NavLinksProps) {
  const baseClass = mobile ? "text-lg font-medium" : "text-sm font-medium";

  return (
    <div className={mobile ? "flex flex-col gap-4" : "flex items-center gap-4"}>
      <NavLink to='/' className={baseClass}>
        Home
      </NavLink>

      {isLoggedIn && (
        <>
          <NavLink to='/dashboard' className={baseClass}>
            Dashboard
          </NavLink>

          <NavLink to='/services' className={baseClass}>
            Services
          </NavLink>
        </>
      )}

      {!isLoggedIn ? (
        <Button onClick={() => {}} className='mt-20 sm:mt-0'>
          Login
        </Button>
      ) : (
        <Button onClick={() => {}} className='mt-20 sm:mt-0'>
          Logout
        </Button>
      )}
    </div>
  );
}
