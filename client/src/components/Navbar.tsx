import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

type NavbarProps = {
  user: boolean;
};

const Navbar: React.FC<NavbarProps> = ({ user }) => {
  const { logout } = useAuth();
  return (
    <nav className="flex justify-between items-center p-4 bg-transparent shadow w-full">
      <div className="flex items-center justify-center">
        <img src="./logo.png" alt="logo" width={50} height={50} />
        <h1 className="text-2xl font-extrabold">1Inbox</h1>
      </div>
      <div className="space-x-4">
        {user ? (
          <div className="flex gap-5">
            <Link
              to="/inbox"
              className="bg-primary text-white px-4 py-2 rounded hover:bg-secondary transition-colors duration-150"
            >
              Go to Inbox
            </Link>
            <button
              onClick={() => logout()}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors duration-150"
            >
              Logout
            </button>
          </div>
        ) : (
          <>
            <Link
              to="/login"
              className="text-primary font-semibold hover:underline"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-primary text-white px-4 py-2 rounded hover:bg-secondary duration-150 transition-colors"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
