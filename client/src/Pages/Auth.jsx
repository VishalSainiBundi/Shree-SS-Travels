import { useState } from "react";
import { Link } from "react-router-dom";
import axiosApiInstance from "../helper";

const AuthPage = () => {
  const [activeTab, setActiveTab] = useState("login");

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regConfirm, setRegConfirm] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);

  const [showLoginPw, setShowLoginPw] = useState(false);
  const [showRegPw, setShowRegPw] = useState(false);
  const [showRegConfirm, setShowRegConfirm] = useState(false);

  // Loading states for buttons
  const [loginLoading, setLoginLoading] = useState(false);
  const [registerLoading, setRegisterLoading] = useState(false);

  const handleTabSwitch = (tab) => setActiveTab(tab);

  // ---------- LOGIN ----------
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoginLoading(true);
    try {
      const payload = {
        email: loginEmail,
        password: loginPassword,
      };
      // Uncomment when your API is ready:
      // const response = await axiosApiInstance.post('/user/login', payload);
      // console.log('Login success:', response.data);
      
      alert("✅ Welcome back! (Demo – replace with actual API call)");
      setLoginEmail("");
      setLoginPassword("");
    } catch (error) {
      alert("❌ Login failed: " + (error.response?.data?.message || error.message));
    } finally {
      setLoginLoading(false);
    }
  };

  // ---------- REGISTER ----------
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();

    // --- Client-side validation ---
    if (regPassword !== regConfirm) {
      alert("❗ Passwords do not match.");
      return;
    }
    if (regPassword.length < 8) {
      alert("❗ Password must be at least 8 characters.");
      return;
    }
    if (!agreeTerms) {
      alert("❗ Please agree to the Terms & Privacy policy.");
      return;
    }

    setRegisterLoading(true);
    try {
      const payload = {
        name: regName,
        email: regEmail,
        password: regPassword,
        c_password: regConfirm, // assuming your API expects 'c_password'
      };

      // Real API call:
      const response = await axiosApiInstance.post("/user/create", payload);
      console.log("Registration success:", response.data);

      alert(`✅ Welcome aboard ${regName}! Registration successful.`);

      // Reset form
      setRegName("");
      setRegEmail("");
      setRegPassword("");
      setRegConfirm("");
      setAgreeTerms(false);
      // Optionally switch to login tab
      setActiveTab("login");
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      alert("❌ Registration failed: " + message);
    } finally {
      setRegisterLoading(false);
    }
  };

  const togglePw = (setter) => setter((prev) => !prev);

  return (
    // ----- Background container with image & enhanced overlay -----
    <div
      className="min-h-screen flex items-center justify-center p-6 relative bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=80')`,
      }}
    >
      {/* Overlay with gradient for depth and better text readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0b2b40]/70 via-[#1a5f8b]/40 to-transparent backdrop-blur-[2px]"></div>

      {/* Decorative floating elements */}
      <div className="absolute top-8 left-8 text-white/20 text-6xl select-none pointer-events-none">
        <i className="fas fa-compass"></i>
      </div>
      <div className="absolute bottom-8 right-8 text-white/20 text-5xl select-none pointer-events-none">
        <i className="fas fa-globe-asia"></i>
      </div>

      {/* Main Card */}
      <div className="relative z-10 w-full max-w-md">
        <div className="bg-white/20 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/30 transition-all duration-300 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)]">
          
          {/* Brand Header */}
          <div className="flex items-center gap-3 mb-1">
            <div className="bg-[#1a5f8b]/20 p-3 rounded-2xl backdrop-blur-sm">
              <i className="fas fa-plane-departure text-3xl text-white"></i>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-white drop-shadow-lg">
              Shree <span className="font-light text-[#f5c842]">SS</span> Travel
            </h1>
          </div>
          <div className="flex items-center gap-2 text-sm text-white/80 mb-6 border-l-2 border-[#f5c842] pl-3 font-medium drop-shadow">
            <i className="fas fa-map-pin text-[#f5c842] text-xs"></i>
            Your journey begins here
          </div>

          {/* Tabs */}
          <div className="flex gap-1 bg-white/10 p-1.5 rounded-full mb-6 border border-white/20 backdrop-blur-sm">
            <button
              onClick={() => handleTabSwitch("login")}
              className={`flex-1 py-2.5 px-3 rounded-full text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
                activeTab === "login"
                  ? "bg-white text-[#0b2b40] shadow-lg"
                  : "text-white/80 hover:bg-white/20 hover:text-white"
              }`}
            >
              <i className="fas fa-sign-in-alt"></i> Login
            </button>
            <button
              onClick={() => handleTabSwitch("register")}
              className={`flex-1 py-2.5 px-3 rounded-full text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
                activeTab === "register"
                  ? "bg-white text-[#0b2b40] shadow-lg"
                  : "text-white/80 hover:bg-white/20 hover:text-white"
              }`}
            >
              <i className="fas fa-user-plus"></i> Register
            </button>
          </div>

          {/* Login Form */}
          {activeTab === "login" && (
            <form onSubmit={handleLoginSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-white/80 mb-1.5 drop-shadow">
                  <i className="fas fa-envelope mr-1.5"></i> Email
                </label>
                <div className="relative">
                  <i className="fas fa-envelope absolute left-4 top-1/2 -translate-y-1/2 text-white/60"></i>
                  <input
                    type="email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    className="w-full py-3.5 pl-12 pr-4 bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#f5c842] focus:border-transparent text-white placeholder-white/50 transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-white/80 mb-1.5 drop-shadow">
                  <i className="fas fa-lock mr-1.5"></i> Password
                </label>
                <div className="relative">
                  <i className="fas fa-lock absolute left-4 top-1/2 -translate-y-1/2 text-white/60"></i>
                  <input
                    type={showLoginPw ? "text" : "password"}
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full py-3.5 pl-12 pr-12 bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#f5c842] focus:border-transparent text-white placeholder-white/50 transition"
                  />
                  <button
                    type="button"
                    onClick={() => togglePw(setShowLoginPw)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition"
                  >
                    <i className={showLoginPw ? "fas fa-eye-slash" : "fas fa-eye"}></i>
                  </button>
                </div>
              </div>

              <div className="flex justify-between items-center text-sm flex-wrap gap-2">
                <label className="flex items-center gap-1.5 text-white/80 font-medium cursor-pointer">
                  <input type="checkbox" defaultChecked className="accent-[#f5c842] w-4 h-4 rounded" />
                  Remember me
                </label>
                <a href="#" className="text-[#f5c842] font-medium border-b border-transparent hover:border-[#f5c842] transition">
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                disabled={loginLoading}
                className={`w-full py-3.5 bg-gradient-to-r from-[#f5c842] to-[#e6b33a] text-[#0b2b40] font-bold rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition flex items-center justify-center gap-2 ${
                  loginLoading ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {loginLoading ? (
                  <i className="fas fa-spinner fa-spin"></i>
                ) : (
                  <i className="fas fa-arrow-right-to-bracket"></i>
                )}
                {loginLoading ? "Signing in..." : "Sign In"}
              </button>

              <div className="text-center text-sm text-white/70">
                Don't have an account?{" "}
                <button
                  type="button"
                  onClick={() => handleTabSwitch("register")}
                  className="text-[#f5c842] font-semibold border-b border-transparent hover:border-[#f5c842] transition"
                >
                  Register now
                </button>
              </div>
            </form>
          )}

          {/* Register Form */}
          {activeTab === "register" && (
            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-white/80 mb-1.5 drop-shadow">
                  <i className="fas fa-user mr-1.5"></i> Full Name
                </label>
                <div className="relative">
                  <i className="fas fa-user absolute left-4 top-1/2 -translate-y-1/2 text-white/60"></i>
                  <input
                    type="text"
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    placeholder="John Doe"
                    required
                    className="w-full py-3.5 pl-12 pr-4 bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#f5c842] focus:border-transparent text-white placeholder-white/50 transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-white/80 mb-1.5 drop-shadow">
                  <i className="fas fa-envelope mr-1.5"></i> Email
                </label>
                <div className="relative">
                  <i className="fas fa-envelope absolute left-4 top-1/2 -translate-y-1/2 text-white/60"></i>
                  <input
                    type="email"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    className="w-full py-3.5 pl-12 pr-4 bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#f5c842] focus:border-transparent text-white placeholder-white/50 transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-white/80 mb-1.5 drop-shadow">
                  <i className="fas fa-lock mr-1.5"></i> Password
                </label>
                <div className="relative">
                  <i className="fas fa-lock absolute left-4 top-1/2 -translate-y-1/2 text-white/60"></i>
                  <input
                    type={showRegPw ? "text" : "password"}
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    placeholder="Min 8 characters"
                    required
                    minLength="8"
                    className="w-full py-3.5 pl-12 pr-12 bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#f5c842] focus:border-transparent text-white placeholder-white/50 transition"
                  />
                  <button
                    type="button"
                    onClick={() => togglePw(setShowRegPw)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition"
                  >
                    <i className={showRegPw ? "fas fa-eye-slash" : "fas fa-eye"}></i>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-white/80 mb-1.5 drop-shadow">
                  <i className="fas fa-check-circle mr-1.5"></i> Confirm Password
                </label>
                <div className="relative">
                  <i className="fas fa-check-circle absolute left-4 top-1/2 -translate-y-1/2 text-white/60"></i>
                  <input
                    type={showRegConfirm ? "text" : "password"}
                    value={regConfirm}
                    onChange={(e) => setRegConfirm(e.target.value)}
                    placeholder="Confirm your password"
                    required
                    className="w-full py-3.5 pl-12 pr-12 bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#f5c842] focus:border-transparent text-white placeholder-white/50 transition"
                  />
                  <button
                    type="button"
                    onClick={() => togglePw(setShowRegConfirm)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition"
                  >
                    <i className={showRegConfirm ? "fas fa-eye-slash" : "fas fa-eye"}></i>
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-white/80 font-medium">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  required
                  className="accent-[#f5c842] w-4 h-4 rounded"
                />
                <span>
                  I agree to the{" "}
                  <Link to="/terms" className="text-[#f5c842] border-b border-[#f5c842] hover:text-white transition">
                    Terms
                  </Link>{" "}
                  &amp;{" "}
                  <Link to="/terms" className="text-[#f5c842] border-b border-[#f5c842] hover:text-white transition">
                    Privacy
                  </Link>
                </span>
              </div>

              <button
                type="submit"
                disabled={registerLoading}
                className={`w-full py-3.5 bg-gradient-to-r from-[#f5c842] to-[#e6b33a] text-[#0b2b40] font-bold rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition flex items-center justify-center gap-2 mt-2 ${
                  registerLoading ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {registerLoading ? (
                  <i className="fas fa-spinner fa-spin"></i>
                ) : (
                  <i className="fas fa-user-plus"></i>
                )}
                {registerLoading ? "Creating account..." : "Create Account"}
              </button>

              <div className="text-center text-sm text-white/70">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => handleTabSwitch("login")}
                  className="text-[#f5c842] font-semibold border-b border-transparent hover:border-[#f5c842] transition"
                >
                  Sign in
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;