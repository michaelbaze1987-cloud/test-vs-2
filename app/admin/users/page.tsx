import { listCustomers } from "@/lib/mock-store";

export const metadata = {
  title: "Admin Clients",
};

export default async function AdminUsersPage() {
  const users = listCustomers();

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-semibold">Clients</h1>
      <div className="card overflow-x-auto">
        <table className="w-full min-w-160 text-sm">
          <thead>
            <tr className="border-b border-slate-200 text-left text-slate-500">
              <th className="px-4 py-3">Nom</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Inscription</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b border-slate-100">
                <td className="px-4 py-3">{user.name ?? "-"}</td>
                <td className="px-4 py-3">{user.email}</td>
                <td className="px-4 py-3">{user.createdAt.toLocaleDateString("fr-FR")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
