import { useState, useEffect, useCallback, useRef } from "react";
import { useAppSelector } from "../redux/store";
import { useGmail } from "../hooks/useGmail";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll";
import Mail from "./Mail";
import type { Email } from "../redux/slice/emailSlice";
import { useOutlook } from "../hooks/useOutlook";

interface EmailListProps {
  selectedAccount: string;
  provider: "google" | "microsoft" | "";
}

const EmailList = ({ selectedAccount, provider }: EmailListProps) => {
  const { getEmails: getGmailEmails } = useGmail();
  const { getEmails: getOutlookEmails } = useOutlook();

  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [fetchedAccount, setFetchedAccount] = useState<string | null>(null);

  const accountData = useAppSelector((store) =>
    provider ? store.emails.emails?.[provider]?.[selectedAccount] : undefined
  );

  const emails: Email[] = accountData?.emails || [];
  const nextPageToken = accountData?.nextPageToken || "";

  const fetchStateRef = useRef({
    loading,
    hasMore,
    nextPageToken,
    selectedAccount,
    provider,
  });

  useEffect(() => {
    fetchStateRef.current = {
      loading,
      hasMore,
      nextPageToken,
      selectedAccount,
      provider,
    };
  }, [loading, hasMore, nextPageToken, selectedAccount, provider]);

  const fetchMoreEmails = useCallback(async () => {
    const { loading, hasMore, nextPageToken, selectedAccount, provider } =
      fetchStateRef.current;

    if (!selectedAccount || !provider || loading || !hasMore) return;

    setLoading(true);

    let moreAvailable = false;
    if (provider === "google") {
      moreAvailable = await getGmailEmails(selectedAccount, nextPageToken);
    } else if (provider === "microsoft") {
      moreAvailable = await getOutlookEmails(selectedAccount, nextPageToken);
    }

    setHasMore(moreAvailable);
    setLoading(false);
  }, [getGmailEmails, getOutlookEmails]);

  useEffect(() => {
    if (selectedAccount && selectedAccount !== fetchedAccount) {
      setHasMore(true);
      if (emails.length === 0) {
        fetchMoreEmails();
      }
      setFetchedAccount(selectedAccount);
    }
  }, [selectedAccount, fetchedAccount, emails.length, fetchMoreEmails]);

  const lastEmailRef = useInfiniteScroll(fetchMoreEmails, loading, hasMore);

  return (
    <div className="overflow-y-auto">
      {emails.map((email, idx) => {
        const isLast = idx === emails.length - 1;
        const providerName = provider === "google" ? "Gmail" : "Outlook";
        const today = new Date();
        const emailDate = new Date(email.date);
        const timeDiff = today.getTime() - emailDate.getTime();
        const dayDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

        return (
          <div key={`${email?.id}-${idx}`} ref={isLast ? lastEmailRef : null}>
            <Mail email={email} dayDiff={dayDiff} provider={providerName} />
          </div>
        );
      })}

      {loading && (
        <div className="w-full py-4 flex justify-center">
          <span className="text-white animate-pulse">
            Loading more emails...
          </span>
        </div>
      )}
      {!loading && emails.length === 0 && selectedAccount && (
        <div className="text-center text-gray-400 mt-10">
          No emails found for this account.
        </div>
      )}
      {!loading && !selectedAccount && (
        <div className="text-center text-gray-400 mt-10">
          Select an account to view emails.
        </div>
      )}
    </div>
  );
};

export default EmailList;
