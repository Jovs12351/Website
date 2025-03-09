import { createClient } from "../../../supabase/server";
import { redirect } from "next/navigation";
import AccessKeyLayout from "@/components/access-key/layout";
import StepOne from "@/components/access-key/step-one";
import StepTwo from "@/components/access-key/step-two";
import StepThree from "@/components/access-key/step-three";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default async function AccessKeysPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in?redirect=/access-keys");
  }

  return (
    <AccessKeyLayout>
      <div className="w-full max-w-4xl mx-auto">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white mb-3">
            Access Key Generation Portal
          </h1>
          <p className="text-gray-400 text-lg">
            Generate temporary access keys to our platform services
          </p>
        </div>

        <Tabs defaultValue="step1" className="w-full">
          <div className="relative mb-10">
            <div className="absolute inset-0 bg-gray-800/30 rounded-2xl"></div>
            <TabsList className="relative z-10 flex w-full h-16 p-1.5 rounded-2xl bg-transparent">
              <TabsTrigger
                value="step1"
                className="flex-1 rounded-xl data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=inactive]:bg-transparent data-[state=inactive]:text-gray-400"
              >
                <div className="flex items-center justify-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-900/60 text-blue-100 text-sm font-medium">
                    1
                  </div>
                  <span className="font-medium">Account Verification</span>
                </div>
              </TabsTrigger>
              <TabsTrigger
                value="step2"
                className="flex-1 rounded-xl data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=inactive]:bg-transparent data-[state=inactive]:text-gray-400"
              >
                <div className="flex items-center justify-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-900/60 text-blue-100 text-sm font-medium">
                    2
                  </div>
                  <span className="font-medium">Key Generation</span>
                </div>
              </TabsTrigger>
              <TabsTrigger
                value="step3"
                className="flex-1 rounded-xl data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=inactive]:bg-transparent data-[state=inactive]:text-gray-400"
              >
                <div className="flex items-center justify-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-900/60 text-blue-100 text-sm font-medium">
                    3
                  </div>
                  <span className="font-medium">Key Delivery</span>
                </div>
              </TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="step1" className="h-full">
            <StepOne user={user} />
          </TabsContent>
          <TabsContent value="step2" className="h-full">
            <StepTwo />
          </TabsContent>
          <TabsContent value="step3" className="h-full">
            <StepThree />
          </TabsContent>
        </Tabs>
      </div>
    </AccessKeyLayout>
  );
}
