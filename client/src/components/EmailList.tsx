import { useState, useEffect, useCallback } from "react";
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

  // ✅ FIXED: `useCallback` now depends directly on state and props.
  // This eliminates the race condition caused by using `useRef`.
  const fetchMoreEmails = useCallback(async () => {
    if (!selectedAccount || !provider || loading || !hasMore) {
      return;
    }

    setLoading(true);
    try {
      let moreAvailable = false;
      if (provider === "google") {
        moreAvailable = await getGmailEmails(selectedAccount, nextPageToken);
      } else if (provider === "microsoft") {
        // This relies on your `useOutlook` hook correctly handling the token
        // (which is an `@odata.nextLink` URL) and returning a boolean.
        moreAvailable = await getOutlookEmails(selectedAccount, nextPageToken);
      }
      setHasMore(moreAvailable);
    } catch (error) {
      console.error("Failed to fetch more emails:", error);
      setHasMore(false); // Stop trying to fetch on error
    } finally {
      setLoading(false);
    }
  }, [
    selectedAccount,
    provider,
    loading,
    hasMore,
    nextPageToken,
    getGmailEmails,
    getOutlookEmails,
  ]);

  // ✅ FIXED: Effect logic is now more robust for handling account switches.
  useEffect(() => {
    if (selectedAccount && provider) {
      // Check if we have switched to a new account
      if (selectedAccount !== fetchedAccount) {
        // Reset state for the new account
        setHasMore(true);
        setFetchedAccount(selectedAccount);

        // Fetch emails if they don't already exist in the Redux store for this account.
        if (!accountData || accountData.emails.length === 0) {
          fetchMoreEmails();
        }
      }
    } else {
      // Clear the fetched account if no account is selected
      setFetchedAccount(null);
    }
  }, [selectedAccount, provider, fetchedAccount, accountData, fetchMoreEmails]);

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
            <Mail account={selectedAccount} email={email} dayDiff={dayDiff} provider={providerName} />
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

      {/* ✅ ADDED: Message to show when all emails have been loaded */}
      {!loading && !hasMore && emails.length > 0 && (
        <div className="text-center text-gray-400 mt-4 mb-4">
          No more emails found.
        </div>
      )}

      {/* Existing messages */}
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
