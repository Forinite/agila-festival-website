
import React, { useState } from 'react';
import ConfirmDialog from '@/app/components/ui/adminUI/confirmDialog';
import InviteAdminFormModal from "@/app/components/ui/adminUI/inviteAdminFormModal";
import AdminList from "@/app/components/ui/adminUI/adminList";

const defaultAdmins = [
    { id: '1', name: 'Fortune Obe', email: 'fort@agila.com' },
    { id: '2', name: 'Jane Doe', email: 'jane@example.com' },
];

export const AdminSection = () => {
    const [admins, setAdmins] = useState(defaultAdmins);
    const [showInviteModal, setShowInviteModal] = useState(false);
    const [adminToRemove, setAdminToRemove] = useState(null);
    const [confirmOpen, setConfirmOpen] = useState(false);

    const handleInvite = (newAdmin) => {
        setAdmins((prev) => [...prev, newAdmin]);
        setShowInviteModal(false);
    };

    const handleDelete = () => {
        setAdmins((prev) => prev.filter((admin) => admin.id !== adminToRemove.id));
        setAdminToRemove(null);
        setConfirmOpen(false);
    };

    return (
        <div className="relative">
            <div className="flex justify-between items-center mb-6">
                <h2 className="md:text-2xl font-bold ">Admin Accounts</h2>
                <button
                    onClick={() => setShowInviteModal(true)}
                    className=" md:text-base text-sm px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                    Invite Admin
                </button>
            </div>

            <AdminList
                admins={admins}
                onDelete={(admin) => {
                    setAdminToRemove(admin);
                    setConfirmOpen(true);
                }}
            />

            <ConfirmDialog
                open={confirmOpen}
                title={`Remove ${adminToRemove?.name}?`}
                message="This will revoke admin privileges."
                onCancel={() => {
                    setConfirmOpen(false);
                    setAdminToRemove(null);
                }}
                onConfirm={handleDelete}
            />

            {showInviteModal && (
                <InviteAdminFormModal
                    onClose={() => setShowInviteModal(false)}
                    onSubmit={handleInvite}
                />
            )}
        </div>
    );
};

export default AdminSection;
