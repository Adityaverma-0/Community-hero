import { useState } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/lib/auth-context";
import { AlertCircle, Mail, Lock, Eye, EyeOff, User, Phone } from "lucide-react";

export default function Login() {
  const { login, register } = useAuth();
  const [, setLocation] = useLocation();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState<"login" | "register">("login");
  const [showPassword, setShowPassword] = useState(false);

  // Login form state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Register form state
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regPhone, setRegPhone] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      const user = await login(loginEmail, loginPassword);
      if (user.role === "admin") setLocation("/admin");
      else if (user.role === "officer") setLocation("/officer");
      else setLocation("/citizen");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      await register(regName, regEmail, regPassword, regPhone);
      setLocation("/citizen");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Full-screen background video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        poster="/images/taj-mahal.jpg"
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/images/hero-bg.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Glassmorphism card */}
      <div className="relative z-10 w-full max-w-md mx-4">
        <div
          className="rounded-2xl p-8"
          style={{
            background: "rgba(30, 50, 90, 0.45)",
            backdropFilter: "blur(18px)",
            WebkitBackdropFilter: "blur(18px)",
            border: "1px solid rgba(255,255,255,0.18)",
            boxShadow: "0 8px 40px rgba(0,0,0,0.45)",
          }}
        >
          {/* Title */}
          <h1 className="text-3xl font-bold text-white text-center mb-7 tracking-wide">
            {mode === "login" ? "Login" : "Register"}
          </h1>

          {/* Error */}
          {error && (
            <div className="mb-5 flex items-center gap-2 text-sm text-red-300 bg-red-500/20 border border-red-400/30 rounded-lg px-3 py-2">
              <AlertCircle className="h-4 w-4 flex-shrink-0" />
              {error}
            </div>
          )}

          {/* ── LOGIN FORM ── */}
          {mode === "login" && (
            <form onSubmit={handleLogin} className="space-y-4">
              {/* Email */}
              <div className="relative">
                <input
                  type="email"
                  value={loginEmail}
                  onChange={e => setLoginEmail(e.target.value)}
                  placeholder="Email"
                  required
                  className="w-full bg-white/10 border-b border-white/30 text-white placeholder-white/50 py-3 pr-10 pl-1 text-sm focus:outline-none focus:border-white transition-colors"
                  style={{ background: "transparent" }}
                />
                <Mail className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50" />
              </div>

              {/* Password */}
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={loginPassword}
                  onChange={e => setLoginPassword(e.target.value)}
                  placeholder="Password"
                  required
                  className="w-full bg-white/10 border-b border-white/30 text-white placeholder-white/50 py-3 pr-10 pl-1 text-sm focus:outline-none focus:border-white transition-colors"
                  style={{ background: "transparent" }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(v => !v)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-white/50 hover:text-white/80"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                </button>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full mt-2 py-3 rounded-lg bg-black/80 hover:bg-black text-white font-semibold text-sm tracking-wide transition-colors disabled:opacity-60"
              >
                {isLoading ? "Signing in…" : "Login"}
              </button>

              {/* Switch to register */}
              <p className="text-center text-sm text-white/50 mt-2">
                Don't have an account?{" "}
                <button
                  type="button"
                  onClick={() => { setMode("register"); setError(""); }}
                  className="text-white/80 hover:text-white underline underline-offset-2"
                >
                  Register
                </button>
              </p>
            </form>
          )}

          {/* ── REGISTER FORM ── */}
          {mode === "register" && (
            <form onSubmit={handleRegister} className="space-y-4">
              {/* Full Name */}
              <div className="relative">
                <input
                  value={regName}
                  onChange={e => setRegName(e.target.value)}
                  placeholder="Full Name"
                  required
                  className="w-full border-b border-white/30 text-white placeholder-white/50 py-3 pr-10 pl-1 text-sm focus:outline-none focus:border-white transition-colors"
                  style={{ background: "transparent" }}
                />
                <User className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50" />
              </div>

              {/* Email */}
              <div className="relative">
                <input
                  type="email"
                  value={regEmail}
                  onChange={e => setRegEmail(e.target.value)}
                  placeholder="Email"
                  required
                  className="w-full border-b border-white/30 text-white placeholder-white/50 py-3 pr-10 pl-1 text-sm focus:outline-none focus:border-white transition-colors"
                  style={{ background: "transparent" }}
                />
                <Mail className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50" />
              </div>

              {/* Phone */}
              <div className="relative">
                <input
                  value={regPhone}
                  onChange={e => setRegPhone(e.target.value)}
                  placeholder="Phone (optional)"
                  className="w-full border-b border-white/30 text-white placeholder-white/50 py-3 pr-10 pl-1 text-sm focus:outline-none focus:border-white transition-colors"
                  style={{ background: "transparent" }}
                />
                <Phone className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50" />
              </div>

              {/* Password */}
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={regPassword}
                  onChange={e => setRegPassword(e.target.value)}
                  placeholder="Password (min. 6 chars)"
                  required
                  minLength={6}
                  className="w-full border-b border-white/30 text-white placeholder-white/50 py-3 pr-10 pl-1 text-sm focus:outline-none focus:border-white transition-colors"
                  style={{ background: "transparent" }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(v => !v)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-white/50 hover:text-white/80"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                </button>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full mt-2 py-3 rounded-lg bg-black/80 hover:bg-black text-white font-semibold text-sm tracking-wide transition-colors disabled:opacity-60"
              >
                {isLoading ? "Creating account…" : "Create Account"}
              </button>

              {/* Switch to login */}
              <p className="text-center text-sm text-white/50 mt-2">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => { setMode("login"); setError(""); }}
                  className="text-white/80 hover:text-white underline underline-offset-2"
                >
                  Login
                </button>
              </p>
            </form>
          )}

          {/* Back to home */}
          <p className="text-center mt-5">
            <a href="/" className="text-xs text-white/30 hover:text-white/60 transition-colors">
              ← Back to home
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
