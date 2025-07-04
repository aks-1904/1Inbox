import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaArrowLeft, FaEnvelopeOpenText } from "react-icons/fa";
import type { Email } from "../redux/slice/emailSlice";

const EmailDetailPage = () => {
  const { id } = useParams();
  const [email, setEmail] = useState<Email | null>(null);

  useEffect(() => {
    // Replace this with actual API call
    const fetchedEmail: Email = {
      id: id || "1",
      subject: "Meeting Reminder",
      body: `Hello,\n\nYou have a scheduled meeting with the product team tomorrow at 10:00 AM.\n\nAgenda:\n- Sprint updates\n- Blockers discussion\n- Roadmap planning\n\nRegards,\nProduct Team`,
      from: "calendar@outlook.com",
      to: "you@outlook.com",
      accountEmail: "you@outlook.com",
      date: "2025-07-03",
    };
    setEmail(fetchedEmail);
  }, [id]);
  const navigate = useNavigate();

  if (!email) return <div className="p-6">Loading...</div>;

  return (
    <div>
      <div
        className="ml-10 mt-10 border w-fit p-2 rounded-full cursor-pointer hover:bg-gray-100"
        onClick={() => {
          navigate("/inbox", {
            replace: true,
          });
        }}
      >
        <FaArrowLeft size={20} />
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-xl border mt-8"
      >
        <div className="flex items-center gap-3 mb-4">
          <FaEnvelopeOpenText className="text-blue-600 text-2xl" />
          <h2 className="text-2xl font-bold text-gray-800">{email.subject}</h2>
        </div>
        <div className="text-sm text-gray-500 mb-4">
          <div>From: {email.from}</div>
          <div>To: {email.to}</div>
          <div className="italic">Date: {email.date}</div>
        </div>
        <div className="whitespace-pre-line text-gray-800 text-base leading-relaxed border-t pt-4">
          {email.body}
        </div>
      </motion.div>
    </div>
  );
};

export default EmailDetailPage;
