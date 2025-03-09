import { createClient } from "../../../../../supabase/server";
import { NextRequest, NextResponse } from "next/server";

// This would be your Discord OAuth application credentials
const DISCORD_CLIENT_ID =
  process.env.DISCORD_CLIENT_ID || "your-discord-client-id";
const DISCORD_REDIRECT_URI =
  process.env.DISCORD_REDIRECT_URI ||
  "https://your-domain.com/api/auth/discord/callback";

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();

    // Check if user is authenticated
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.redirect(
        new URL("/sign-in?redirect=/access-keys", request.url),
      );
    }

    // Redirect to Discord OAuth authorization URL
    const discordAuthUrl = `https://discord.com/api/oauth2/authorize?client_id=${DISCORD_CLIENT_ID}&redirect_uri=${encodeURIComponent(DISCORD_REDIRECT_URI)}&response_type=code&scope=identify%20email`;

    return NextResponse.redirect(discordAuthUrl);
  } catch (error) {
    console.error("Error initiating Discord auth:", error);
    return NextResponse.redirect(
      new URL(
        "/access-keys?error=Failed+to+initiate+Discord+auth",
        request.url,
      ),
    );
  }
}
