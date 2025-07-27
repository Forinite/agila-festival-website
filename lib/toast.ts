//remember libs also exist under the sanity folder
// lib/toast.ts

type ToastController = {
    show: (msg: string, type: 'success' | 'error') => void;
};

let toastController: ToastController | null = null;

export const toast = {
    success: (msg: string) => toastController?.show(msg, 'success'),
    error: (msg: string) => toastController?.show(msg, 'error'),
};

export const registerToast = (controller: ToastController) => {
    toastController = controller;
};
