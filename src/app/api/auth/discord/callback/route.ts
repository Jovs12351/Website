import { createClient } from "../../../../../../supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const requestUrl = new URL(request.url);
    const code = requestUrl.searchParams.get("code");

    if (!code) {
      return NextResponse.redirect(
        new URL("/access-keys?error=No+code+provided", requestUrl.origin),
      );
    }

    const supabase = await createClient();

    // Check if user is authenticated
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.redirect(
        new URL("/sign-in?redirect=/access-keys", requestUrl.origin),
      );
    }

    // In a real implementation, you would exchange the code for a Discord token
    // and then use that token to get the user's Discord profile
    // For demo purposes, we'll simulate a successful Discord verification

    // Update the user's profile to mark Discord as verified
    const { error: updateError } = await supabase
      .from("users")
      .update({
        discord_verified: true,
        discord_username: "discord_user", // In a real implementation, this would be the actual Discord username
        updated_at: new Date().toISOString(),
      })
      .eq("id", user.id);

    if (updateError) {
      console.error("Error updating user profile:", updateError);
      return NextResponse.redirect(
        new URL(
          "/access-keys?error=Failed+to+verify+Discord",
          requestUrl.origin,
        ),
      );
    }

    return NextResponse.redirect(
      new URL(
        "/access-keys?success=Discord+account+verified",
        requestUrl.origin,
      ),
    );
  } catch (error) {
    console.error("Error in Discord callback:", error);
    return NextResponse.redirect(
      new URL("/access-keys?error=Discord+verification+failed", request.url),
    );
  }
}
