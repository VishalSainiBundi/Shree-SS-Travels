"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import {
    FaUser,
    FaLock,
    FaEnvelope,
    FaGoogle,
    FaApple,
    FaFacebookF,
    FaEye,
    FaEyeSlash,
    FaCheckCircle,
    FaSpinner,
    FaPlane,
    FaGlobe,
    FaStar,
    FaSuitcase,
    FaArrowRight,
    FaShieldAlt,
    FaUserCheck,
    FaMapMarkerAlt,
    FaClock,
    FaChevronRight,
    FaPhoneAlt,
} from "react-icons/fa";
import { HiOutlineMail, HiOutlineLockClosed, HiOutlineUser } from "react-icons/hi";
import { TbWorld } from "react-icons/tb";

// ============================================================
// 1. FLOATING BACKGROUND WITH PARTICLES
// ============================================================
const FloatingBackground = () => {
    const containerRef = useRef(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [particles, setParticles] = useState([]);

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect();
                setMousePosition({
                    x: ((e.clientX - rect.left) / rect.width - 0.5) * 2,
                    y: ((e.clientY - rect.top) / rect.height - 0.5) * 2,
                });
            }
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    useEffect(() => {
        const newParticles = Array.from({ length: 60 }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 4 + 1,
            duration: Math.random() * 20 + 15,
            delay: Math.random() * 10,
            opacity: Math.random() * 0.4 + 0.1,
        }));
        setParticles(newParticles);
    }, []);

    return (
        <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Deep gradient orbs */}
            <div
                className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full opacity-40 blur-3xl"
                style={{
                    background: "radial-gradient(circle, #1E40AF 0%, #071A35 70%)",
                    transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px)`,
                    transition: "transform 0.1s ease-out",
                }}
            />
            <div
                className="absolute bottom-[-30%] right-[-10%] w-[50%] h-[50%] rounded-full opacity-30 blur-3xl"
                style={{
                    background: "radial-gradient(circle, #FBBF24 0%, #F97316 50%, transparent 70%)",
                    transform: `translate(${-mousePosition.x * 15}px, ${-mousePosition.y * 15}px)`,
                    transition: "transform 0.1s ease-out",
                }}
            />
            <div
                className="absolute top-[40%] left-[30%] w-[30%] h-[30%] rounded-full opacity-20 blur-3xl"
                style={{
                    background: "radial-gradient(circle, #F97316 0%, transparent 70%)",
                    transform: `translate(${mousePosition.x * 10}px, ${mousePosition.y * 10}px)`,
                    transition: "transform 0.1s ease-out",
                }}
            />

            {/* Particles */}
            {particles.map((p) => (
                <motion.div
                    key={p.id}
                    className="absolute rounded-full bg-white"
                    style={{
                        left: `${p.x}%`,
                        top: `${p.y}%`,
                        width: p.size,
                        height: p.size,
                        opacity: p.opacity,
                    }}
                    animate={{
                        y: [0, -30, 0],
                        x: [0, 15, 0, -15, 0],
                        opacity: [p.opacity, p.opacity * 2, p.opacity],
                    }}
                    transition={{
                        duration: p.duration,
                        repeat: Infinity,
                        delay: p.delay,
                        ease: "easeInOut",
                    }}
                />
            ))}

            {/* Floating clouds */}
            <motion.div
                className="absolute top-[15%] right-[10%] w-32 h-20 rounded-full opacity-10 bg-white blur-xl"
                animate={{ x: [0, 40, 0], y: [0, -10, 0] }}
                transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
                className="absolute bottom-[25%] left-[5%] w-48 h-24 rounded-full opacity-8 bg-white blur-xl"
                animate={{ x: [0, -30, 0], y: [0, 15, 0] }}
                transition={{ duration: 30, repeat: Infinity, ease: "easeInOut", delay: 5 }}
            />
        </div>
    );
};

// ============================================================
// 2. ANIMATED PLANE
// ============================================================
const AnimatedPlane = () => {
    const pathRef = useRef(null);
    const [pathLength, setPathLength] = useState(0);

    useEffect(() => {
        if (pathRef.current) {
            setPathLength(pathRef.current.getTotalLength());
        }
    }, []);

    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <svg
                className="absolute w-full h-full"
                viewBox="0 0 1200 800"
                preserveAspectRatio="none"
                style={{ opacity: 0.15 }}
            >
                {/* Path line */}
                <motion.path
                    d="M 100 600 Q 300 100 600 400 T 1100 150"
                    stroke="url(#planeGrad)"
                    strokeWidth="2"
                    fill="none"
                    strokeDasharray="4 8"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                />
                <defs>
                    <linearGradient id="planeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#FBBF24" stopOpacity="0.3" />
                        <stop offset="50%" stopColor="#F97316" stopOpacity="0.6" />
                        <stop offset="100%" stopColor="#FBBF24" stopOpacity="0.3" />
                    </linearGradient>
                </defs>
            </svg>

            {/* Animated plane icon */}
            <motion.div
                className="absolute text-3xl text-[#FBBF24] drop-shadow-[0_0_20px_rgba(251,191,36,0.4)]"
                initial={{ x: 50, y: 550 }}
                animate={{
                    x: [50, 300, 600, 900, 1100],
                    y: [550, 200, 380, 480, 150],
                    rotate: [20, -15, 10, -5, 5],
                }}
                transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            >
                <FaPlane />
            </motion.div>
        </div>
    );
};

// ============================================================
// 3. STATISTICS CARDS
// ============================================================
const StatisticsCards = () => {
    const stats = [
        { icon: FaUserCheck, value: "30,000+", label: "Happy Travelers" },
        { icon: FaGlobe, value: "250+", label: "Destinations" },
        { icon: FaStar, value: "4.9★", label: "Customer Rating" },
        { icon: FaSuitcase, value: "15+", label: "Years Experience" },
    ];

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mt-6 md:mt-8">
            {stats.map((stat, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + i * 0.1, duration: 0.6 }}
                    className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-3 md:p-4 text-center hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:border-white/20"
                >
                    <stat.icon className="text-[#FBBF24] text-lg md:text-xl mx-auto mb-1" />
                    <div className="text-white font-bold text-base md:text-lg font-['Inter']">
                        {stat.value}
                    </div>
                    <div className="text-white/60 text-[10px] md:text-xs font-['Inter'] tracking-wide">
                        {stat.label}
                    </div>
                </motion.div>
            ))}
        </div>
    );
};

// ============================================================
// 4. DESTINATION CARDS (animated)
// ============================================================
const DestinationCards = () => {
    const destinations = [
        { name: "Bali", emoji: "🌴", color: "from-emerald-500/30 to-teal-500/30" },
        { name: "Paris", emoji: "🗼", color: "from-rose-500/30 to-pink-500/30" },
        { name: "Maldives", emoji: "🏝️", color: "from-cyan-500/30 to-blue-500/30" },
        { name: "Kyoto", emoji: "⛩️", color: "from-amber-500/30 to-orange-500/30" },
    ];

    return (
        <div className="flex flex-wrap gap-2 md:gap-3 mt-4">
            {destinations.map((dest, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + i * 0.08, duration: 0.4 }}
                    whileHover={{ scale: 1.08, y: -4 }}
                    className={`bg-gradient-to-br ${dest.color} backdrop-blur-sm border border-white/10 rounded-full px-3 md:px-4 py-1.5 md:py-2 text-white text-xs md:text-sm font-['Inter'] flex items-center gap-1.5 cursor-default shadow-lg`}
                >
                    <span className="text-base md:text-lg">{dest.emoji}</span>
                    <span>{dest.name}</span>
                </motion.div>
            ))}
        </div>
    );
};

// ============================================================
// 5. HERO SECTION
// ============================================================
const HeroSection = () => {
    return (
        <div className="hidden lg:flex lg:w-[45%] relative overflow-hidden bg-[#071A35] min-h-screen">
            {/* Video Background (simulated with gradient + animation) */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-br from-[#071A35] via-[#0a2a5a] to-[#1E40AF] opacity-90" />
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4MCIgaGVpZ2h0PSI4MCIgdmlld0JveD0iMCAwIDgwIDgwIj48cGF0aCBkPSJNMjAgMjBoMTB2MTBIMjB6TTUwIDUwaDEwdjEwSDUweiIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjAyKSIvPjwvc3ZnPg==')] opacity-30" />
                <FloatingBackground />
                <AnimatedPlane />
            </div>

            {/* Content */}
            <div className="relative z-10 flex flex-col justify-between p-8 md:p-12 lg:p-16 w-full h-full">
                {/* Top */}
                <div>
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="flex items-center gap-2"
                    >
                        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#FBBF24] to-[#F97316] flex items-center justify-center shadow-lg shadow-[#FBBF24]/20">
                            <FaPlane className="text-white text-lg" />
                        </div>
                        <span className="text-white font-bold text-xl font-['Playfair_Display'] tracking-wide">
                            Luxe<span className="text-[#FBBF24]">Voyage</span>
                        </span>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        className="mt-12 md:mt-16"
                    >
                        <div className="inline-block px-3 py-1 rounded-full bg-white/10 border border-white/10 text-white/80 text-xs font-['Inter'] tracking-wider uppercase mb-4">
                            ✦ Premium Travel Platform
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-['Playfair_Display'] text-white leading-[1.1]">
                            Discover the <br />
                            <span className="bg-gradient-to-r from-[#FBBF24] via-[#F97316] to-[#FBBF24] bg-clip-text text-transparent">
                                Art of Travel
                            </span>
                        </h1>
                        <p className="text-white/70 text-sm md:text-base font-['Inter'] mt-4 max-w-sm leading-relaxed">
                            Experience luxury redefined. Curated journeys, exclusive destinations,
                            and impeccable service — all at your fingertips.
                        </p>
                    </motion.div>

                    <DestinationCards />
                    <StatisticsCards />
                </div>

                {/* Bottom quote */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                    className="mt-8"
                >
                    <div className="border-t border-white/10 pt-4">
                        <p className="text-white/40 text-xs font-['Inter'] italic tracking-wide">
                            "Travel is the only thing you buy that makes you richer."
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                            <div className="flex -space-x-1">
                                {[1, 2, 3].map((i) => (
                                    <div
                                        key={i}
                                        className="w-6 h-6 rounded-full border-2 border-[#071A35] bg-gradient-to-br from-white/20 to-white/5"
                                    />
                                ))}
                            </div>
                            <span className="text-white/30 text-xs font-['Inter']">
                                Join 30,000+ luxury travelers
                            </span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

// ============================================================
// 6. INPUT FIELD (Premium)
// ============================================================
const InputField = ({
    label,
    type = "text",
    icon: Icon,
    value,
    onChange,
    onBlur,
    error,
    success,
    placeholder,
    required,
    autoComplete,
    name,
    id,
    className = "",
    ...props
}) => {
    const [isFocused, setIsFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const inputRef = useRef(null);

    const isPassword = type === "password";
    const inputType = isPassword ? (showPassword ? "text" : "password") : type;

    const handleFocus = () => setIsFocused(true);
    const handleBlur = (e) => {
        setIsFocused(false);
        if (onBlur) onBlur(e);
    };

    const hasValue = value && value.length > 0;
    const isError = !!error;
    const isSuccess = !!success;

    return (
        <div className={`relative w-full ${className}`}>
            <div
                className={`
                    relative rounded-xl transition-all duration-300
                    ${isFocused ? "ring-2 ring-[#FBBF24]/60 shadow-[0_0_30px_rgba(251,191,36,0.1)]" : ""}
                    ${isError ? "ring-2 ring-rose-500/60" : ""}
                    ${isSuccess ? "ring-2 ring-emerald-500/60" : ""}
                `}
            >
                <div
                    className={`
                        relative flex items-center bg-white/5 backdrop-blur-sm border rounded-xl
                        transition-all duration-300 overflow-hidden
                        ${isFocused ? "border-[#FBBF24]/50 bg-white/8" : "border-white/10"}
                        ${isError ? "border-rose-500/50 bg-rose-500/5" : ""}
                        ${isSuccess ? "border-emerald-500/50 bg-emerald-500/5" : ""}
                        ${hasValue && !isError ? "border-white/20" : ""}
                        hover:bg-white/8 hover:border-white/20
                    `}
                >
                    {Icon && (
                        <div
                            className={`
                                pl-4 pr-1 text-sm transition-colors duration-300
                                ${isFocused ? "text-[#FBBF24]" : "text-white/40"}
                                ${isError ? "text-rose-400" : ""}
                                ${isSuccess ? "text-emerald-400" : ""}
                            `}
                        >
                            <Icon />
                        </div>
                    )}

                    <input
                        ref={inputRef}
                        id={id || name}
                        name={name}
                        type={inputType}
                        value={value}
                        onChange={onChange}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        placeholder={placeholder || label}
                        autoComplete={autoComplete}
                        required={required}
                        className={`
                            w-full bg-transparent text-white text-sm md:text-base font-['Inter'] 
                            py-3.5 px-3 outline-none transition-all duration-300
                            placeholder:text-white/20 placeholder:font-light
                            ${Icon ? "pl-2" : "pl-4"}
                            ${isPassword ? "pr-11" : "pr-4"}
                            autofill:bg-transparent autofill:text-white
                        `}
                        {...props}
                    />

                    {isPassword && (
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 text-white/30 hover:text-white/70 transition-colors duration-200 p-1"
                            aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                            {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                        </button>
                    )}

                    {isSuccess && !isPassword && (
                        <div className="absolute right-3 text-emerald-400">
                            <FaCheckCircle size={16} />
                        </div>
                    )}
                </div>
            </div>

            {/* Floating label */}
            <label
                htmlFor={id || name}
                className={`
                    absolute left-3.5 text-[10px] md:text-xs font-['Inter'] transition-all duration-300 pointer-events-none
                    ${isFocused || hasValue ? "top-[-6px] text-[10px] px-1.5 bg-[#071A35] rounded" : "top-3.5 text-sm"}
                    ${isFocused ? "text-[#FBBF24]" : "text-white/40"}
                    ${isError ? "text-rose-400" : ""}
                    ${isSuccess ? "text-emerald-400" : ""}
                    ${isFocused || hasValue ? "translate-y-0" : "translate-y-0"}
                `}
                style={{
                    left: Icon ? "36px" : "14px",
                    transform: isFocused || hasValue ? "translateY(-14px)" : "translateY(0)",
                }}
            >
                {label}
                {required && <span className="text-[#FBBF24] ml-0.5">*</span>}
            </label>

            {/* Error message */}
            <AnimatePresence>
                {isError && (
                    <motion.div
                        initial={{ opacity: 0, y: -5, height: 0 }}
                        animate={{ opacity: 1, y: 2, height: "auto" }}
                        exit={{ opacity: 0, y: -5, height: 0 }}
                        className="text-rose-400 text-[10px] md:text-xs font-['Inter'] pl-1 pt-1"
                    >
                        {error}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

// ============================================================
// 7. PASSWORD STRENGTH
// ============================================================
const PasswordStrength = ({ password }) => {
    const [strength, setStrength] = useState({ score: 0, label: "", color: "" });

    useEffect(() => {
        if (!password) {
            setStrength({ score: 0, label: "", color: "bg-white/10" });
            return;
        }

        let score = 0;
        if (password.length >= 8) score++;
        if (password.length >= 12) score++;
        if (/[A-Z]/.test(password)) score++;
        if (/[a-z]/.test(password)) score++;
        if (/[0-9]/.test(password)) score++;
        if (/[^A-Za-z0-9]/.test(password)) score++;

        const levels = [
            { label: "Weak", color: "bg-rose-500", width: "16%" },
            { label: "Fair", color: "bg-orange-400", width: "32%" },
            { label: "Good", color: "bg-yellow-400", width: "50%" },
            { label: "Strong", color: "bg-emerald-400", width: "75%" },
            { label: "Excellent", color: "bg-emerald-500", width: "100%" },
        ];

        const idx = Math.min(Math.floor(score / 2), 4);
        setStrength({ score, label: levels[idx].label, color: levels[idx].color, width: levels[idx].width });
    }, [password]);

    if (!password) return null;

    return (
        <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="mt-2 space-y-1.5"
        >
            <div className="flex items-center justify-between">
                <span className="text-white/40 text-[10px] md:text-xs font-['Inter']">
                    Password Strength
                </span>
                <span className={`text-[10px] md:text-xs font-['Inter'] font-medium ${strength.color.replace('bg-', 'text-')}`}>
                    {strength.label}
                </span>
            </div>
            <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                    className={`h-full rounded-full ${strength.color}`}
                    initial={{ width: "0%" }}
                    animate={{ width: strength.width || "0%" }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                />
            </div>
            <div className="flex justify-between">
                {["Weak", "Fair", "Good", "Strong", "Excellent"].map((label, i) => (
                    <span
                        key={i}
                        className={`text-[8px] font-['Inter'] transition-colors duration-300 ${i <= Math.min(Math.floor(strength.score / 2), 4)
                                ? "text-[#FBBF24]/60"
                                : "text-white/20"
                            }`}
                    >
                        {label}
                    </span>
                ))}
            </div>
        </motion.div>
    );
};

// ============================================================
// 8. LUXURY BUTTON
// ============================================================
const LuxuryButton = ({
    children,
    onClick,
    isLoading = false,
    isSuccess = false,
    type = "button",
    variant = "primary",
    className = "",
    disabled = false,
    icon: Icon,
    iconPosition = "right",
    ...props
}) => {
    const buttonRef = useRef(null);

    const variants = {
        primary: "bg-gradient-to-r from-[#FBBF24] to-[#F97316] text-[#071A35] hover:shadow-[0_0_40px_rgba(251,191,36,0.3)]",
        secondary: "bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 hover:border-white/30",
        ghost: "bg-transparent text-white/70 hover:text-white hover:bg-white/5",
    };

    return (
        <motion.button
            ref={buttonRef}
            type={type}
            onClick={onClick}
            disabled={disabled || isLoading}
            className={`
                relative overflow-hidden px-6 md:px-8 py-3.5 md:py-4 rounded-xl
                font-['Poppins'] font-semibold text-sm md:text-base
                transition-all duration-300
                flex items-center justify-center gap-2.5
                w-full
                ${variants[variant] || variants.primary}
                ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
                ${isSuccess ? "bg-emerald-500 text-white shadow-[0_0_40px_rgba(16,185,129,0.3)]" : ""}
                ${className}
            `}
            whileHover={!disabled && !isLoading ? { scale: 1.02, y: -2 } : {}}
            whileTap={!disabled && !isLoading ? { scale: 0.98 } : {}}
            {...props}
        >
            {/* Shine effect */}
            {!disabled && !isLoading && !isSuccess && (
                <motion.div
                    className="absolute inset-0 w-[200%] bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-20deg]"
                    animate={{ x: ["-100%", "200%"] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />
            )}

            {/* Ripple */}
            {!disabled && !isLoading && !isSuccess && (
                <motion.div
                    className="absolute inset-0 rounded-xl border-2 border-white/20"
                    initial={{ opacity: 0, scale: 1 }}
                    animate={{ opacity: [0, 0.3, 0], scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
            )}

            <span className="relative z-10 flex items-center gap-2.5">
                {isLoading ? (
                    <>
                        <FaSpinner className="animate-spin text-current" size={18} />
                        <span>Loading...</span>
                    </>
                ) : isSuccess ? (
                    <>
                        <FaCheckCircle className="text-white" size={18} />
                        <span>Success!</span>
                    </>
                ) : (
                    <>
                        {Icon && iconPosition === "left" && <Icon size={18} />}
                        {children}
                        {Icon && iconPosition === "right" && <Icon size={18} />}
                    </>
                )}
            </span>
        </motion.button>
    );
};

// ============================================================
// 9. SOCIAL LOGIN BUTTONS
// ============================================================
const SocialLogin = ({ onSocialLogin }) => {
    const providers = [
        { id: "google", icon: FaGoogle, label: "Google", color: "hover:border-white/30" },
        { id: "apple", icon: FaApple, label: "Apple", color: "hover:border-white/30" },
        { id: "facebook", icon: FaFacebookF, label: "Facebook", color: "hover:border-white/30" },
    ];

    return (
        <div className="flex gap-3">
            {providers.map((provider) => (
                <motion.button
                    key={provider.id}
                    onClick={() => onSocialLogin?.(provider.id)}
                    className={`
                        flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl
                        bg-white/5 backdrop-blur-sm border border-white/10
                        text-white/70 hover:text-white hover:bg-white/12
                        transition-all duration-300 text-sm font-['Inter']
                        ${provider.color}
                    `}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={`Continue with ${provider.label}`}
                >
                    <provider.icon size={18} className="text-current" />
                    <span className="hidden sm:inline">{provider.label}</span>
                </motion.button>
            ))}
        </div>
    );
};

// ============================================================
// 10. AUTH CARD (Main)
// ============================================================
const AuthCard = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [toast, setToast] = useState(null);

    // Simulated login/register
    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = {};

        if (isLogin) {
            if (!email) newErrors.email = "Email is required";
            else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Invalid email";
            if (!password) newErrors.password = "Password is required";
            else if (password.length < 6) newErrors.password = "Min 6 characters";
        } else {
            if (!name) newErrors.name = "Name is required";
            if (!email) newErrors.email = "Email is required";
            else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Invalid email";
            if (!password) newErrors.password = "Password is required";
            else if (password.length < 6) newErrors.password = "Min 6 characters";
            if (password !== confirmPassword) newErrors.confirmPassword = "Passwords don't match";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setErrors({});
        setIsLoading(true);

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1800));

        setIsLoading(false);
        setIsSuccess(true);

        setToast({
            message: isLogin ? "Welcome back! ✦" : "Account created! ✦",
            type: "success",
        });

        setTimeout(() => {
            setIsSuccess(false);
            setToast(null);
        }, 3000);
    };

    const toggleMode = () => {
        setIsLogin(!isLogin);
        setErrors({});
        setPassword("");
        setConfirmPassword("");
        setName("");
        setToast(null);
    };

    const handleSocialLogin = (provider) => {
        setToast({
            message: `Connecting to ${provider}...`,
            type: "info",
        });
        setTimeout(() => setToast(null), 2000);
    };

    return (
        <div className="w-full lg:w-[55%] min-h-screen flex items-center justify-center p-4 md:p-6 lg:p-8 bg-[#071A35] relative overflow-hidden">
            {/* Mobile background */}
            <div className="lg:hidden absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-br from-[#071A35] via-[#0a2a5a] to-[#1E40AF] opacity-90" />
                <FloatingBackground />
            </div>

            {/* Auth Card */}
            <motion.div
                initial={{ opacity: 0, y: 40, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
                className="relative z-10 w-full max-w-[440px]"
            >
                {/* Glass card */}
                <div
                    className="
                        relative rounded-[40px] p-6 md:p-8 lg:p-10
                        bg-white/5 backdrop-blur-xl
                        border border-white/10
                        shadow-[0_20px_80px_rgba(0,0,0,0.4)]
                        overflow-hidden
                    "
                >
                    {/* Glow edge */}
                    <div className="absolute inset-0 rounded-[40px] p-[1px] bg-gradient-to-br from-white/10 via-transparent to-[#FBBF24]/10 pointer-events-none" />
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FBBF24]/30 to-transparent" />

                    {/* Floating orb inside card */}
                    <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-[#FBBF24]/5 blur-2xl" />
                    <div className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full bg-[#F97316]/5 blur-2xl" />

                    {/* Header */}
                    <div className="relative">
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex items-center gap-2 mb-1"
                        >
                            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#FBBF24] to-[#F97316] flex items-center justify-center shadow-lg shadow-[#FBBF24]/20">
                                <FaPlane className="text-white text-xs" />
                            </div>
                            <span className="text-white font-bold text-lg font-['Playfair_Display'] tracking-wide">
                                Luxe<span className="text-[#FBBF24]">Voyage</span>
                            </span>
                        </motion.div>

                        <motion.h2
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.1 }}
                            className="text-white text-2xl md:text-3xl font-['Playfair_Display'] font-semibold mt-4"
                        >
                            {isLogin ? "Welcome Back" : "Join the Journey"}
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.15 }}
                            className="text-white/50 text-sm font-['Inter'] mt-1"
                        >
                            {isLogin
                                ? "Sign in to continue your luxury travel experience"
                                : "Create your account and start exploring the world"}
                        </motion.p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="relative mt-6 space-y-4">
                        {!isLogin && (
                            <InputField
                                id="name"
                                name="name"
                                label="Full Name"
                                icon={HiOutlineUser}
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                error={errors.name}
                                placeholder="James Anderson"
                                autoComplete="name"
                                required
                            />
                        )}

                        <InputField
                            id="email"
                            name="email"
                            label="Email Address"
                            type="email"
                            icon={HiOutlineMail}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            error={errors.email}
                            placeholder="james@example.com"
                            autoComplete="email"
                            required
                        />

                        <InputField
                            id="password"
                            name="password"
                            label="Password"
                            type="password"
                            icon={HiOutlineLockClosed}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            error={errors.password}
                            placeholder="••••••••"
                            autoComplete={isLogin ? "current-password" : "new-password"}
                            required
                        />

                        {!isLogin && (
                            <>
                                <InputField
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    label="Confirm Password"
                                    type="password"
                                    icon={HiOutlineLockClosed}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    error={errors.confirmPassword}
                                    placeholder="••••••••"
                                    autoComplete="new-password"
                                    required
                                />
                                <PasswordStrength password={password} />
                            </>
                        )}

                        {/* Remember me & Forgot password */}
                        {isLogin && (
                            <div className="flex items-center justify-between">
                                <label className="flex items-center gap-2 cursor-pointer group">
                                    <div className="relative">
                                        <input
                                            type="checkbox"
                                            checked={rememberMe}
                                            onChange={(e) => setRememberMe(e.target.checked)}
                                            className="sr-only"
                                        />
                                        <div
                                            className={`
                                                w-4 h-4 rounded border transition-all duration-300
                                                ${rememberMe
                                                    ? "bg-[#FBBF24] border-[#FBBF24] shadow-[0_0_20px_rgba(251,191,36,0.2)]"
                                                    : "border-white/20 bg-white/5 group-hover:border-white/40"
                                                }
                                            `}
                                        >
                                            {rememberMe && (
                                                <FaCheckCircle className="text-[#071A35] text-[10px] w-full h-full" />
                                            )}
                                        </div>
                                    </div>
                                    <span className="text-white/50 text-xs font-['Inter'] group-hover:text-white/70 transition-colors">
                                        Remember me
                                    </span>
                                </label>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setToast({
                                            message: "Reset link sent to your email ✦",
                                            type: "info",
                                        });
                                        setTimeout(() => setToast(null), 2500);
                                    }}
                                    className="text-[#FBBF24]/60 hover:text-[#FBBF24] text-xs font-['Inter'] transition-colors"
                                >
                                    Forgot password?
                                </button>
                            </div>
                        )}

                        {/* Submit Button */}
                        <LuxuryButton
                            type="submit"
                            isLoading={isLoading}
                            isSuccess={isSuccess}
                            icon={FaArrowRight}
                            iconPosition="right"
                            className="mt-2"
                        >
                            {isLogin ? "Continue Your Journey" : "Start Your Journey"}
                        </LuxuryButton>

                        {/* Divider */}
                        <div className="relative flex items-center gap-3 py-1">
                            <div className="flex-1 h-px bg-white/10" />
                            <span className="text-white/20 text-[10px] font-['Inter'] tracking-wider uppercase">
                                or continue with
                            </span>
                            <div className="flex-1 h-px bg-white/10" />
                        </div>

                        {/* Social Login */}
                        <SocialLogin onSocialLogin={handleSocialLogin} />

                        {/* Toggle */}
                        <div className="text-center pt-1">
                            <button
                                type="button"
                                onClick={toggleMode}
                                className="text-white/40 hover:text-[#FBBF24] text-xs font-['Inter'] transition-colors group"
                            >
                                {isLogin ? (
                                    <>
                                        Don't have an account?{" "}
                                        <span className="text-[#FBBF24] font-medium group-hover:underline">
                                            Create one
                                        </span>
                                    </>
                                ) : (
                                    <>
                                        Already have an account?{" "}
                                        <span className="text-[#FBBF24] font-medium group-hover:underline">
                                            Sign in
                                        </span>
                                    </>
                                )}
                            </button>
                        </div>

                        {/* Trust badge */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className="flex items-center justify-center gap-4 pt-2"
                        >
                            <div className="flex items-center gap-1.5 text-white/20 text-[10px] font-['Inter']">
                                <FaShieldAlt className="text-[#FBBF24]/30" />
                                <span>256-bit SSL</span>
                            </div>
                            <div className="w-px h-3 bg-white/10" />
                            <div className="flex items-center gap-1.5 text-white/20 text-[10px] font-['Inter']">
                                <FaUserCheck className="text-[#FBBF24]/30" />
                                <span>Secure Login</span>
                            </div>
                            <div className="w-px h-3 bg-white/10" />
                            <div className="flex items-center gap-1.5 text-white/20 text-[10px] font-['Inter']">
                                <FaClock className="text-[#FBBF24]/30" />
                                <span>24/7 Support</span>
                            </div>
                        </motion.div>
                    </form>
                </div>

                {/* Toast Notification */}
                <AnimatePresence>
                    {toast && (
                        <motion.div
                            initial={{ opacity: 0, y: 20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -20, scale: 0.95 }}
                            className={`
                                absolute -bottom-16 left-0 right-0 mx-auto w-full max-w-[400px]
                                px-4 py-2.5 rounded-xl text-center text-sm font-['Inter'] font-medium
                                backdrop-blur-xl border shadow-lg
                                ${toast.type === "success"
                                    ? "bg-emerald-500/20 border-emerald-500/30 text-emerald-200"
                                    : "bg-[#FBBF24]/20 border-[#FBBF24]/30 text-[#FBBF24]/90"
                                }
                            `}
                        >
                            {toast.message}
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

            {/* Mobile hero text (visible only on small screens) */}
            <div className="lg:hidden absolute bottom-8 left-0 right-0 text-center z-5 px-4">
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-white/30 text-[10px] font-['Inter'] tracking-widest uppercase"
                >
                    ✦ Luxury Travel Reimagined ✦
                </motion.p>
            </div>
        </div>
    );
};

// ============================================================
// 11. MAIN PAGE
// ============================================================
export default function AuthPage() {
    return (
        <div className="min-h-screen w-full bg-[#071A35] flex flex-col lg:flex-row overflow-hidden antialiased">
            {/* Hero Section - Desktop only */}
            <HeroSection />

            {/* Auth Card - Full width on mobile, 55% on desktop */}
            <AuthCard />
        </div>
    );
}