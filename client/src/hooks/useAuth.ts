import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const AUTH_API_URL = `${import.meta.env.VITE_API_URL}/api/v1/auth`;

export function useAuth() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const signup = async (name: string, email: string, password: string) => {
    setLoading(true);
    try {
      const res = await axios.post(`${AUTH_API_URL}/signup`, {
        name,
        email,
        password,
      });
      if (res.data?.success) {
        localStorage.setItem("token", res.data?.token);
        toast.success(res?.data?.message || "signuped successfully");
        navigate("/inbox");
      }
    } catch (error: any) {
      const msg = error?.response?.data?.message || "Registration Failed";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const res = await axios.post(`${AUTH_API_URL}/login`, {
        email,
        password,
      });
      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        navigate("/inbox");
        toast.success(res.data.message || "Logged In successfully");
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    toast.success("Logged out successfully");
  };

  return {
    signup,
    login,
    logout,
    loading,
  };
}
