import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useAppSelector } from "../redux/store";
import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";

const Login = () => {
  const { user, loading } = useAppSelector((store) => store.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate("/inbox");
    }
  }, [user, navigate]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useAuth();

  return (
    <div className="relative flex size-full min-h-screen flex-col bg-[#0f1a24] dark group/design-root overflow-x-hidden">
      <div className="layout-container flex h-full grow flex-col">
        <Navbar user={false} />
        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col w-[512px] max-w-[512px] py-5 md:max-w-[960px] flex-1">
            <h2 className="text-white tracking-light text-[28px] font-bold leading-tight px-4 text-center pb-3 pt-5">
              Welcome back
            </h2>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                console.log("hello")
                await login(email, password);
              }}
            >
              <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
                <label className="flex flex-col min-w-40 flex-1">
                  <p className="text-white text-base font-medium leading-normal pb-2">
                    Email
                  </p>
                  <input
                    placeholder="Enter your email"
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-0 border border-[#2e4e6b] bg-[#172736] focus:border-[#2e4e6b] h-14 placeholder:text-[#8daece] p-[15px] text-base font-normal leading-normal"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </label>
              </div>
              <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
                <label className="flex flex-col min-w-40 flex-1">
                  <p className="text-white text-base font-medium leading-normal pb-2">
                    Password
                  </p>
                  <input
                    type="password"
                    placeholder="Enter your password"
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-0 border border-[#2e4e6b] bg-[#172736] focus:border-[#2e4e6b] h-14 placeholder:text-[#8daece] p-[15px] text-base font-normal leading-normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </label>
              </div>
              <p className="text-[#8daece] text-sm font-normal leading-normal pb-3 pt-1 px-4 underline">
                not have and account?{" "}
                <span
                  className="text-blue-500 hover:cursor-pointer"
                  onClick={() => navigate("/signup")}
                >
                  Create One
                </span>
              </p>
              <div className="flex px-4 py-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 flex-1 bg-[#359dff] text-[#0f1a24] text-base font-bold leading-normal tracking-[0.015em]"
                >
                  <span className="truncate">Log in</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
