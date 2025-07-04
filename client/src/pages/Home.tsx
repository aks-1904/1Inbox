import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { useAppSelector } from "../redux/store";

const Home = () => {
  const user = useAppSelector((state) => state.user.user);

  return (
    <>
      <Navbar user={user ? true : false} />

      {/* Hero Section */}
      <section
        className="relative py-20 px-4 text-center min-h-[60vh] flex flex-col items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: "url('./background.png')" }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/50 z-0"></div>

        {/* Content */}
        <div
          data-scroll
          data-scroll-speed="-1.5"
          className="relative z-10 text-white max-w-3xl"
        >
          <h2 className="lg:text-7xl md:text-6xl sm:text-4xl font-extrabold mb-4 uppercase">
            All Your Emails. One Inbox.
          </h2>
          <p className="text-lg mb-6">
            Link your Gmail and Outlook accounts and never miss an email again.
          </p>
          {!user && (
            <Link
              to="/signup"
              className="text-white px-6 py-3 rounded text-lg from-primary to-secondary bg-linear-150 hover:from-secondary hover:to-primary transition-colors duration-300 hover:bg-linear-90"
            >
              Get Started
            </Link>
          )}
        </div>
      </section>

      {/* Feature Section */}
      <section className="py-16 px-4 max-w-5xl mx-auto text-center bg-white min-w-full z-20">
        <h3 className="text-5xl font-bold mb-8">Why Use 1Inbox?</h3>
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h4 className="font-semibold text-primary text-2xl mb-2">
              Unified Inbox
            </h4>
            <p>
              See all your Google and Microsoft emails in one clean interface.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-primary text-2xl mb-2">
              Secure Login
            </h4>
            <p>OAuth-based login ensures your credentials stay safe.</p>
          </div>
          <div>
            <h4 className="font-semibold text-primary text-2xl mb-2">
              Smart Filters
            </h4>
            <p>Quickly search and sort emails across multiple accounts.</p>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="bg-gray-50 py-16 px-4 text-center">
        <h3 className="text-4xl font-bold mb-8">How It Works</h3>
        <div className="max-w-4xl mx-auto space-y-6 text-left">
          <div className="flex items-start gap-4">
            <span className="text-blue-600 font-bold text-lg">1.</span>
            <p>
              <strong>Create an account</strong> with your email and password or
              social login.
            </p>
          </div>
          <div className="flex items-start gap-4">
            <span className="text-blue-600 font-bold text-lg">2.</span>
            <p>
              <strong>Connect your Gmail and Outlook</strong> accounts securely
              via OAuth.
            </p>
          </div>
          <div className="flex items-start gap-4">
            <span className="text-blue-600 font-bold text-lg">3.</span>
            <p>
              <strong>Access all emails</strong> from different services in one
              smart, searchable inbox.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Reinforcement */}
      <section className="text-white text-center py-12 bg-linear-120 from-primary to-secondary">
        <h3 className="text-2xl font-bold mb-4">Ready to unify your email?</h3>
        <Link
          to="/signup"
          className="bg-white text-secondary px-6 py-3 rounded font-semibold hover:bg-gray-100"
        >
          Sign up now
        </Link>
      </section>

      <Footer />
    </>
  );
};

export default Home;
