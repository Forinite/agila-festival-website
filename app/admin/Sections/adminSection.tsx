import React, { useState } from 'react';
import ConfirmDialog from '@/app/components/ui/adminUI/confirmDialog';
import InviteAdminFormModal from '@/app/components/ui/adminUI/inviteAdminFormModal';
import AdminList from '@/app/components/ui/adminUI/adminList';
import { useAdminAccounts } from '@/app/hooks/useAdminAccounts';
import {Loading} from "@/app/components/ui/loading";
import {toast} from "@/lib/toast";

export const AdminSection = () => {
    const { admins, loading, setAdmins } = useAdminAccounts();
    const [showInviteModal, setShowInviteModal] = useState(false);
    const [adminToRemove, setAdminToRemove] = useState(null);
    const [confirmOpen, setConfirmOpen] = useState(false);


    const handleInvite = async (newAdmin) => {
        try {

            setAdmins((prev) => [newAdmin, ...prev]);
            toast.success('Admin added successfully. Please refresh.');
        } catch (err) {
            console.error('Invite error:', err);
            toast.error('Failed to invite admin')

        }
        setShowInviteModal(false);
    };

    const handleDelete = async () => {
        try {
            const res = await fetch('/api/admin-account/delete', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ _id: adminToRemove._id }),
            });
            if (!res.ok) {
                toast.error('Failed to delete admin')
                throw new Error('Failed to delete admin');
            }
            setAdmins((prev) => prev.filter((admin) => admin._id !== adminToRemove._id));
            toast.success('Admin deleted successfully')
        } catch (err) {
            toast.error('Failed to delete admin')
            console.error('Delete error:', err);
        }
        setConfirmOpen(false);
        setAdminToRemove(null);
    };

    if (loading) return <Loading />

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

            {!loading && (
                <AdminList
                    admins={admins}
                    onDelete={(admin) => {
                        setAdminToRemove(admin);
                        setConfirmOpen(true);
                    }}
                />
            )}

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

