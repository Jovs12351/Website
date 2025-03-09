import { redirect } from "next/navigation";

export default function DiscordCallbackPage() {
  // This page is just a fallback in case the route handler doesn't catch the request
  // It should redirect to the access keys page
  redirect("/access-keys");
}
