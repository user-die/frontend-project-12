import { toast } from 'react-toastify';

const notification = {
  successToast: (message) => toast.success(message),
  errorNotify: (message) => toast.error(message),
};

export default notification;
