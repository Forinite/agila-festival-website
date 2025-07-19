'use client';
import React, {useEffect, useState} from 'react';
import ContactCard from '@/app/components/ui/adminUI/contactCard';
import ContactFormModal from '@/app/components/ui/adminUI/contactFormModal';
import AdminContactList from '@/app/components/ui/adminUI/AdminContactList';
import ConfirmDialog from '@/app/components/ui/adminUI/confirmDialog';
import AdminContactFormModal from '@/app/components/ui/adminUI/AdminContactFormModal';
// import { contactItems, socialLinks } from "@/app/constants/contacts";
import {useContactInfo} from "@/app/hooks/useContactInfo";
import {Loading} from "@/app/components/ui/loading";
import { Facebook, Instagram, Youtube, Twitter } from 'lucide-react';


export const ContactSection = () => {

    const [editing, setEditing] = useState(false);

    const [contactToEdit, setContactToEdit] = useState(null);
    const [contactToDelete, setContactToDelete] = useState(null);
    const [confirmOpen, setConfirmOpen] = useState(false);

    const { contactInfo, contactSocials, loading, refetch } = useContactInfo();
    const [info, setInfo] = useState([]);
    const [social, setSocial] = useState([]);

    // useEffect(()=> {
    //
    //     // console.log(contactItems.slice(1))
    //
    // }, [contactInfo, contactSocials])

    useEffect(() => {
        if (contactInfo.length && contactSocials.length) {
            const tempInfo = [
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

            const tempSocials = [
                { icon: <Facebook className="w-6 h-6 text-white" /> , bgColor: 'bg-blue-600', href: contactSocials[0]?.facebook || '' },
                { icon: <Instagram className="w-6 h-6 text-white" /> , bgColor: 'bg-pink-600', href: contactSocials[0]?.instagram || '' },
                { icon: <Youtube className="w-6 h-6 text-white" /> , bgColor: 'bg-red-600', href: contactSocials[0]?.youtube || '' },
                { icon: <Twitter className="w-6 h-6 text-white" /> , bgColor: 'bg-blue-400', href: contactSocials[0]?.twitter || '' },
            ];


            setInfo(tempInfo);
            setSocial(tempSocials);
        }
    }, [contactInfo, contactSocials]);


    const handleUpdate = (updated) => {
        setInfo(updated.info);
        setSocial(updated.social);
        setEditing(false);
    };

    const handleAdminEdit = (contact) => {
        setContactToEdit(contact);
    };

    const handleAdminDelete = (contact) => {
        setContactToDelete(contact);
        setConfirmOpen(true);
    };

    const handleConfirmDelete = () => {
        // Add deletion logic here
        setConfirmOpen(false);
        setContactToDelete(null);
    };

    if (loading){
        return <Loading />
    }

    return (
        <div className="relative">
            {/* Main Contact Card */}
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

            {/* Admin Contact Management */}
            <div className="mt-10">
                <h2 className="text-2xl font-bold mb-4">Admin Contacts</h2>
                <AdminContactList
                    onEdit={handleAdminEdit}
                    onDelete={handleAdminDelete}
                />

                <ConfirmDialog
                    open={confirmOpen}
                    title={`Remove ${contactToDelete?.name}?`}
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
                            console.log(contactToEdit)
                            setContactToEdit(null)
                        }}

                    />
                )}
            </div>
        </div>
    );
};
