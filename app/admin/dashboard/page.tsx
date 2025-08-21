import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import AdminLayout from "@/app/admin/dashboard/main/main";
import { sanityWriteClient } from "@/sanity/lib/sanityClient";
import {authOptions} from "@/lib/auth";

export default async function AdminPage() {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
        return redirect("/signin");
    }

    // Check if user exists in adminAccount schema
    const isSanityAdmin = await sanityWriteClient.fetch(
        `count(*[_type == "adminAccount" && email == $email]) > 0`,
        { email: session.user.email }
    );

    if (!isSanityAdmin) {
        return redirect("/signin");
    }

    return (
        <div>
            <AdminLayout />
        </div>
    );
}
