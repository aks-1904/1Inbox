import type { IEmailAccount } from "../redux/slice/emailSlice";

const Account = ({ data, type }: { data: IEmailAccount, type: "google" | "microsoft" }) => {
  return (
    <div
      key={data.email}
      className={`flex items-center justify-between p-3 rounded-lg border ${
        data.connected ? "bg-green-100" : "bg-red-100"
      } shadow-sm`}
    >
      <div className="text-sm font-medium">
        {type.toUpperCase()}
        <br />
        <span className="bg-gray-200">{data.email}</span>
      </div>
      {!data.connected && (
        <button className="text-xs px-2 py-1 border rounded hover:bg-gray-200">
          Connect
        </button>
      )}
    </div>
  );
};

export default Account;
