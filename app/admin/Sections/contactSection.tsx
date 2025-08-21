'use client';
import React, { useEffect, useState } from 'react';
import ContactCard from '@/app/components/ui/adminUI/contactCard';
import ContactFormModal from '@/app/components/ui/adminUI/contactFormModal';
import AdminContactList from '@/app/components/ui/adminUI/AdminContactList';
import ConfirmDialog from '@/app/components/ui/adminUI/confirmDialog';
import AdminContactFormModal from '@/app/components/ui/adminUI/AdminContactFormModal';
import { useContactInfo } from '@/app/hooks/useContactInfo';
import { Loading } from '@/app/components/ui/loading';
import { toast } from '@/lib/toast';

interface ContactInfo {
    icon: null;
    title: string;
    lines: string[];
}

interface SocialLink {
    href: string;
}

interface Contact {
    _id: string;
    name: string;
    // Add other fields as needed
}

export const ContactSection = () => {
    const [editing, setEditing] = useState(false);
    const [contactToEdit, setContactToEdit] = useState<Contact | null>(null);
    const [contactToDelete, setContactToDelete] = useState<Contact | null>(null);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const { contactInfo, contactSocials, loading, refetch } = useContactInfo();
    const [info, setInfo] = useState<ContactInfo[]>([]);
    const [social, setSocial] = useState<SocialLink[]>([]);

    useEffect(() => {
        if (contactInfo.length && contactSocials.length) {
            const tempInfo: ContactInfo[] = [
                {
                    icon: null,
                    title: 'Location',
                    lines: contactInfo[0]?.location || [],
                },
                {
                    icon: null,
                    title: 'Email',
                    lines: contactInfo[0]?.emails || [],
                },
                {
                    icon: null,
                    title: 'Phone',
                    lines: contactInfo[0]?.phones || [],
                },
            ];

            const tempSocials: SocialLink[] = [
                { href: contactSocials[0]?.facebook || '' },
                { href: contactSocials[0]?.instagram || '' },
                { href: contactSocials[0]?.youtube || '' },
                { href: contactSocials[0]?.twitter || '' },
            ];

            setInfo(tempInfo);
            setSocial(tempSocials);
        }
    }, [contactInfo, contactSocials]);

    const handleUpdate = (updated: { info: ContactInfo[]; social: SocialLink[] }) => {
        setInfo(updated.info);
        setSocial(updated.social);
        setEditing(false);
        refetch();
    };

    const handleAdminEdit = (contact: Contact) => {
        setContactToEdit(contact);
    };

    const handleConfirmDelete = async () => {
        try {
            const res = await fetch('/api/contact/delete', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ _id: contactToDelete?._id }),
            });
            if (!res.ok) {
                toast.error('Failed to delete contact');
                throw new Error('Failed to delete contact');
            }
            toast.success('Contact deleted successfully');
            setConfirmOpen(false);
            setContactToDelete(null);
            refetch();
        } catch (err) {
            console.error('Delete error:', err);
            toast.error('Failed to delete contact');
        }
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="relative">
            <ContactCard
                info={info}
                social={social}
                onEdit={() => setEditing(true)}
            />

            {editing && (
                <ContactFormModal
                    initialData={{
                        id: contactInfo[0]?._id,
                        info,
                        social,
                    }}
                    onClose={() => setEditing(false)}
                    onSubmit={handleUpdate}
                />
            )}

            <div className="mt-10">
                <h2 className="text-2xl font-bold mb-4">Admin Contacts</h2>
                <AdminContactList onEdit={handleAdminEdit} />

                <ConfirmDialog
                    open={confirmOpen}
                    title={`Remove ${contactToDelete?.name || 'Contact'}?`}
                    message="This contact will be permanently deleted."
                    onCancel={() => {
                        setConfirmOpen(false);
                        setContactToDelete(null);
                    }}
                    onConfirm={handleConfirmDelete}
                />

                {contactToEdit && (
                    <AdminContactFormModal
                        initialData={contactToEdit}
                        onClose={() => {
                            console.log(contactToEdit);
                            setContactToEdit(null);
                        }}
                        refetch={refetch}
                    />
                )}
            </div>
        </div>
    );
};