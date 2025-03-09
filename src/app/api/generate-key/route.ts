import { createClient } from "../../../../supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();

    // Check if user is authenticated
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get request body
    const { keyType } = await request.json();

    if (!keyType || (keyType !== "lootdest" && keyType !== "lootlabs")) {
      return NextResponse.json({ error: "Invalid key type" }, { status: 400 });
    }

    // Generate a random key
    const keyValue = generateRandomKey(32);

    // Set expiration time based on key type
    const expiresAt = new Date();
    if (keyType === "lootdest") {
      // 24 hours for lootdest keys
      expiresAt.setHours(expiresAt.getHours() + 24);
    } else {
      // 7 days for lootlabs keys
      expiresAt.setDate(expiresAt.getDate() + 7);
    }

    // Store the key in the database
    const { data, error } = await supabase
      .from("access_keys")
      .insert({
        user_id: user.id,
        key_value: keyValue,
        key_type: keyType,
        expires_at: expiresAt.toISOString(),
      })
      .select();

    if (error) {
      console.error("Error storing key:", error);
      return NextResponse.json(
        { error: "Failed to generate key" },
        { status: 500 },
      );
    }

    return NextResponse.json({
      key: keyValue,
      expiresAt: expiresAt.toISOString(),
      keyType,
    });
  } catch (error) {
    console.error("Error generating key:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

function generateRandomKey(length: number): string {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}
