import { TbDental } from "react-icons/tb";
import ThemeSwitch from "./ThemeSwitch";
import { Sheet, SheetTrigger, SheetContent, SheetTitle } from "./ui/sheet";
import { IoMenu } from "react-icons/io5";
import { NavLinks } from "./NavLink";
const Navbar = () => {
  const isLoggedIn = true;

  return (
    <header className='w-full border-b border-black dark:border-white'>
      <div className='w-full max-w-5xl mx-auto flex h-16 items-center justify-between px-8 sm:px-16'>
        {/* Logo */}
        <TbDental size={30} />
        {/* Desktop */}
        <div className='hidden md:flex items-center gap-6'>
          <ThemeSwitch />
          <NavLinks isLoggedIn={isLoggedIn} />
        </div>
        {/* Mobile */}
        <div className='md:hidden'>
          <Sheet>
            <SheetTrigger asChild>
              <IoMenu size={30} aria-label='Open menu' />
            </SheetTrigger>
            <SheetTitle hidden />
            <SheetContent side='right' className='w-64'>
              <div className='mt-10 flex flex-col gap-6 p-6'>
                <ThemeSwitch />
                <NavLinks isLoggedIn={isLoggedIn} mobile />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
