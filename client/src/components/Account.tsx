import type { IEmailAccount } from "../redux/slice/emailSlice";

const Account = ({
  data,
  selected,
  setSelectedAccount,
}: {
  data: IEmailAccount;
  selected: boolean;
  setSelectedAccount: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <div
      onClick={() => setSelectedAccount(data?.email)}
      className={`flex cursor-pointer items-center gap-3 px-3 py-2 rounded-lg hover:bg-[#20364b] ${
        selected && "bg-[#20364b]"
      }`}
    >
      <div
        className={`${
          data?.connected ? "bg-green-500" : "bg-red-500"
        } w-2 h-2 rounded-full`}
      ></div>

      <p className="text-white text-sm font-medium leading-normal truncate">
        {data?.email}
      </p>
    </div>
  );
};

export default Account;
