import { Link } from "react-router-dom";
import AuthCard from "../components/AuthCard";
import { useAuth } from "../hooks/useAuth";
import { useState } from "react";
import { LuLoader } from "react-icons/lu";

const Signup = () => {
  const { signup, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const signupHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signup(name, email, password);
  };

  return (
    <AuthCard title="Create Your 1Inbox Account">
      <form className="space-y-4" onSubmit={(e) => signupHandler(e)}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full Name"
          className="w-full px-4 py-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent-1"
        />
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
            Sign Up
          </button>
        )}
      </form>
      <p className="text-center mt-4">
        Already have an account?{" "}
        <Link
          to="/login"
          className="text-primary font-semibold hover:underline"
        >
          Login
        </Link>
      </p>
    </AuthCard>
  );
};

export default Signup;
