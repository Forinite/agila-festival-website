// app/hooks/useAdminAccounts.ts
import { useEffect, useState } from 'react';
import { sanityClient } from '@/sanity/lib/client';

export const useAdminAccounts = () => {
    const [admins, setAdmins] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAdmins = async () => {
            const data = await sanityClient.fetch(
                `*[_type == "adminAccount"] | order(_createdAt desc)`
            );
            setAdmins(data);
            setLoading(false);
        };

        fetchAdmins();
    }, []);

    return { admins, loading, setAdmins };
};
