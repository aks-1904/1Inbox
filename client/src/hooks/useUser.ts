import axios from "axios";
import toast from "react-hot-toast";
import { useAppDispatch } from "../redux/store";
import { setUser, setUserLoading } from "../redux/slice/userSlice";

const USER_API_URL = `${import.meta.env.VITE_API_URL}/api/v1/user`;

export function useUser() {
  const dispatch = useAppDispatch();

  const getProfileData = async () => {
    setUserLoading(true);
    try {
      const res = await axios.get(`${USER_API_URL}/profile`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (res.data?.success) {
        dispatch(setUser(res.data?.user));
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    } finally {
      setUserLoading(false);
    }
  };

  return { getProfileData };
}
