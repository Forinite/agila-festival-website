import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { redirect } from "next/navigation";
import { defaultAdmins } from "@/app/constants/defaults";
import AdminLayout from "@/app/admin/dashboard/main/main";

export default async function AdminPage() {
    const session = await getServerSession(authOptions);

    const isAdmin =
        session?.user?.email &&
        defaultAdmins.some(
            (admin) =>
                admin.email.toLowerCase() === session.user.email?.toLowerCase()
        );

    if (!isAdmin) redirect("/signin");

    return (
        <div>
            <AdminLayout />
        </div>
    )
}
