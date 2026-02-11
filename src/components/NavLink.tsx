import { Button } from "./ui/button";
import { NavLink } from "react-router";
import { SheetClose } from "./ui/sheet";

export interface NavLinksProps {
  isLoggedIn: boolean;
  mobile?: boolean;
  closeMenu: () => void;
}

export function NavLinks({
  isLoggedIn,
  mobile = false,
  closeMenu,
}: NavLinksProps) {
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

      {isLoggedIn && (
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
