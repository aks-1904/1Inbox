import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ScrollProvider from "./components/ScrollProvider";

const App = () => {
  return (
    <ScrollProvider>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </ScrollProvider>
  );
};

export default App;
