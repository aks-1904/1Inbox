import { useEffect, useState } from "react";
import { useAppSelector } from "../redux/store";
import { useConnectGmail } from "../hooks/useConnectGmail";
import { useUser } from "../hooks/useUser";
import Account from "../components/Account";
import EmailList from "../components/EmailList";
import { useConnectOutlook } from "../hooks/useConnectOutlook";

const Inbox = () => {
  const connectGmail = useConnectGmail();
  const connectOutlook = useConnectOutlook();

  const { getProfileData } = useUser();
  useEffect(() => {
    getProfileData();
  }, []);
  const [selectedAccount, setSelectedAccount] = useState("");
  const [provider, setProvider] = useState<"google" | "microsoft" | "">("");

  const user = useAppSelector((store) => store.user.user);

  const googleAccounts = useAppSelector((store) => store.user.user?.google);
  const microsoftAccounts = useAppSelector(
    (store) => store.user.user?.microsoft
  );

  return (
    <div
      className="relative flex size-full min-h-screen flex-col bg-[#0f1a24] dark group/design-root overflow-x-hidden max-h-screen"
      style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}
    >
      <div className="layout-container flex h-full grow flex-col">
        <div className="gap-1 px-6 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col w-80 h-[calc(100vh-3rem)]">
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
                            <div key={idx} onClick={() => setProvider("google")}>
                              <Account
                                setSelectedAccount={setSelectedAccount}
                                key={idx}
                                data={data}
                                selected={selected}
                              />
                            </div>
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
                            <div key={idx} onClick={() => setProvider("microsoft")}>
                              <Account
                                setSelectedAccount={setSelectedAccount}
                                selected={selected}
                                key={idx}
                                data={data}
                              />
                            </div>
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
                <button
                  onClick={() => connectOutlook()}
                  className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#359dff] text-[#0f1a24] text-sm font-bold leading-normal tracking-[0.015em]"
                >
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
            <div className="overflow-y-auto min-h-screen">
              <EmailList
                selectedAccount={selectedAccount}
                provider={provider}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inbox;
