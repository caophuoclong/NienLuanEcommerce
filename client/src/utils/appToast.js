import { toast } from "react-toastify";

export function AppToast(message, type) {

    
    return toast(message, {
        type: type,
        position: "top-right",
        autoClose: 500,
        
    });
}