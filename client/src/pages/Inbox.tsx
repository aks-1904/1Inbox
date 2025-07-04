import { useEffect, useState } from "react";
import { FaPlusCircle } from "react-icons/fa";
import Mail from "../components/Mail";
import type { Email } from "../redux/slice/emailSlice";
import Navbar from "../components/Navbar";
import { useAppSelector } from "../redux/store";

interface EmailAccount {
  type: "gmail" | "outlook";
  email: string;
  connected: boolean;
  color: string;
}

const Inbox = () => {
  const [accounts, setAccounts] = useState<EmailAccount[]>([]);
  const [emails, setEmails] = useState<Email[]>([]);

  useEffect(() => {
    // Example demo data
    setAccounts([
      {
        type: "gmail",
        email: "you@gmail.com",
        connected: true,
        color: "text-red-500",
      },
      {
        type: "outlook",
        email: "you@outlook.com",
        connected: false,
        color: "text-blue-500",
      },
    ]);

    setEmails([
      {
        id: "1",
        subject: "Welcome to 1Inbox!",
        body: "Thanks for signing up. We’re excited to have you onboard.",
        from: "support@1inbox.com",
        to: "you@gmail.com",
        accountEmail: "you@gmail.com",
        date: "2025-07-04",
      },
      {
        id: "2",
        subject: "Meeting Reminder",
        body: "You have a meeting scheduled tomorrow at 10 AM. Please join via the provided link.",
        from: "calendar@outlook.com",
        to: "you@outlook.com",
        accountEmail: "you@outlook.com",
        date: "2025-07-03",
      },
    ]);
  }, []);

  const user = useAppSelector((store) => store.user.user);

  return (
    <div>
      <Navbar user={user ? true : false} />
      <div className="grid grid-cols-1 md:grid-cols-4 min-h-screen">
        {/* Sidebar */}
        <aside className="md:col-span-1 bg-gray-50 p-4 border-r space-y-4 shadow-sm">
          <h2 className="text-xl font-bold mb-2">Accounts</h2>
          {accounts.map((acc) => (
            <div
              key={acc.email}
              className={`flex items-center justify-between p-3 rounded-lg border ${
                acc.connected ? "bg-green-100" : "bg-red-100"
              } shadow-sm`}
            >
              <div className="text-sm font-medium">
                {acc.type.toUpperCase()}
                <br />
                <span className={acc.color}>{acc.email}</span>
              </div>
              {!acc.connected && (
                <button className="text-xs px-2 py-1 border rounded hover:bg-gray-200">
                  Connect
                </button>
              )}
            </div>
          ))}
        </aside>

        {/* Inbox */}
        <main className="md:col-span-3 p-6 space-y-6 bg-white">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold text-gray-800">Inbox</h1>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              <FaPlusCircle className="h-5 w-5" /> Add Account
            </button>
          </div>

          <div className="space-y-4">
            {emails.map((email, index) => {
              const accountColor =
                accounts.find((acc) => acc.email === email.accountEmail)
                  ?.color || "text-gray-500";
              return (
                <Mail
                  accountColor={accountColor}
                  key={email.id}
                  email={email}
                  index={index}
                />
              );
            })}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Inbox;
