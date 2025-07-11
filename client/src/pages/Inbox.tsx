import { useEffect, useState } from "react";
import { useAppSelector } from "../redux/store";
import { useConnectGmail } from "../hooks/useConnectGmail";
import { useUser } from "../hooks/useUser";
import type { Email } from "../redux/slice/emailSlice";
import Mail from "../components/Mail";
import Account from "../components/Account";

const Inbox = () => {
  const connectGmail = useConnectGmail();

  const { getProfileData } = useUser();
  useEffect(() => {
    getProfileData();
  }, []);

  const user = useAppSelector((store) => store.user.user);
  const googleAccounts = useAppSelector((store) => store.user.user?.google);
  const microsoftAccounts = useAppSelector(
    (store) => store.user.user?.microsoft
  );

  const [selectedAccount, setSelectedAccount] = useState("");

  const emails: Email[] = [
    {
      id: "1",
      date: 1752269851,
      subject: "Meeting on 11:30AM",
      from: "akshaysharma.19042007@gmail.com",
      to: "asharma.19042007@outlook.com",
      snippet:
        "Hey Akshay, just a reminder that our meeting with the product team is scheduled for 11:30 AM. Please bring the updated project roadmap and any notes from your recent research. Looking forward to a productive discussion.",
    },
    {
      id: "2",
      date: 1752269852,
      subject: "Invoice #42319 Attached",
      from: "billing@freelancermarket.com",
      to: "akshaysharma.19042007@hello.com",
      snippet:
        "Dear Akshay, your invoice for the recent freelance project has been generated. Please find the PDF attachment with all the billing details, including hourly breakdowns and tax calculations. Let us know if you have any questions.",
    },
    {
      id: "3",
      date: 1752269853,
      subject: "Welcome to DevForum!",
      from: "no-reply@devforum.org",
      to: "akshaysharma.19042007@gmail.com",
      snippet:
        "Hi Akshay, welcome to the Developer Forum! We're excited to have you onboard. Join the latest discussions, post questions, and connect with fellow developers around the globe. Your profile has been successfully set up.",
    },
    {
      id: "4",
      date: 1752269854,
      subject: "Your Monthly Report is Ready",
      from: "reports@analyticsdash.com",
      to: "akshaysharma.19042007@gmail.com",
      snippet:
        "Hello Akshay, your monthly analytics report for July is now available. It includes detailed graphs on user engagement, top-performing content, and overall traffic sources. You can download it from your dashboard.",
    },
    {
      id: "5",
      date: 1752269855,
      subject: "Important: Password Change Required",
      from: "security@securemail.com",
      to: "akshaysharma.19042007@gmail.com",
      snippet:
        "Dear user, we have detected a login attempt from an unrecognized device. As a precaution, we require you to change your account password immediately. Click the link below to securely reset your password.",
    },
    {
      id: "6",
      date: 1752269856,
      subject: "Upcoming Hackathon – Register Now!",
      from: "events@codestorm.tech",
      to: "akshaysharma.19042007@gmail.com",
      snippet:
        "Get ready for the biggest coding challenge of the year! CodeStorm Hackathon is back with exciting prizes, top mentors, and networking opportunities. Reserve your spot now before registrations close!",
    },
    {
      id: "7",
      date: 1752269857,
      subject: "Flight Booking Confirmation",
      from: "support@flysmart.in",
      to: "akshaysharma.19042007@gmail.com",
      snippet:
        "Hi Akshay, your booking for flight AI-202 to New Delhi has been confirmed. Please find your e-ticket attached along with baggage allowance details and COVID-19 travel advisories. Safe travels!",
    },
    {
      id: "8",
      date: 1752269858,
      subject: "Your Resume Has Been Viewed",
      from: "notifications@jobhunt.com",
      to: "akshaysharma.19042007@gmail.com",
      snippet:
        "Good news! Your resume was recently viewed by a recruiter from TechnoSoft Inc. If you're interested, log in to your dashboard to check the job details and respond to the opportunity.",
    },
    {
      id: "9",
      date: 1752269859,
      subject: "New Comment on Your Blog Post",
      from: "updates@medium.com",
      to: "akshaysharma.19042007@gmail.com",
      snippet:
        "Hi Akshay, someone just commented on your blog post: '10 Tips to Master React in 2025'. They said: 'Great tips! I especially liked the section about performance optimization.' Click here to view the comment.",
    },
    {
      id: "10",
      date: 1752269860,
      subject: "Subscription Expiry Notice",
      from: "support@cloudtools.app",
      to: "akshaysharma.19042007@gmail.com",
      snippet:
        "Your Pro subscription to CloudTools is expiring in 3 days. Renew now to continue enjoying unlimited storage, premium support, and advanced automation features. Click below to renew your plan.",
    },
  ];

  return (
    <div
      className="relative flex size-full min-h-screen flex-col bg-[#0f1a24] dark group/design-root overflow-x-hidden"
      style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}
    >
      <div className="layout-container flex h-full grow flex-col">
        <div className="gap-1 px-6 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col w-80">
            <div className="flex h-full min-h-[700px] flex-col justify-between bg-[#0f1a24] p-4">
              <div className="flex flex-col gap-4">
                <div className="flex gap-3">
                  <div
                    className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
                    style={{
                      backgroundImage: 'url("./avatar.png")',
                    }}
                  ></div>
                  <div className="flex flex-col">
                    <h1 className="text-white text-base font-medium leading-normal">
                      {user?.name}
                    </h1>
                    <p className="text-[#8daece] text-sm font-normal leading-normal">
                      {(googleAccounts?.length || 0) +
                        (microsoftAccounts?.length || 0)}{" "}
                      accounts connected
                    </p>
                  </div>
                </div>
                {(googleAccounts?.length || 0) +
                (microsoftAccounts?.length || 0) ? (
                  <div className="flex flex-col gap-2">
                    <div
                      onClick={() => setSelectedAccount("")}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[#20364b] ${
                        selectedAccount === "" && "bg-[#20364b]"
                      } cursor-pointer`}
                    >
                      <div
                        className="text-white"
                        data-icon="Tray"
                        data-size="24px"
                        data-weight="fill"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24px"
                          height="24px"
                          fill="currentColor"
                          viewBox="0 0 256 256"
                        >
                          <path d="M208,32H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32Zm0,176H48V168H76.69L96,187.32A15.89,15.89,0,0,0,107.31,192h41.38A15.86,15.86,0,0,0,160,187.31L179.31,168H208v40Z"></path>
                        </svg>
                      </div>

                      <p className="text-white text-sm font-medium leading-normal">
                        All Inboxes
                      </p>
                    </div>
                    {googleAccounts?.length && (
                      <>
                        <div className="pb-3">
                          <div className="flex border-b border-[#2e4e6b] px-4 gap-8"></div>
                        </div>
                        <div className="flex items-center gap-4 px-4 min-h-[72px] -mt-5 bg-[#0f1a24]">
                          <div
                            className="bg-center bg-no-repeat aspect-square bg-cover h-7 w-fit"
                            style={{
                              backgroundImage: 'url("./gmail.png")',
                            }}
                          ></div>
                          <div className="flex flex-col justify-center">
                            <p className="text-white text-base font-medium leading-normal line-clamp-1">
                              Google
                            </p>
                          </div>
                        </div>
                        {googleAccounts?.map((data, idx) => {
                          const selected = selectedAccount === data?.email;
                          return (
                            <Account
                              setSelectedAccount={setSelectedAccount}
                              key={idx}
                              data={data}
                              selected={selected}
                            />
                          );
                        })}
                      </>
                    )}
                    {microsoftAccounts?.length && (
                      <>
                        <div className="pb-3">
                          <div className="flex border-b border-[#2e4e6b] px-4 gap-8"></div>
                        </div>
                        <div className="flex items-center gap-4 px-4 min-h-[72px] -mt-5 bg-[#0f1a24]">
                          <div
                            className="bg-center bg-no-repeat aspect-square bg-cover h-7 w-fit"
                            style={{
                              backgroundImage: 'url("./outlook.png")',
                            }}
                          ></div>
                          <div className="flex flex-col justify-center">
                            <p className="text-white text-base font-medium leading-normal line-clamp-1">
                              Outlook
                            </p>
                          </div>
                        </div>
                        {microsoftAccounts?.map((data, idx) => {
                          const selected = data?.email === selectedAccount;
                          return (
                            <Account
                              setSelectedAccount={setSelectedAccount}
                              selected={selected}
                              key={idx}
                              data={data}
                            />
                          );
                        })}
                      </>
                    )}
                  </div>
                ) : (
                  <>
                    <div className="pb-3">
                      <div className="flex border-b border-[#2e4e6b] px-4 gap-8"></div>
                    </div>
                    <div className="text-white clear-both">
                      <p>No accounts connected</p>
                      <p className="mt-5">
                        Connect google or microsoft accounts to see mails
                      </p>
                    </div>
                  </>
                )}
              </div>
              <div className="w-full h-fit flex flex-col gap-3">
                <button
                  onClick={() => connectGmail()}
                  className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 text-[#0f1a24] text-sm font-bold leading-normal tracking-[0.015em] bg-white"
                >
                  <span className="truncate">Connect Gmail</span>
                </button>
                <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#359dff] text-[#0f1a24] text-sm font-bold leading-normal tracking-[0.015em]">
                  <span className="truncate">Connect Outlook</span>
                </button>
              </div>
            </div>
          </div>
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            <div className="flex flex-wrap justify-between gap-3 p-4">
              <p className="text-white tracking-light text-[32px] font-bold leading-tight min-w-72">
                Your Emails
              </p>
            </div>
            <div className="pb-3">
              <div className="flex border-b border-[#2e4e6b] px-4 gap-8"></div>
            </div>
            {emails.map((data) => {
              const domain = data?.to.split("@")[1];
              const provider =
                domain === "gmail.com"
                  ? "Gmail"
                  : domain === "outlook.com"
                  ? "Outlook"
                  : "Other";

              const today = new Date();
              const emailDate = new Date(data.date * 1000); // Convert seconds to milliseconds

              const timeDiff = today.getTime() - emailDate.getTime();
              const dayDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

              return (
                <Mail dayDiff={dayDiff} email={data} provider={provider} />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inbox;
