"use client";

import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import Button from "@/components/atoms/form/Button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { signup } from "@/hooks/useAuth";
import Modal from "../dashboard/Modal";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { toast } from "sonner";

export function SignupForm({ className, ...props }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  });
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const correctOtpRef = useRef(null);


  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setOtpLoading(true);
    setError("");
    try {
      const res = await sendOtp(formData.email);
      if (res && res.otp) {
        correctOtpRef.current = res.otp;
        setOtpSent(true);
        toast.success("OTP sent to your email!");
        setModalOpen(true);
      } else {
        throw new Error("Failed to send OTP");
      }
    } catch (err) {
      setError(err?.message || "Failed to send OTP. Please try again.");
      toast.error("Failed to send OTP. Please try again.");
    } finally {
      setOtpLoading(false);
    }
  };

  const handleVerifyOtpAndSignup = async () => {
    if (!correctOtpRef.current) {
      setError("Please request an OTP first");
      return;
    }

    if (otp !== correctOtpRef.current) {
      setError("Invalid OTP");
      toast.error("Invalid OTP. Please try again.");
      return;
    }

    setLoading(true);
    setError("");
    try {
      await signup(
        formData.name,
        formData.email,
        formData.password,
        formData.role
      );
      toast.success("Signup successful!");
      setModalOpen(false);
      router.push("/dashboard");
    } catch (err) {
      setError(err?.message || "Signup failed. Please try again.");
      toast.error(err?.message || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Auto-verify OTP when input is full
  useEffect(() => {
    if (otp.length === 6 && correctOtpRef.current) {
      handleVerifyOtpAndSignup();
    }
  }, [otp]);

  const handleResendOtp = async () => {
    setOtpLoading(true);
    setError("");
    try {
      const res = await sendOtp(formData.email);
      if (res && res.otp) {
        correctOtpRef.current = res.otp;
        toast.success("New OTP sent to your email!");
      } else {
        throw new Error("Failed to send OTP");
      }
    } catch (err) {
      setError(err?.message || "Failed to send OTP. Please try again.");
      toast.error("Failed to send OTP. Please try again.");
    } finally {
      setOtpLoading(false);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSendOtp}
        className={cn("flex flex-col gap-5", className)}
        {...props}
      >
        <div className="flex flex-col items-center gap-4 text-center pb-6">
          <h1 className="text-2xl sm:text-4xl text-nowrap font-bold font-stretch-125%">Create your account</h1>
          <p className="text-sm text-muted-foreground">
            Enter your information below to sign up.
          </p>
        </div>

        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Company Name</Label>
            <Input
              id="name"
              name="name"
               className="rounded-4xl p-5"
              placeholder="e.g AAA Inc."
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
                className="rounded-4xl p-5"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="********"
               className="rounded-4xl p-5"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
               className="rounded-4xl p-5"
              placeholder="********"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          {error && <ErrorMessage message={error} />}
          <Button
            className="bg-accent hover:bg-highlight animate-in-out duration-300"
            round
            wide
            loading={otpLoading}
            loaderColor="white"
            loaderSize={24}
            type="submit"
            disabled={otpLoading}
          >
            Sign Up
          </Button>
        </div>
        <div className="text-center text-sm">
          Already have an account?{" "}
          <Link href="/auth/signin" className="underline underline-offset-4">
            Login
          </Link>
        </div>
      </form>

      <Modal
        title="Verify Your Email"
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        className="max-w-md w-full"
      >
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground text-center">
            Please enter the 6-digit code sent to {formData.email}
          </p>

          <InputOTP maxLength={6} value={otp} onChange={setOtp}>
            <InputOTPGroup>
              {[0, 1, 2, 3, 4, 5].map((idx) => (
                <InputOTPSlot key={idx} index={idx} />
              ))}
            </InputOTPGroup>
          </InputOTP>

          <div className="flex flex-col gap-2">
            <Button
              wide
              loading={loading}
              onClick={handleVerifyOtpAndSignup}
              disabled={loading || otp.length !== 6}
            >
              Verify OTP & Complete Signup
            </Button>

            <Button
              variant="outline"
              wide
              loading={otpLoading}
              onClick={handleResendOtp}
              disabled={otpLoading}
            >
              Resend OTP
            </Button>
          </div>

          {error && <ErrorMessage message={error} />}
        </div>
      </Modal>
    </>
  );
}
