import type { Email } from "../redux/slice/emailSlice";
import { useNavigate } from "react-router-dom";

const Mail = ({
  email,
  provider,
  dayDiff,
  account,
}: {
  email: Email;
  provider: "Gmail" | "Outlook" | "Other";
  dayDiff: number;
  account: string;
}) => {
  const navigate = useNavigate();
  const goToEmail = (id: string) => {
    navigate(`/inbox/${id}`, {
      state: { email, provider, account },
    });
  };
  return (
    <div
      onClick={() => goToEmail(email?.id)}
      className="flex items-center gap-4 hover:bg-[#030507] px-4 min-h-[72px] py-2  bg-[#0f1a24] rounded-md transition-colors cursor-pointer duration-150"
    >
      <div
        className="bg-center bg-no-repeat aspect-square bg-cover h-14 w-fit"
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
          {email?.subject}
        </p>
        <p className="text-[#8daece] text-sm font-normal leading-normal line-clamp-2">
          From: {email?.from} · {dayDiff ? dayDiff + "d" : "Today"} · Account:{" "}
          {provider}
        </p>
      </div>
    </div>
  );
};

export default Mail;
