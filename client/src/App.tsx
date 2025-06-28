import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ScrollProvider from "./components/ScrollProvider";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

const App = () => {
  return (
    <ScrollProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </ScrollProvider>
  );
};

export default App;
