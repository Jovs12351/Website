import { createClient } from "../../../../supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();

    // Check if user is authenticated
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get user's keys
    const { data, error } = await supabase
      .from("access_keys")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching keys:", error);
      return NextResponse.json(
        { error: "Failed to fetch keys" },
        { status: 500 },
      );
    }

    return NextResponse.json({ keys: data });
  } catch (error) {
    console.error("Error fetching keys:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
