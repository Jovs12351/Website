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
  Copy,
  Download,
  Clock,
  RefreshCw,
  ArrowLeft,
  Shield,
} from "lucide-react";

export default function StepThree() {
  const [accessKey, setAccessKey] = useState("");
  const [copied, setCopied] = useState(false);
  const [expiryTime, setExpiryTime] = useState<Date>(
    new Date(Date.now() + 24 * 60 * 60 * 1000),
  ); // 24 hours from now

  useEffect(() => {
    // Generate a random access key for demonstration
    const generateKey = () => {
      const chars =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      let result = "";
      for (let i = 0; i < 32; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return result;
    };

    setAccessKey(generateKey());
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(accessKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadKey = () => {
    const element = document.createElement("a");
    const file = new Blob([accessKey], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "access-key.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const formatTimeRemaining = () => {
    const now = new Date();
    const diff = expiryTime.getTime() - now.getTime();

    if (diff <= 0) return "Expired";

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    return `${hours}h ${minutes}m remaining`;
  };

  const generateNewKey = () => {
    // Navigate back to step 2
    const tabTrigger = document.querySelector('[value="step2"]') as HTMLElement;
    if (tabTrigger) tabTrigger.click();
  };

  return (
    <Card className="bg-gray-800/80 border-gray-700 text-white shadow-xl rounded-xl backdrop-blur-sm h-full">
      <CardHeader className="pb-6">
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl font-bold">
            Step 3: Key Delivery
          </CardTitle>
          <Badge
            variant="outline"
            className="bg-green-900/30 text-green-400 border-green-500 flex items-center gap-1 px-3 py-1.5"
          >
            <CheckCircle className="h-3.5 w-3.5" /> Key Generated
          </Badge>
        </div>
        <CardDescription className="text-gray-400 text-base">
          Your access key has been successfully generated
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-gray-800/80 rounded-xl p-5 border border-gray-700">
          <h3 className="font-medium text-white mb-3 text-lg">
            Your Access Key
          </h3>
          <div className="flex">
            <div className="bg-gray-900 p-4 rounded-l-lg font-mono text-base text-blue-100 flex-grow overflow-x-auto">
              {accessKey}
            </div>
            <Button
              variant="outline"
              className="rounded-l-none border-gray-600 text-gray-300 hover:bg-gray-700 px-4"
              onClick={copyToClipboard}
            >
              {copied ? (
                <CheckCircle className="h-5 w-5 text-green-400" />
              ) : (
                <Copy className="h-5 w-5" />
              )}
            </Button>
          </div>
          {copied && (
            <div className="mt-2 text-sm text-green-400 flex items-center gap-1">
              <CheckCircle className="h-3.5 w-3.5" /> Copied to clipboard
            </div>
          )}
        </div>

        <div className="bg-yellow-950/30 rounded-xl p-5 flex items-start gap-4 border border-yellow-900/50">
          <Clock className="h-7 w-7 text-yellow-400 mt-1" />
          <div>
            <h3 className="font-medium text-yellow-100 mb-2 text-lg">
              Key Expiration
            </h3>
            <p className="text-gray-300 leading-relaxed">
              This access key will expire on{" "}
              <span className="text-white font-medium">
                {expiryTime.toLocaleString()}
              </span>
              .
              <span className="text-yellow-400 ml-2 font-medium">
                {formatTimeRemaining()}
              </span>
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button
            variant="outline"
            className="border-gray-600 text-gray-300 hover:bg-gray-700 flex items-center gap-2 py-6 rounded-lg"
            onClick={downloadKey}
          >
            <Download className="h-5 w-5" />
            Download Key
          </Button>

          <Button
            className="bg-blue-600 hover:bg-blue-500 text-white flex items-center gap-2 py-6 rounded-lg transition-all duration-200 shadow-lg shadow-blue-900/20"
            onClick={generateNewKey}
          >
            <RefreshCw className="h-5 w-5" />
            Generate New Key
          </Button>
        </div>
      </CardContent>
      <CardFooter className="border-t border-gray-700/50 pt-6">
        <div className="w-full bg-gray-900/70 p-4 rounded-lg text-gray-300 flex items-start gap-3">
          <Shield className="h-5 w-5 text-yellow-400 mt-1" />
          <p>
            <span className="text-yellow-400 font-medium">Important:</span> Keep
            this key secure and do not share it with others. If your key is
            compromised, please generate a new one immediately.
          </p>
        </div>
      </CardFooter>
    </Card>
  );
}
