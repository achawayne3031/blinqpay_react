

import { toast } from 'react-toastify'

export function NotifyAlert(msg: any, type: string) {

    if(type === 'error'){
        toast.error(`${msg}`, {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            
          })
    }

    if(type === 'success'){
        toast.success(`${msg}`, {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          })
    }

 
}



