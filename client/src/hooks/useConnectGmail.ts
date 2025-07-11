import toast from "react-hot-toast";

const GMAIL_API_URL = `${import.meta.env.VITE_API_URL}/api/v1/gmail`;

export function useConnectGmail() {
  const token = localStorage.getItem("token");

  const connectGmail = () => {
    if (!token) {
      toast("Connecting failed, login again to resolve issue");
      return;
    }

    const url = `${GMAIL_API_URL}/connect?token=${token}`;
    window.open(url);
  };

  return connectGmail;
}
