import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import {
  ArrowUpRight,
  CheckCircle2,
  Shield,
  Users,
  Zap,
  Key,
  Lock,
} from "lucide-react";
import { createClient } from "../../supabase/server";
import Link from "next/link";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-32">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-gray-900 to-purple-900/20 opacity-70" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl sm:text-6xl font-bold mb-8 tracking-tight">
              Access Key{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                Generation
              </span>{" "}
              Portal
            </h1>

            <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
              Generate secure, temporary access keys for our platform services
              with our step-by-step verification process.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/access-keys"
                className="inline-flex items-center px-8 py-4 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors text-lg font-medium"
              >
                Generate Access Keys
                <ArrowUpRight className="ml-2 w-5 h-5" />
              </Link>

              <Link
                href="/dashboard"
                className="inline-flex items-center px-8 py-4 text-gray-300 bg-gray-800 border border-gray-700 rounded-lg hover:bg-gray-700 transition-colors text-lg font-medium"
              >
                Dashboard
              </Link>
            </div>

            <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                <span>Secure verification</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                <span>Temporary access keys</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                <span>Multiple key types</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Key Generation Features</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Our access key generation system provides multiple options with
              enterprise-grade security.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Key className="w-6 h-6" />,
                title: "Multiple Key Types",
                description:
                  "Choose between LootDest and LootLabs key types based on your needs",
              },
              {
                icon: <Shield className="w-6 h-6" />,
                title: "Enterprise Security",
                description: "Bank-grade encryption for all generated keys",
              },
              {
                icon: <Lock className="w-6 h-6" />,
                title: "Secure Verification",
                description:
                  "Multi-step verification process ensures only authorized access",
              },
              {
                icon: <Zap className="w-6 h-6" />,
                title: "Instant Generation",
                description: "Keys are generated instantly after verification",
              },
              {
                icon: <Users className="w-6 h-6" />,
                title: "Team Integration",
                description:
                  "Optional Discord integration for team verification",
              },
              {
                icon: <CheckCircle2 className="w-6 h-6" />,
                title: "System Status",
                description:
                  "Real-time system status monitoring and notifications",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="p-6 bg-gray-700 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-600"
              >
                <div className="text-blue-400 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-blue-900 text-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">10K+</div>
              <div className="text-blue-200">Keys Generated</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">99.9%</div>
              <div className="text-blue-200">System Uptime</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-blue-200">Support Available</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Generate Keys?</h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Get started with our secure key generation process in just a few
            steps.
          </p>
          <Link
            href="/access-keys"
            className="inline-flex items-center px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Generate Access Keys
            <ArrowUpRight className="ml-2 w-4 h-4" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
