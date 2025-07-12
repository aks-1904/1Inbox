import axios from "axios";
import { useAppDispatch } from "../redux/store";
import { setEmails, setLoading } from "../redux/slice/emailSlice";
import toast from "react-hot-toast";

const GMAIL_API_URL = `${import.meta.env.VITE_API_URL}/api/v1/gmail`;

export function useGmail() {
  const dispatch = useAppDispatch();

  const getEmails = async (
    email: string,
    nextPageToken?: string
  ): Promise<boolean> => {
    dispatch(setLoading(true));
    try {
      const API_REQUEST_URL = `${GMAIL_API_URL}/emails?email=${email}${
        nextPageToken ? `&pageToken=${encodeURIComponent(nextPageToken)}` : ""
      }`;

      const res = await axios.get(API_REQUEST_URL, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (res.data?.success) {
        const hasMore = !!res.data?.nextPageToken;

        dispatch(
          setEmails({
            provider: "google",
            account: email,
            emails: res.data?.emails,
            nextPageToken: res?.data?.nextPageToken,
          })
        );

        return hasMore;
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Cannot get mails");
    } finally {
      dispatch(setLoading(false));
    }
    return false;
  };

  return { getEmails };
}
