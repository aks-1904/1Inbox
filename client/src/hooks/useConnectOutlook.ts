import toast from "react-hot-toast";

const OUTLOOK_API_URL = `${import.meta.env.VITE_API_URL}/api/v1/outlook`;

export function useConnectOutlook() {
  const token = localStorage.getItem("token");

  const connectOutlook = () => {
    if (!token) {
      toast.error("Connection failed. Please log in again to continue.");
      return;
    }

    const url = `${OUTLOOK_API_URL}/connect?token=${token}`;

    window.open(url);
  };

  return connectOutlook;
}
