import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ScrollProvider from "./components/ScrollProvider";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { Toaster } from "react-hot-toast";
import Inbox from "./pages/Inbox";
import EmailDetailPage from "./pages/EmailDetails";

const App = () => {
  return (
    <div>
      <Toaster />
      <ScrollProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/inbox" element={<Inbox />} />
          <Route path="/inbox/:id" element={<EmailDetailPage />} />
        </Routes>
      </ScrollProvider>
    </div>
  );
};

export default App;
