import axios from "axios";
import { useAppDispatch } from "../redux/store";
import { setEmailBody, setEmails, setLoading } from "../redux/slice/emailSlice";
import toast from "react-hot-toast";

const OUTLOOK_API_URL = `${import.meta.env.VITE_API_URL}/api/v1/outlook`;

export function useOutlook() {
  const dispatch = useAppDispatch();

  const getEmails = async (
    email: string,
    skipToken?: string
  ): Promise<boolean> => {
    dispatch(setLoading(true));
    try {
      // Construct the request URL, adding the skipToken for pagination if it exists.
      const API_REQUEST_URL = `${OUTLOOK_API_URL}/emails?email=${email}${
        skipToken ? `&nextPageCursor=${encodeURIComponent(skipToken)}` : ""
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
            provider: "microsoft",
            account: email,
            emails: res.data?.emails,
            nextPageToken: res?.data?.nextPageCursor,
          })
        );

        return hasMore;
      }
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Cannot get Outlook emails"
      );
    } finally {
      dispatch(setLoading(false));
    }
    return false;
  };

  const getEmailBody = async (email: string, messageId: string) => {
    const API_REQUEST_URL = `${OUTLOOK_API_URL}/full-message?email=${email}&messageId=${messageId}`;

    const res = await axios.get(API_REQUEST_URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (res?.data?.success) {
      dispatch(
        setEmailBody({
          provider: "microsoft",
          account: email,
          emailId: messageId,
          body: res?.data?.body,
        })
      );
    }
  };

  return { getEmails, getEmailBody };
}
