import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import type { Email } from "../redux/slice/emailSlice";
import Navbar from "../components/Navbar";

const EmailDetailPage = () => {
  const { id } = useParams();
  const [email, setEmail] = useState<Email | null>(null);

  useEffect(() => {
    const fetchedEmail: Email = {
      id: id || "1",
      subject: "Meeting Reminder",
      snippet: `Hello,\n\nYou have a scheduled meeting with the product team tomorrow at 10:00 AM.\n\nAgenda:\n- Sprint updates\n- Blockers discussion\n- Roadmap planning\n\nRegards,\nProduct Team`,
      from: "calendar@outlook.com",
      to: "you@outlook.com",
      date: 123456789,
    };
    setEmail(fetchedEmail);
  }, [id]);

  if (!email) return <div className="p-6">Loading...</div>;

  return (
    <div
      className="relative flex size-full min-h-screen flex-col bg-[#0f1a24] dark group/design-root overflow-x-hidden"
      style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}
    >
      <div className="layout-container flex h-full grow flex-col">
        <Navbar user={true} />
        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            <div className="flex flex-wrap gap-2 p-4">
              <a
                className="text-[#8daece] text-base font-medium leading-normal"
                href="#"
              >
                Inbox
              </a>
              <span className="text-[#8daece] text-base font-medium leading-normal">
                /
              </span>
              <span className="text-white text-base font-medium leading-normal">
                {email?.subject}
              </span>
            </div>
            <h1 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 text-left pb-3 pt-5">
              {email?.subject}
            </h1>
            <div className="flex items-center gap-4 bg-[#0f1a24] px-4 min-h-[72px] py-2">
              <div
                className="bg-center bg-no-repeat aspect-square bg-cover rounded-full h-14 w-fit"
                style={{
                  backgroundImage:
                    'url("./avatar.png")',
                }}
              ></div>
              <div className="flex flex-col justify-center">
                <p className="text-white text-base font-medium leading-normal line-clamp-1">
                  From: {email?.from}
                </p>
                <p className="text-[#8daece] text-sm font-normal leading-normal line-clamp-2">
                  To: {email?.to}
                </p>
              </div>
            </div>
            <p className="text-[#8daece] text-sm font-normal leading-normal pb-3 pt-1 px-4">
              {new Date(email?.date * 1000).toString()}
            </p>
            <p className="text-white text-base font-normal leading-normal pb-3 pt-1 px-4">
              {email?.snippet}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailDetailPage;
