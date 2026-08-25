import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/admin-auth";
import { AdminEditor } from "./AdminEditor";

export default async function AdminPage() {
  const store = await cookies();
  if (!verifySessionToken(store.get(SESSION_COOKIE)?.value)) {
    redirect("/admin/login");
  }

  return <AdminEditor />;
}
