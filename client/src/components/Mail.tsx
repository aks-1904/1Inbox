import { motion } from "framer-motion";
import { FaEnvelope } from "react-icons/fa";
import type { Email } from "../redux/slice/emailSlice";
import { useNavigate } from "react-router-dom";

interface Props {
  index: number;
  email: Email;
  accountColor: string;
}

const Mail = (props: Props) => {
  const navigate = useNavigate();
  const goToEmail = (id: string) => {
    navigate(`/inbox/${id}`);
  };
  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: props.index * 0.1 }}
        onClick={() => goToEmail(props.email.id)}
        className="cursor-pointer shadow hover:shadow-lg transition rounded-xl p-4 border hover:border-primary bg-gray-50 hover:bg-blue-50"
      >
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold flex items-center gap-2 text-secondary">
            <FaEnvelope /> {props.email.subject}
          </h3>
          <span className="text-xs text-gray-500">{props.email.date}</span>
        </div>
        <p className="text-sm text-gray-700 mt-1 truncate">
          {props.email.body.split(" ").slice(0, 12).join(" ")}...
        </p>
        <div className="mt-2 text-xs text-gray-500">
          From: {props.email.from} <br />
          <span className={`${props.accountColor}`}>
            To: {props.email.accountEmail}
          </span>
        </div>
      </motion.div>
    </div>
  );
};

export default Mail;
