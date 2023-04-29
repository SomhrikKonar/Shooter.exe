import { toast } from "react-toastify";
export const notify = (message: string) => {
  toast(message, {
    position: "top-right",
    autoClose: 2500,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    theme: "dark",
  });
};
