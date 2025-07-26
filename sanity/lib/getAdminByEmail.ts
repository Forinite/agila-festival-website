// lib/getAdminByEmail.ts

import {sanityClient} from "@/sanity/lib/client";

export async function getAdminByEmail(email: string) {
    const query = `*[_type == "adminAccount" && email == $email][0]{
    _id,
    name,
    email,
    hashedPassword
  }`;

    return await sanityClient.fetch(query, { email });
}
