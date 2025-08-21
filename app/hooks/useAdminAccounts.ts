'use client';
import { useEffect, useState } from 'react';
import { sanityClient } from '@/sanity/lib/client';

interface Admin {
    id: string;
    name: string;
    email: string;
    _id?: string; // Optional, used in delete operations
}

export const useAdminAccounts = () => {
    const [admins, setAdmins] = useState<Admin[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAdmins = async () => {
            try {
                const data = await sanityClient.fetch(
                    `*[_type == "adminAccount"] | order(_createdAt desc)`
                );
                setAdmins(
                    data.map((admin: any) => ({
                        id: admin._id,
                        name: admin.name,
                        email: admin.email,
                        _id: admin._id,
                    }))
                );
            } catch (err) {
                console.error('Error fetching admins:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchAdmins();
    }, []);

    return { admins, loading, setAdmins };
};