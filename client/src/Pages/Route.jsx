import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import AuthPage from "./Auth";

const Page_Route = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth" element={<AuthPage />} />
    </Routes>
  );
};

export default Page_Route;