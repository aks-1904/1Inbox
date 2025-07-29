import { useLocation, useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useGmail } from "../hooks/useGmail";
import { useEffect } from "react";
import DOMPurify from "dompurify";
import { useAppSelector } from "../redux/store";
import { useOutlook } from "../hooks/useOutlook";

const EmailDetailPage = () => {
  const { state } = useLocation();
  const { provider, account } = state;
  const navigate = useNavigate();
  console.log(provider);

  const { id } = useParams();

  const { getEmailBody: getEmailBodyGoogle } = useGmail();
  const { getEmailBody: getEmailBodyMicrosoft } = useOutlook();
  const email = useAppSelector((store) =>
    provider === "Gmail"
      ? store.emails.emails.google[account].emails.find((e) => e.id === id)
      : store.emails.emails.microsoft[account].emails.find((e) => e.id === id)
  );

  if (!id) {
    navigate("/inbox");
  }

  useEffect(() => {
    if (!email) {
      navigate("/inbox", {
        replace: true,
      });
      return;
    }

    if (!email.body && email.id) {
      if (provider === "Gmail") {
        getEmailBodyGoogle(account, email.id);
      }
      if (provider === "Outlook") {
        getEmailBodyMicrosoft(account, email.id);
      }
    }
  }, [email?.body]);

  return (
    <div
      className="relative flex flex-col min-h-screen h-screen overflow-y-auto bg-[#0f1a24]"
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
                  backgroundImage: `url(${
                    provider === "Gmail"
                      ? "./gmail.png"
                      : provider === "Outlook"
                      ? "./outlook.png"
                      : "./unkown.png"
                  })`,
                }}
              ></div>
              <div className="flex flex-col justify-center">
                <p className="text-white text-base font-medium leading-normal line-clamp-1">
                  From: {email?.from}
                </p>
                <p className="text-[#8daece] text-sm font-normal leading-normal line-clamp-2">
                  To: {account}
                </p>
              </div>
            </div>
            <p className="text-[#8daece] text-sm font-normal leading-normal pb-3 pt-1 px-4">
              {email?.date && new Date(email?.date * 1000).toString()}
            </p>
            {email?.body && (
              <div
                className="text-white email-body text-base font-normal leading-normal pb-3 pt-1 px-4 w-full"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(email.body),
                }}
              ></div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailDetailPage;
