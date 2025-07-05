import type { EmailAccount } from "../pages/Inbox";

const Account = ({ data }: { data: EmailAccount }) => {
  return (
    <div
      key={data.email}
      className={`flex items-center justify-between p-3 rounded-lg border ${
        data.connected ? "bg-green-100" : "bg-red-100"
      } shadow-sm`}
    >
      <div className="text-sm font-medium">
        {data.type.toUpperCase()}
        <br />
        <span className={data.color}>{data.email}</span>
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
