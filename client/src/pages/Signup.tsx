import { Link } from "react-router-dom";
import AuthCard from "../components/AuthCard";

const Signup = () => (
  <AuthCard title="Create Your 1Inbox Account">
    <form className="space-y-4">
      <input
        type="text"
        placeholder="Full Name"
        className="w-full px-4 py-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent-1"
      />
      <input
        type="email"
        placeholder="Email"
        className="w-full px-4 py-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent-1"
      />
      <input
        type="password"
        placeholder="Password"
        className="w-full px-4 py-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent-1"
      />
      <button
        type="submit"
        className="w-full bg-primary text-white py-3 rounded hover:bg-secondary transition"
      >
        Sign Up
      </button>
    </form>
    <p className="text-center mt-4">
      Already have an account?{" "}
      <Link to="/login" className="text-primary font-semibold hover:underline">
        Login
      </Link>
    </p>
  </AuthCard>
);

export default Signup;
