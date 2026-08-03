import { useState } from "react";

// Content in both languages
const content = {
  en: {
    title: "Terms & Privacy Policy",
    lastUpdated: "Last updated: August 2026",
    sections: [
      {
        heading: "1. Terms of Service",
        body: "By using Shree SS Travel's services, you agree to comply with all applicable laws and regulations. You must not use our services for any unlawful or prohibited activities. We reserve the right to terminate accounts that violate these terms.",
      },
      {
        heading: "2. Privacy Policy",
        body: "We collect personal information (name, email, contact details) solely for booking and service improvement. We do not share your data with third parties without your explicit consent, except as required by law. You may request deletion of your data at any time.",
      },
      {
        heading: "3. Cancellation & Refund",
        body: "Cancellation policies vary by service. Refunds are processed within 7–14 business days after approval. Please review the specific cancellation policy at the time of booking.",
      },
      {
        heading: "4. User Responsibilities",
        body: "You are responsible for providing accurate information during registration and booking. Any misuse of the platform (e.g., fraudulent bookings) will result in immediate account suspension.",
      },
      {
        heading: "5. Changes to Policy",
        body: "We may update this policy periodically. Changes will be notified via email or on our website. Continued use of our services constitutes acceptance of the updated terms.",
      },
    ],
  },
  hi: {
    title: "नियम और गोपनीयता नीति",
    lastUpdated: "अंतिम अद्यतन: अगस्त 2026",
    sections: [
      {
        heading: "१. सेवा की शर्तें",
        body: "श्री एसएस ट्रैवल की सेवाओं का उपयोग करके, आप सभी लागू कानूनों और विनियमों का पालन करने के लिए सहमत हैं। आपको किसी भी गैरकानूनी या निषिद्ध गतिविधियों के लिए हमारी सेवाओं का उपयोग नहीं करना चाहिए। हम इन शर्तों का उल्लंघन करने वाले खातों को समाप्त करने का अधिकार सुरक्षित रखते हैं।",
      },
      {
        heading: "२. गोपनीयता नीति",
        body: "हम व्यक्तिगत जानकारी (नाम, ईमेल, संपर्क विवरण) केवल बुकिंग और सेवा सुधार के लिए एकत्र करते हैं। हम आपके स्पष्ट सहमति के बिना आपका डेटा तीसरे पक्ष के साथ साझा नहीं करते हैं, सिवाय कानून द्वारा आवश्यक होने के। आप किसी भी समय अपने डेटा को हटाने का अनुरोध कर सकते हैं।",
      },
      {
        heading: "३. रद्दीकरण और धनवापसी",
        body: "रद्दीकरण नीतियां सेवा के अनुसार भिन्न होती हैं। धनवापसी अनुमोदन के बाद ७–१४ कार्य दिवसों के भीतर संसाधित की जाती है। कृपया बुकिंग के समय विशिष्ट रद्दीकरण नीति की समीक्षा करें।",
      },
      {
        heading: "४. उपयोगकर्ता की जिम्मेदारियाँ",
        body: "पंजीकरण और बुकिंग के दौरान सटीक जानकारी प्रदान करना आपकी जिम्मेदारी है। प्लेटफ़ॉर्म के किसी भी दुरुपयोग (जैसे, धोखाधड़ी वाली बुकिंग) के परिणामस्वरूप तत्काल खाता निलंबन होगा।",
      },
      {
        heading: "५. नीति में परिवर्तन",
        body: "हम इस नीति को समय-समय पर अद्यतन कर सकते हैं। परिवर्तन ईमेल या हमारी वेबसाइट के माध्यम से सूचित किए जाएंगे। हमारी सेवाओं का निरंतर उपयोग अद्यतन शर्तों की स्वीकृति माना जाएगा।",
      },
    ],
  },
};

const TermsAndPolicy = () => {
  const [lang, setLang] = useState("en"); // "en" or "hi"
  const current = content[lang];

  const toggleLang = () => {
    setLang((prev) => (prev === "en" ? "hi" : "en"));
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6 relative bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=80')`,
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0b2b40]/80 via-[#1a5f8b]/50 to-transparent backdrop-blur-[2px]"></div>

      {/* Decorative icons */}
      <div className="absolute top-8 left-8 text-white/20 text-6xl select-none pointer-events-none">
        <i className="fas fa-file-contract"></i>
      </div>
      <div className="absolute bottom-8 right-8 text-white/20 text-5xl select-none pointer-events-none">
        <i className="fas fa-shield-alt"></i>
      </div>

      {/* Main Card */}
      <div className="relative z-10 w-full max-w-4xl">
        <div className="bg-white/15 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/30 transition-all duration-300 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)]">
          
          {/* Header with language toggle */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-white drop-shadow-lg flex items-center gap-3">
                <i className="fas fa-gavel text-[#f5c842]"></i>
                {current.title}
              </h1>
              <p className="text-white/60 text-sm mt-1">{current.lastUpdated}</p>
            </div>
            <button
              onClick={toggleLang}
              className="px-5 py-2.5 bg-[#f5c842] text-[#0b2b40] font-bold rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition flex items-center gap-2 text-sm"
            >
              <i className="fas fa-language"></i>
              {lang === "en" ? "हिंदी में पढ़ें" : "Read in English"}
            </button>
          </div>

          {/* Content */}
          <div className="space-y-6 text-white/90">
            {current.sections.map((section, idx) => (
              <div key={idx} className="border-b border-white/10 pb-5 last:border-0 last:pb-0">
                <h2 className="text-xl font-semibold text-[#f5c842] mb-2 flex items-center gap-2">
                  <i className="fas fa-circle text-[8px] text-[#f5c842]"></i>
                  {section.heading}
                </h2>
                <p className="text-white/80 leading-relaxed">{section.body}</p>
              </div>
            ))}
          </div>

          {/* Footer / back link */}
          <div className="mt-8 pt-4 border-t border-white/10 flex justify-between items-center">
            <p className="text-white/40 text-xs">
              <i className="far fa-copyright mr-1"></i> Shree SS Travel
            </p>
            <a
              href="/"
              className="text-[#f5c842] hover:text-white transition flex items-center gap-2 text-sm font-medium"
            >
              <i className="fas fa-arrow-left"></i> {lang === "en" ? "Back to Home" : "होम पर वापस जाएं"}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsAndPolicy;