import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useAppSelector } from "../redux/store";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { user } = useAppSelector((store) => store.user);
  const navigate = useNavigate();

  return (
    <div
      className="relative flex size-full min-h-screen flex-col bg-[#0f1a24] dark group/design-root overflow-x-hidden"
      style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}
    >
      <div className="layout-container flex h-full grow flex-col">
        <Navbar user={user ? true : false} />

        <div className="px-4 md:px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            {/* Hero Section */}
            <div className="@container">
              <div className="@[480px]:p-4">
                <div
                  className="flex min-h-[480px] flex-col gap-6 bg-cover bg-center bg-no-repeat @[480px]:gap-8 @[480px]:rounded-xl items-start justify-end px-4 pb-10 @[480px]:px-10"
                  style={{
                    backgroundImage: `linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.4)), url(./background.png)`,
                  }}
                  data-scroll
                  data-scroll-speed="-2"
                >
                  <motion.div
                    className="flex flex-col gap-2 text-left"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    <h1 className="text-white text-4xl font-black leading-tight tracking-[-0.033em] @[480px]:text-5xl">
                      Unify your inbox, simplify your life
                    </h1>
                    <h2 className="text-white text-sm @[480px]:text-base">
                      Manage all your email accounts in one place with 1Inbox.
                      Stay organized, save time, and never miss an important
                      message again.
                    </h2>
                  </motion.div>
                  <motion.button
                    className="mt-4 flex h-10 @[480px]:h-12 min-w-[84px] max-w-[480px] items-center justify-center rounded-xl px-4 @[480px]:px-5 bg-[#359dff] text-[#0f1a24] text-sm @[480px]:text-base font-bold"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span
                      onClick={() => navigate("/login")}
                      className="truncate"
                    >
                      Get Started
                    </span>
                  </motion.button>
                </div>
              </div>
            </div>

            {/* Features Section */}
            <motion.div
              className="flex flex-col gap-10 px-4 py-10 @container mt-40 bg-[#0f1a24] dark"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex flex-col gap-4">
                <h1 className="text-white text-[32px] font-bold @[480px]:text-4xl max-w-[720px]">
                  Features
                </h1>
                <p className="text-white text-base max-w-[720px]">
                  1Inbox offers a range of features designed to streamline your
                  email management and boost your productivity.
                </p>
              </div>
              <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3">
                {[
                  {
                    title: "Unified Inbox",
                    desc: "Access all your email accounts from a single, unified inbox.",
                  },
                  {
                    title: "Smart Filters",
                    desc: "Automatically sort and prioritize emails based on criteria.",
                  },
                  {
                    title: "Customizable Views",
                    desc: "Tailor your inbox view to match your workflow.",
                  },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    className="flex flex-col gap-2 rounded-lg border border-[#2e4e6b] bg-[#172736] p-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                  >
                    <div className="text-white">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="currentColor"
                        viewBox="0 0 256 256"
                      >
                        <path d="M208,32H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32Zm0,16V152h-28.7A15.86,15.86,0,0,0,168,156.69L148.69,176H107.31L88,156.69A15.86,15.86,0,0,0,76.69,152H48V48Zm0,160H48V168H76.69L96,187.31A15.86,15.86,0,0,0,107.31,192h41.38A15.86,15.86,0,0,0,160,187.31L179.31,168H208v40Z" />
                      </svg>
                    </div>
                    <h2 className="text-white text-base font-bold">
                      {item.title}
                    </h2>
                    <p className="text-[#8daece] text-sm">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* How It Works Section */}
            <motion.div
              className="px-4 @container"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-white text-[22px] font-bold px-0 pb-3 pt-5">
                How it Works
              </h2>
              <div className="grid grid-cols-[40px_1fr] gap-x-2">
                {[
                  {
                    title: "Connect Your Inboxes",
                    desc: "Add your existing email accounts to 1Inbox.",
                  },
                  {
                    title: "Manage Your Emails",
                    desc: "View, reply, and organize emails from all accounts.",
                  },
                  {
                    title: "Stay Organized",
                    desc: "Use filters and tools to keep your inbox tidy.",
                  },
                ].map((item, i) => (
                  <>
                    <div className="flex flex-col items-center">
                      <div className="text-white">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="currentColor"
                          viewBox="0 0 256 256"
                        >
                          <path d="M208,32H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32Zm0,16V152h-28.7A15.86,15.86,0,0,0,168,156.69L148.69,176H107.31L88,156.69A15.86,15.86,0,0,0,76.69,152H48V48Zm0,160H48V168H76.69L96,187.31A15.86,15.86,0,0,0,107.31,192h41.38A15.86,15.86,0,0,0,160,187.31L179.31,168H208v40Z" />
                        </svg>
                      </div>
                      {i < 2 && (
                        <div className="w-[1.5px] bg-[#2e4e6b] flex-1" />
                      )}
                    </div>
                    <div className="py-3">
                      <p className="text-white text-base font-medium">
                        {item.title}
                      </p>
                      <p className="text-[#8daece] text-base">{item.desc}</p>
                    </div>
                  </>
                ))}
              </div>
            </motion.div>

            {/* CTA Section */}
            <motion.div
              className="flex flex-col items-center text-center px-4 py-10 @[480px]:px-10 @[480px]:py-20"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-white text-[32px] font-bold @[480px]:text-4xl max-w-[720px]">
                Ready to take control of your inbox?
              </h1>
              <p className="text-white text-base max-w-[720px] mt-2">
                Join thousands of users who have simplified their email
                management with 1Inbox.
              </p>
              <motion.button
                className="mt-6 flex h-10 @[480px]:h-12 min-w-[84px] max-w-[480px] items-center justify-center rounded-xl px-4 @[480px]:px-5 bg-[#359dff] text-[#0f1a24] text-sm @[480px]:text-base font-bold"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span onClick={() => navigate("/login")} className="truncate">
                  Get Started
                </span>
              </motion.button>
            </motion.div>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default Home;
