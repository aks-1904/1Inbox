import axios from "axios";
import { useAppDispatch } from "../redux/store";
import { setEmails } from "../redux/slice/emailSlice";

const GMAIL_API_URL = `${import.meta.env.VITE_API_URL}/api/v1/gmail`;

export function useGmail() {
  const dispatch = useAppDispatch();

  const getEmails = async (email: string, nextPageToken?: number) => {
    const res = await axios.get(
      `${GMAIL_API_URL}/emails?email=${email}&pageToken=${nextPageToken}`
    );
    if (res.data?.sucess) {
      dispatch(
        setEmails({
          provider: "google",
          account: email,
          emails: res.data?.emails,
        })
      );
    }
  };

  return { getEmails };
}
