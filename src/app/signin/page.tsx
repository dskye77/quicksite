"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "@/lib/firebase";

import Link from "next/link";
import { Zap, Eye, EyeOff, ArrowRight, Globe } from "lucide-react";

export default function SignInPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [signingIn, setSigningIn] = useState(false);

  const handleSignIn = async () => {
    setSigningIn(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/dashboard"); // redirect after login
    } catch (err) {
      console.error(err); // show error to user
      setSigningIn(false); // re-enable form
    }
  };

  const handleGoogle = async () => {
    setSigningIn(true);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      router.push("/dashboard");
    } catch (err) {
      console.error(err);
      setSigningIn(false);
    }
  };
  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Panel — Branding */}
      <div className="hidden lg:flex w-1/2 bg-primary flex-col justify-between p-12 relative overflow-hidden">
        {/* Background pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 80%, white 0%, transparent 50%), radial-gradient(circle at 80% 20%, white 0%, transparent 40%)",
          }}
        />
        <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full bg-white/5 -mr-16 -mb-16" />
        <div className="absolute top-1/3 -left-10 w-40 h-40 rounded-full bg-white/5" />

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 relative z-10">
          <div className="h-10 w-10 rounded-xl bg-white/20 grid place-items-center">
            <Zap className="h-5 w-5 text-white fill-white" />
          </div>
          <div>
            <p className="font-bold text-xl text-white">QuickSite</p>
            <p className="text-xs text-white/60">.com.ng</p>
          </div>
        </Link>

        {/* Middle quote */}
        <div className="relative z-10 space-y-6">
          <p className="text-3xl font-bold text-white leading-snug text-balance">
            &quot;My salon bookings doubled in the first week.&quot;
          </p>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-white/20 grid place-items-center text-sm font-bold text-white">
              CE
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Chiamaka Eze</p>
              <p className="text-xs text-white/60">GlowSalon — Abuja</p>
            </div>
          </div>
        </div>

        {/* Bottom stats */}
        <div className="relative z-10 grid grid-cols-3 gap-4">
          {[
            { value: "12,400+", label: "Businesses" },
            { value: "₦0", label: "To start" },
            { value: "5 min", label: "Setup time" },
          ].map((stat) => (
            <div key={stat.label} className="bg-white/10 rounded-xl p-4">
              <p className="text-xl font-bold text-white">{stat.value}</p>
              <p className="text-xs text-white/60 mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Right Panel — Form */}
      <div className="flex-1 flex flex-col justify-center items-center px-6 py-12">
        {/* Mobile Logo */}
        <Link href="/" className="flex items-center gap-2 mb-10 lg:hidden">
          <div className="h-9 w-9 rounded-xl bg-primary grid place-items-center">
            <Zap className="h-5 w-5 text-white fill-white" />
          </div>
          <p className="font-bold text-lg">QuickSite</p>
        </Link>

        <div className="w-full max-w-md">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Welcome back 👋</h1>
            <p className="text-muted-foreground text-sm">
              Sign in to manage your QuickSite.
            </p>
          </div>

          {/* Google SSO */}
          <button
            className="w-full flex items-center justify-center gap-3 border border-border rounded-xl h-11 text-sm font-medium hover:bg-muted transition mb-5"
            onClick={handleGoogle}
            disabled={signingIn}
          >
            <Globe className="h-4 w-4" />
            Continue with Google
          </button>

          <div className="flex items-center gap-3 mb-5">
            <div className="flex-1 h-px bg-border" />
            <span className="text-xs text-muted-foreground">or</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* Form */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1.5">
                Email address
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-11 px-4 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring/50 focus:border-ring transition"
              />
            </div>

            <div>
              <div className="flex justify-between mb-1.5">
                <label className="text-sm font-medium">Password</label>
                <Link
                  href="#"
                  className="text-xs text-primary hover:underline font-medium"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-11 px-4 pr-11 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring/50 focus:border-ring transition"
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <button
              className="w-full h-11 bg-primary text-primary-foreground rounded-xl font-semibold text-sm hover:opacity-90 transition flex items-center justify-center gap-2 mt-2"
              onClick={handleSignIn}
              disabled={signingIn}
            >
              Sign In <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="text-primary font-semibold hover:underline"
            >
              Create one free
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
