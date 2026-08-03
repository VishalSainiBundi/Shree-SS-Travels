import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import AuthPage from "./Auth";
import TermsAndPolicy from "./Term";

const Page_Route = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/term" element={<TermsAndPolicy />} />
    </Routes>
  );
};

export default Page_Route;