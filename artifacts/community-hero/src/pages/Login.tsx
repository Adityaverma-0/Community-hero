import { useState } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, AlertCircle } from "lucide-react";

export default function Login() {
  const { login, register } = useAuth();
  const [, setLocation] = useLocation();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

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
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        backgroundImage: "url(/images/login-bg.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* single glassmorphism card */}
      <div
        className="w-full max-w-md rounded-2xl p-8"
        style={{
          background: "rgba(255, 255, 255, 0.10)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          border: "1px solid rgba(255, 255, 255, 0.25)",
          boxShadow:
            "0 8px 32px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255,255,255,0.2)",
        }}
      >
        {/* brand header — merged into card */}
        <div className="flex items-center justify-center gap-2 mb-2">
          <Shield className="h-8 w-8 text-white drop-shadow" />
          <span className="text-2xl font-bold text-white drop-shadow">
            Community Hero
          </span>
        </div>
        <p className="text-center text-white/70 text-sm mb-6">
          AI-Powered Smart Civic Platform
        </p>

        <h2 className="text-xl font-semibold text-white mb-1">Welcome back</h2>
        <p className="text-white/60 text-sm mb-5">
          Sign in to your account or create a new one
        </p>

        {error && (
          <div className="mb-4 flex items-center gap-2 text-sm text-red-300 bg-red-500/20 border border-red-400/30 rounded-lg px-3 py-2">
            <AlertCircle className="h-4 w-4 flex-shrink-0" />
            {error}
          </div>
        )}

        <Tabs defaultValue="login">
          <TabsList className="w-full mb-5 bg-white/10 border border-white/20">
            <TabsTrigger
              value="login"
              className="flex-1 text-white/70 data-[state=active]:bg-white/20 data-[state=active]:text-white"
            >
              Sign In
            </TabsTrigger>
            <TabsTrigger
              value="register"
              className="flex-1 text-white/70 data-[state=active]:bg-white/20 data-[state=active]:text-white"
            >
              Register
            </TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="email" className="text-white/80 text-sm">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="mt-1 bg-white/10 border-white/25 text-white placeholder:text-white/40 focus-visible:ring-white/40"
                />
              </div>
              <div>
                <Label htmlFor="password" className="text-white/80 text-sm">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="mt-1 bg-white/10 border-white/25 text-white placeholder:text-white/40 focus-visible:ring-white/40"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-white/20 hover:bg-white/30 text-white border border-white/30 backdrop-blur-sm"
                disabled={isLoading}
              >
                {isLoading ? "Signing in…" : "Sign In"}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="register">
            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <Label htmlFor="rname" className="text-white/80 text-sm">
                  Full Name
                </Label>
                <Input
                  id="rname"
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  placeholder="Rahul Sharma"
                  required
                  className="mt-1 bg-white/10 border-white/25 text-white placeholder:text-white/40 focus-visible:ring-white/40"
                />
              </div>
              <div>
                <Label htmlFor="remail" className="text-white/80 text-sm">
                  Email
                </Label>
                <Input
                  id="remail"
                  type="email"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  placeholder="rahul@example.com"
                  required
                  className="mt-1 bg-white/10 border-white/25 text-white placeholder:text-white/40 focus-visible:ring-white/40"
                />
              </div>
              <div>
                <Label htmlFor="rphone" className="text-white/80 text-sm">
                  Phone (optional)
                </Label>
                <Input
                  id="rphone"
                  value={regPhone}
                  onChange={(e) => setRegPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="mt-1 bg-white/10 border-white/25 text-white placeholder:text-white/40 focus-visible:ring-white/40"
                />
              </div>
              <div>
                <Label htmlFor="rpassword" className="text-white/80 text-sm">
                  Password
                </Label>
                <Input
                  id="rpassword"
                  type="password"
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  placeholder="Min. 6 characters"
                  required
                  minLength={6}
                  className="mt-1 bg-white/10 border-white/25 text-white placeholder:text-white/40 focus-visible:ring-white/40"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-white/20 hover:bg-white/30 text-white border border-white/30 backdrop-blur-sm"
                disabled={isLoading}
              >
                {isLoading ? "Creating account…" : "Create Citizen Account"}
              </Button>
            </form>
          </TabsContent>
        </Tabs>

        <div className="mt-5 text-center">
          <a
            href="/"
            className="text-xs text-white/50 hover:text-white/80 transition-colors"
          >
            ← Back to home
          </a>
        </div>
      </div>
    </div>
  );
}
