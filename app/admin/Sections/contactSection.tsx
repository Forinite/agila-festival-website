'use client';
import React, { useState } from 'react';
import ContactCard from '@/app/components/ui/adminUI/contactCard';
import ContactFormModal from '@/app/components/ui/adminUI/contactFormModal';
import AdminContactList from '@/app/components/ui/adminUI/AdminContactList';
import ConfirmDialog from '@/app/components/ui/adminUI/confirmDialog';
import AdminContactFormModal from '@/app/components/ui/adminUI/AdminContactFormModal';

const defaultContactInfo = {
    email: 'info@agilacarnival.com',
    phone: '+234 803 123 4567',
    instagram: '@agilacarnival',
    twitter: '@agila_festival',
    facebook: 'facebook.com/agilacarnival',
};

export const ContactSection = () => {
    const [contactInfo, setContactInfo] = useState(defaultContactInfo);
    const [editing, setEditing] = useState(false);
    const [adminEditing, setAdminEditing] = useState(false);

    const handleUpdate = (updatedInfo) => {
        setContactInfo(updatedInfo);
        setEditing(false);
    };

    const [contactToEdit, setContactToEdit] = useState(null);
    const [contactToDelete, setContactToDelete] = useState(null);
    const [confirmOpen, setConfirmOpen] = useState(false);


    const handleAdminEdit = (contact) => {
        setContactToEdit(contact);
    };

    const handleAdminDelete = (contact) => {
        setContactToDelete(contact);
        setConfirmOpen(true);
    };

    const handleConfirmDelete = () => {
        // Handle deletion logic here
        setConfirmOpen(false);
        setContactToDelete(null);

    };

    return (
        <div className="relative">
            <ContactCard info={contactInfo} onEdit={() => setEditing(true)} />

            {editing && (
                <ContactFormModal
                    initialData={contactInfo}
                    onClose={() => setEditing(false)}
                    onSubmit={handleUpdate}
                />
            )}

            <div>
                <h2 className="text-2xl font-bold mb-4 text-white">Admin Contacts</h2>
                <AdminContactList onEdit={handleAdminEdit} onDelete={handleAdminDelete} />

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
                        onClose={() => setContactToEdit(null)}
                        onSubmit={(updated) => {
                            console.log('Updated:', updated); // Replace with update logic
                            setContactToEdit(null);
                        }}
                    />
                )}
            </div>
        </div>
    );
};


