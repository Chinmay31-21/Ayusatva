import { toast } from 'sonner';

type ToastType = 'success' | 'error' | 'info' | 'warning';

/**
 * Displays a toast notification using the sonner toast library
 * @param message The message to display in the toast
 * @param type The type of toast (success, error, info, warning)
 * @param duration How long the toast should be visible in milliseconds (default: 5000ms)
 */
export const showToast = (message: string, type: ToastType = 'info', duration: number = 5000) => {
  const toastOptions = {
    duration,
    style: {
      padding: '12px 16px',
      borderRadius: '8px',
      fontSize: '14px',
      fontWeight: 500,
    },
  };

  switch (type) {
    case 'success':
      toast.success(message, toastOptions);
      break;
    case 'error':
      toast.error(message, toastOptions);
      break;
    case 'warning':
      toast.warning(message, toastOptions);
      break;
    case 'info':
    default:
      toast.info(message, toastOptions);
      break;
  }
};
