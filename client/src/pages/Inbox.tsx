import { useEffect, useState } from "react";
import { FaBars, FaPlusCircle, FaTimes } from "react-icons/fa";
import Mail from "../components/Mail";
import type { Email } from "../redux/slice/emailSlice";
import Navbar from "../components/Navbar";
import { useAppSelector } from "../redux/store";
import Account from "../components/Account";

export interface EmailAccount {
  type: "gmail" | "outlook";
  email: string;
  connected: boolean;
  color: string;
}

const Inbox = () => {
  const [accounts, setAccounts] = useState<EmailAccount[]>([]);
  const [emails, setEmails] = useState<Email[]>([]);
  const [showSidebar, setShowSidebar] = useState(false); // For mobile sidebar

  useEffect(() => {
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
    <div className="h-screen flex flex-col">
      {/* Navbar */}
      <Navbar user={!!user} />

      {/* Divider */}
      <div className="border-b border-gray-300" />

      {/* Mobile sidebar toggle */}
      <div className="md:hidden flex justify-between items-center px-4 py-2 border-b border-gray-300">
        <h1 className="text-xl font-semibold">Inbox</h1>
        <button onClick={() => setShowSidebar(true)} className="text-2xl">
          <FaBars />
        </button>
      </div>

      {/* Main content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Desktop Sidebar */}
        <aside className="w-64 border-r bg-gray-50 p-4 shadow-sm sticky top-0 h-screen overflow-y-auto hidden md:block">
          <h2 className="text-xl font-bold mb-4">Accounts</h2>
          <div className="space-y-4">
            {accounts.map((acc, index) => (
              <Account key={index} data={acc} />
            ))}
          </div>
        </aside>

        {/* Mobile Sidebar Drawer */}
        {showSidebar && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex md:hidden">
            <div className="w-64 bg-white p-4 overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Accounts</h2>
                <button
                  onClick={() => setShowSidebar(false)}
                  className="text-lg"
                >
                  <FaTimes />
                </button>
              </div>
              <div className="space-y-4">
                {accounts.map((acc, index) => (
                  <Account key={index} data={acc} />
                ))}
              </div>
            </div>
            <div className="flex-1" onClick={() => setShowSidebar(false)}></div>
          </div>
        )}

        {/* Inbox */}
        <main className="flex-1 p-4 md:p-6 overflow-y-auto bg-white">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="hidden md:block text-2xl md:text-3xl font-bold text-gray-800">
              Inbox
            </h1>
            <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded hover:bg-secondary">
              <FaPlusCircle className="h-5 w-5" /> Add Account
            </button>
          </div>

          {/* Email List */}
          <div className="space-y-4 py-5">
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
