import { Link } from "react-router-dom";
import AuthCard from "../components/AuthCard";
import { LuLoader } from "react-icons/lu";
import { useAuth } from "../hooks/useAuth";
import { useState } from "react";

const Login = () => {
  const { loading, login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <AuthCard title="Login to 1Inbox">
      <form className="space-y-4" onSubmit={(e) => loginHandler(e)}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full px-4 py-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent-1"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full px-4 py-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent-1"
        />
        {loading ? (
          <button
            disabled
            className="w-full bg-primary cursor-not-allowed text-white py-3 rounded hover:bg-secondary transition flex items-center justify-center"
          >
            <LuLoader className="mr-2 animate-spin" />
            Please Wait...
          </button>
        ) : (
          <button
            type="submit"
            className="w-full bg-primary text-white py-3 rounded hover:bg-secondary transition"
          >
            Login
          </button>
        )}
      </form>
      <p className="text-center mt-4">
        Don't have an account?{" "}
        <Link
          to="/signup"
          className="text-primary font-semibold hover:underline"
        >
          Sign up
        </Link>
      </p>
    </AuthCard>
  );
};

export default Login;
