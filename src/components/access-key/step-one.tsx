"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle,
  Mail,
  AlertCircle,
  Shield,
  ArrowRight,
  X,
} from "lucide-react";
import { MessageSquare } from "lucide-react";
import { User } from "@supabase/supabase-js";
import { createClient } from "../../../supabase/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export default function StepOne({ user }: { user: User }) {
  const [verificationSent, setVerificationSent] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(
    user.email_confirmed_at !== null,
  );
  const [isDiscordVerified, setIsDiscordVerified] = useState(false);
  const [requireVerification] = useState(true);
  const [isVerified, setIsVerified] = useState(isEmailVerified);
  const supabase = createClient();

  // Check if user has Discord verification
  useEffect(() => {
    const checkDiscordVerification = async () => {
      const { data, error } = await supabase
        .from("users")
        .select("discord_verified")
        .eq("id", user.id)
        .single();

      if (data && data.discord_verified) {
        setIsDiscordVerified(true);
      }
    };

    checkDiscordVerification();
  }, [user.id, supabase]);

  // Update overall verification status when any verification method changes
  useEffect(() => {
    if (!requireVerification) {
      setIsVerified(true);
    } else {
      setIsVerified(isEmailVerified || isDiscordVerified);
    }
  }, [isEmailVerified, isDiscordVerified, requireVerification]);

  const sendVerificationEmail = async () => {
    try {
      // In a real implementation, this would call an API endpoint to send a verification email
      const response = await fetch("/api/verify-account", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        setVerificationSent(true);
        // For demo purposes, let's simulate verification after 3 seconds
        setTimeout(() => {
          setIsEmailVerified(true);
        }, 3000);
      }
    } catch (error) {
      console.error("Error sending verification email:", error);
    }
  };

  return (
    <Card className="bg-gray-800/80 border-gray-700 text-white shadow-xl rounded-xl backdrop-blur-sm h-full">
      <CardHeader className="pb-6">
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl font-bold">
            Step 1: Account Verification
          </CardTitle>
          {isVerified ? (
            <Badge
              variant="outline"
              className="bg-green-900/30 text-green-400 border-green-500 flex items-center gap-1 px-3 py-1.5"
            >
              <CheckCircle className="h-3.5 w-3.5" /> Verified
            </Badge>
          ) : (
            <Badge
              variant="outline"
              className="bg-yellow-900/30 text-yellow-400 border-yellow-500 flex items-center gap-1 px-3 py-1.5"
            >
              <AlertCircle className="h-3.5 w-3.5" /> Unverified
            </Badge>
          )}
        </div>
        <CardDescription className="text-gray-400 text-base">
          Verify your account to proceed with key generation
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-blue-950/30 rounded-xl p-5 flex items-start gap-4 border border-blue-900/50">
          <Shield className="h-7 w-7 text-blue-400 mt-1" />
          <div>
            <h3 className="font-medium text-blue-100 mb-2 text-lg">
              Why verification is required
            </h3>
            <p className="text-gray-300 leading-relaxed">
              Account verification helps us ensure that only authorized users
              can generate access keys. This adds an extra layer of security to
              protect our platform.
            </p>
          </div>
        </div>

        <Tabs defaultValue="email" className="w-full">
          <TabsList className="bg-gray-700/50 mb-4">
            <TabsTrigger
              value="email"
              className="data-[state=active]:bg-blue-600"
            >
              Email Verification
            </TabsTrigger>
            <TabsTrigger
              value="discord"
              className="data-[state=active]:bg-indigo-600"
            >
              Discord Verification
            </TabsTrigger>
          </TabsList>

          <TabsContent value="email">
            <div className="bg-gray-800/80 rounded-xl p-5 border border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium text-white text-lg">
                  Email Verification
                </h3>
                {isEmailVerified ? (
                  <Badge className="bg-green-500/20 text-green-400 border-green-500 px-3 py-1">
                    Verified
                  </Badge>
                ) : (
                  <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500 px-3 py-1">
                    Pending
                  </Badge>
                )}
              </div>

              <div className="flex items-center gap-3 text-base text-gray-300 mb-4 bg-gray-700/30 p-3 rounded-lg">
                <Mail className="h-5 w-5 text-blue-400" />
                <span>{user.email}</span>
              </div>

              {!isEmailVerified && (
                <div className="mt-5">
                  {verificationSent ? (
                    <div className="text-sm text-gray-300 bg-gray-700/50 p-4 rounded-lg border border-gray-600">
                      <p className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-green-400" />
                        Verification email sent. Please check your inbox and
                        click the verification link.
                      </p>
                    </div>
                  ) : (
                    <Button
                      onClick={sendVerificationEmail}
                      className="w-full bg-blue-600 hover:bg-blue-500 text-white py-6 text-base font-medium rounded-lg transition-all duration-200 shadow-lg shadow-blue-900/20"
                    >
                      Send Verification Email
                    </Button>
                  )}
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="discord">
            <div className="bg-gray-800/80 rounded-xl p-5 border border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium text-white text-lg">
                  Discord Verification
                </h3>
                {isDiscordVerified ? (
                  <Badge className="bg-green-500/20 text-green-400 border-green-500 px-3 py-1">
                    Verified
                  </Badge>
                ) : (
                  <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500 px-3 py-1">
                    Not Connected
                  </Badge>
                )}
              </div>

              <p className="text-gray-300 mb-5">
                Connect your Discord account to verify your identity and access
                additional features.
              </p>

              {isDiscordVerified ? (
                <div className="flex items-center justify-between bg-indigo-900/30 p-4 rounded-lg border border-indigo-800">
                  <div className="flex items-center gap-3">
                    <MessageSquare className="h-6 w-6 text-indigo-400" />
                    <div>
                      <p className="text-white font-medium">
                        Discord Connected
                      </p>
                      <p className="text-gray-400 text-sm">
                        Your Discord account is verified
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-indigo-700 text-indigo-300 hover:bg-indigo-900/50"
                  >
                    <X className="h-4 w-4 mr-2" /> Disconnect
                  </Button>
                </div>
              ) : (
                <Button
                  className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-6 text-base font-medium rounded-lg transition-all duration-200 shadow-lg shadow-indigo-900/20 flex items-center justify-center gap-2"
                  onClick={() =>
                    (window.location.href =
                      "https://discord.com/oauth2/authorize?client_id=1348120987631095899&response_type=code&redirect_uri=https%3A%2F%2Flcqusitdiuznrsckaara.supabase.co%2Fauth%2Fv1%2Fcallback&scope=guilds+guilds.join")
                  }
                >
                  <MessageSquare className="h-5 w-5" />
                  Connect Discord Account
                </Button>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="border-t border-gray-700/50 pt-6 flex justify-between">
        <Button
          variant="outline"
          className="border-gray-600 text-gray-300 hover:bg-gray-700 rounded-lg px-5 py-2.5"
          onClick={() => (window.location.href = "/dashboard")}
        >
          Back to Dashboard
        </Button>
        <Button
          disabled={!isVerified}
          className="bg-blue-600 hover:bg-blue-500 text-white rounded-lg px-5 py-2.5 flex items-center gap-2 transition-all duration-200 shadow-lg shadow-blue-900/20 disabled:shadow-none"
          onClick={() => {
            // Navigate to next step
            const tabTrigger = document.querySelector(
              '[value="step2"]',
            ) as HTMLElement;
            if (tabTrigger) tabTrigger.click();
          }}
        >
          Continue to Key Generation
          <ArrowRight className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
