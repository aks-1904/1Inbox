import { useState, useEffect } from "react";
import { useAppSelector } from "../redux/store";
import { useGmail } from "../hooks/useGmail";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll";
import Mail from "./Mail";
import type { Email } from "../redux/slice/emailSlice";

interface EmailListProps {
  selectedAccount: string;
}

const EmailList = ({ selectedAccount }: EmailListProps) => {
  const { getEmails } = useGmail();
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const emails: Email[] =
    useAppSelector(
      (store) => store.emails.emails.google?.[selectedAccount]?.emails
    ) || [];

  const nextPageToken = useAppSelector(
    (store) => store.emails.emails.google?.[selectedAccount]?.nextPageToken
  );

  const fetchMoreEmails = async () => {
    if (!selectedAccount || loading || !hasMore) return;
  
    setLoading(true);
    const moreAvailable = await getEmails(selectedAccount, nextPageToken);
  
    setHasMore(moreAvailable);
    setLoading(false);
  };

  useEffect(() => {
    if (selectedAccount && emails.length === 0) {
      setHasMore(true);
      fetchMoreEmails();
    }
  }, [selectedAccount]);

  const lastEmailRef = useInfiniteScroll(fetchMoreEmails, loading, hasMore);

  return (
    <div className="overflow-y-auto">
      {emails.map((email, idx) => {
        const isLast = idx === emails.length - 1;
        const domain = selectedAccount.split("@")[1];
        const provider =
          domain === "gmail.com"
            ? "Gmail"
            : domain === "outlook.com"
            ? "Outlook"
            : "Other";

        const today = new Date();
        const emailDate = new Date(email.date);
        const timeDiff = today.getTime() - emailDate.getTime();
        const dayDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

        return (
          <div key={email?.id} ref={isLast ? lastEmailRef : null}>
            <Mail key={email?.id} email={email} dayDiff={dayDiff} provider={provider} />
          </div>
        );
      })}

      {loading && (
        <div className="w-full py-4 flex justify-center">
          <span className="text-white">Loading more emails...</span>
        </div>
      )}
    </div>
  );
};

export default EmailList;
