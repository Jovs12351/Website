"use client";

import { useState } from "react";
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
  AlertCircle,
  Key,
  Settings,
  Zap,
  ArrowRight,
  ArrowLeft,
  Loader2,
  Shield,
} from "lucide-react";
import { MessageSquare } from "lucide-react";

type KeyMethod = "lootdest" | "lootlabs" | null;

export default function StepTwo() {
  const [systemStatus, setSystemStatus] = useState<
    "operational" | "maintenance"
  >("operational");
  const [selectedMethod, setSelectedMethod] = useState<KeyMethod>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [useDiscordVerification, setUseDiscordVerification] = useState(false);

  const handleGenerate = async () => {
    if (!selectedMethod) return;

    setIsGenerating(true);

    try {
      // In a real implementation, this would call an API endpoint to generate a key
      const response = await fetch("/api/generate-key", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          keyType: selectedMethod,
          useDiscordVerification,
        }),
      });

      if (response.ok) {
        // Navigate to next step
        const tabTrigger = document.querySelector(
          '[value="step3"]',
        ) as HTMLElement;
        if (tabTrigger) tabTrigger.click();
      } else {
        // Handle error
        console.error("Failed to generate key");
      }
    } catch (error) {
      console.error("Error generating key:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  // For demo purposes, toggle system status
  const toggleSystemStatus = () => {
    setSystemStatus(
      systemStatus === "operational" ? "maintenance" : "operational",
    );
  };

  return (
    <Card className="bg-gray-800/80 border-gray-700 text-white shadow-xl rounded-xl backdrop-blur-sm h-full">
      <CardHeader className="pb-6">
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl font-bold">
            Step 2: Key Generation
          </CardTitle>
          {systemStatus === "operational" ? (
            <Badge
              variant="outline"
              className="bg-green-900/30 text-green-400 border-green-500 flex items-center gap-1 px-3 py-1.5"
            >
              <Zap className="h-3.5 w-3.5" /> Operational
            </Badge>
          ) : (
            <Badge
              variant="outline"
              className="bg-yellow-900/30 text-yellow-400 border-yellow-500 flex items-center gap-1 px-3 py-1.5"
            >
              <Settings className="h-3.5 w-3.5" /> Under Maintenance
            </Badge>
          )}
        </div>
        <CardDescription className="text-gray-400 text-base">
          Select your preferred key generation method
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {systemStatus === "maintenance" ? (
          <div className="bg-yellow-900/20 border border-yellow-700 rounded-xl p-5 flex items-start gap-4">
            <AlertCircle className="h-7 w-7 text-yellow-400 mt-1" />
            <div>
              <h3 className="font-medium text-yellow-300 mb-2 text-lg">
                System Maintenance
              </h3>
              <p className="text-gray-300">
                The key generation system is currently under maintenance. Please
                check back later.
              </p>
              <Button
                variant="outline"
                size="sm"
                className="mt-4 border-yellow-700 text-yellow-400 hover:bg-yellow-900/30 px-4 py-2 rounded-lg"
                onClick={toggleSystemStatus}
              >
                Check Status Again
              </Button>
            </div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card
                className={`bg-gray-800/80 border-gray-700 cursor-pointer transition-all hover:bg-gray-700/70 rounded-xl ${selectedMethod === "lootdest" ? "ring-2 ring-blue-500 shadow-lg shadow-blue-500/20" : ""}`}
                onClick={() => setSelectedMethod("lootdest")}
              >
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-medium flex items-center gap-3">
                    <div className="bg-blue-900/50 p-2.5 rounded-lg">
                      <Key className="h-5 w-5 text-blue-400" />
                    </div>
                    LootDest Keys
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400 mb-4">
                    Standard access keys for the LootDest platform. These keys
                    expire after 24 hours.
                  </p>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-blue-500/20 text-blue-400 border-blue-500 px-2.5 py-1">
                      24h Validity
                    </Badge>
                    <Badge className="bg-gray-700 text-gray-300 px-2.5 py-1">
                      Standard Access
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card
                className={`bg-gray-800/80 border-gray-700 cursor-pointer transition-all hover:bg-gray-700/70 rounded-xl ${selectedMethod === "lootlabs" ? "ring-2 ring-purple-500 shadow-lg shadow-purple-500/20" : ""}`}
                onClick={() => setSelectedMethod("lootlabs")}
              >
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-medium flex items-center gap-3">
                    <div className="bg-purple-900/50 p-2.5 rounded-lg">
                      <Key className="h-5 w-5 text-purple-400" />
                    </div>
                    LootLabs Keys
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400 mb-4">
                    Premium access keys for the LootLabs platform with extended
                    features and longer validity.
                  </p>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-purple-500/20 text-purple-400 border-purple-500 px-2.5 py-1">
                      7d Validity
                    </Badge>
                    <Badge className="bg-gray-700 text-gray-300 px-2.5 py-1">
                      Premium Access
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="bg-gray-800/80 rounded-xl p-5 border border-gray-700">
              <h3 className="font-medium text-white mb-3 text-lg">
                Key Generation Limits
              </h3>
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-400">Daily limit:</span>
                <span className="text-white font-medium">3 keys remaining</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2.5">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{ width: "70%" }}
                ></div>
              </div>
            </div>

            <div className="bg-indigo-900/20 rounded-xl p-5 border border-indigo-800/50">
              <div className="flex items-start gap-4">
                <MessageSquare className="h-6 w-6 text-indigo-400 mt-1" />
                <div className="flex-1">
                  <h3 className="font-medium text-indigo-100 mb-2 text-lg">
                    Discord Verification
                  </h3>
                  <p className="text-gray-300 mb-4">
                    Add an extra layer of security by requiring Discord
                    verification for this key.
                  </p>
                  <Button
                    variant={useDiscordVerification ? "default" : "outline"}
                    className={`w-full ${useDiscordVerification ? "bg-indigo-600 hover:bg-indigo-500 text-white" : "border-indigo-700 text-indigo-300 hover:bg-indigo-900/50"}`}
                    onClick={() =>
                      setUseDiscordVerification(!useDiscordVerification)
                    }
                  >
                    {useDiscordVerification ? (
                      <>
                        <Shield className="h-4 w-4 mr-2" />
                        Discord Verification Enabled
                      </>
                    ) : (
                      <>
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Enable Discord Verification
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </>
        )}
      </CardContent>
      <CardFooter className="border-t border-gray-700/50 pt-6 flex justify-between">
        <Button
          variant="outline"
          className="border-gray-600 text-gray-300 hover:bg-gray-700 rounded-lg px-5 py-2.5 flex items-center gap-2"
          onClick={() => {
            // Navigate to previous step
            const tabTrigger = document.querySelector(
              '[value="step1"]',
            ) as HTMLElement;
            if (tabTrigger) tabTrigger.click();
          }}
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Verification
        </Button>
        <Button
          disabled={
            !selectedMethod || systemStatus === "maintenance" || isGenerating
          }
          className="bg-blue-600 hover:bg-blue-500 text-white rounded-lg px-5 py-2.5 flex items-center gap-2 transition-all duration-200 shadow-lg shadow-blue-900/20 disabled:shadow-none"
          onClick={handleGenerate}
        >
          {isGenerating ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              Generate Access Key
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
