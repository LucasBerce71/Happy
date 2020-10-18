import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import '../styles/components/toastr.css';
toast.configure();

export function showToastr(message: any, className: string, position: any) {
  return toast.error(message, {
          className: className,
          position: position,
        });
}