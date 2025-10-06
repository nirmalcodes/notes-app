import React from 'react';
import { ThemeProvider } from '@/components/common/ThemeProvider';
import { Link, Outlet } from 'react-router';
import ThemeModeToggle from '@/components/common/ThemeModeToggle';
import { NotebookPen } from 'lucide-react';
import ProfileDropdown from '@/components/common/ProfileDropdown';

const MainLayout = () => {
  const DateYear: number = new Date().getFullYear();

  return (
    <>
      {/* <ThemeProvider defaultTheme="light" storageKey="theme"> */}
      <div className="flex min-h-screen flex-col">
        <header className="sticky top-0 flex shrink-0 items-center gap-2 border-b bg-background px-4 py-2">
          <Link to="/" className="flex items-center gap-1 text-2xl font-bold text-primary">
            <NotebookPen />
            MemoPad
          </Link>

          <div className="ml-auto flex items-center gap-x-3">
            <ThemeModeToggle />
            <ProfileDropdown />
          </div>
        </header>
        <Outlet />
        <footer className="mt-auto flex items-center border-t bg-background px-4 py-2 text-sm text-muted-foreground">
          <p className="mr-auto">&copy; {DateYear} MemoPad. All rights reserved.</p>
          <p className="">
            Made with ❤️ by{' '}
            <a
              href="https://srnfernando.vercel.app/"
              target="_blank"
              rel="noopener"
              className="font-semibold transition duration-300 ease-in-out hover:text-primary hover:underline hover:decoration-primary hover:underline-offset-4"
            >
              Nirmal Fernando
            </a>
          </p>
        </footer>
      </div>
      {/* </ThemeProvider> */}
    </>
  );
};

export default MainLayout;
