import { auth } from "@/lib/auth";
import Deposits from "./table";
import Form from "./form";

export default async function Dashboard() {
  const session = await auth();
  if (!session?.user) {
    return <div className="card">Please sign in to view the dashboard.</div>;
    }
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-black">Dashboard</h2>
      <Form />
      <Deposits />
    </div>
  );
}
