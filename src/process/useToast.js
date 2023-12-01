import { Toast } from 'primereact/toast'
import { useRef } from 'react'

const useToast = () => {
	const toast = useRef( null )
	
	const showMessage = ( message = '', type = 'success' || 'error' ) => {
		let title = ''
		switch ( type ) {
			case 'success':
				title = 'Готово!'
				break
			case 'error':
				title = 'Ошибка'
				break
			default:
				title = 'Инфо'
		}
		toast.current.show( { severity: type, summary: title, detail: message } )
	}
	
	return {
		showMessage,
		ToastContainer: <><Toast ref={ toast }/></>
	}
}

export { useToast }
