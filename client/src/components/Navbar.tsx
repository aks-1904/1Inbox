import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

interface NavbarProps {
  user: boolean;
}

const Navbar = ({ user }: NavbarProps) => {
  const { logout } = useAuth();
  
  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#20364b] px-10 py-3">
      <div className="flex items-center gap-4 text-white">
        <div className="size-4">
          <svg
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M6 6H42L36 24L42 42H6L12 24L6 6Z" fill="currentColor" />
          </svg>
        </div>
        <h2 className="text-white text-lg font-bold leading-tight tracking-[-0.015em]">
          1Inbox
        </h2>
      </div>
      <div className="flex flex-1 justify-end gap-8">
        <div className="flex gap-2">
          {user ? (
            <>
              <Link
                to="/inbox"
                className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#359dff] text-[#0f1a24] text-sm font-bold leading-normal tracking-[0.015em]"
              >
                <span className="truncate">Go to Inbox</span>
              </Link>
              <button
                onClick={() => logout()}
                className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#20364b] text-white text-sm font-bold leading-normal tracking-[0.015em]"
              >
                <span className="truncate">Logout</span>
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#359dff] text-[#0f1a24] text-sm font-bold leading-normal tracking-[0.015em]"
              >
                <span className="truncate">Login</span>
              </Link>
              <Link
                to="/signup"
                className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#20364b] text-white text-sm font-bold leading-normal tracking-[0.015em]"
              >
                <span className="truncate">Signup</span>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
