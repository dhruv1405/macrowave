// app/tracker/page.jsx
import { auth } from "../../auth"; // NextAuth server-side helper
import { redirect } from "next/navigation";
import TrackerClient from "./TrackerClient"; // import client component

export default async function TrackerPage() {
  const session = await auth(); // ✅ runs only on server

  if (!session) {
    redirect("/login"); // redirect before rendering UI
  }

  // pass session down as prop
  return <TrackerClient user={session.user} />;
}
