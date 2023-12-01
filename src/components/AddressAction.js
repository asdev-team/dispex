import { Button } from 'primereact/button'
import { useNavigate } from 'react-router-dom'

const AddressAction = ( { enable, path } ) => {
	const navigate = useNavigate()
	
	if ( !enable ) {
		return
	}
	
	const handler = {
		addClient: () => {
			navigate( path.addClient )
		}
	}
	
	return (
		<div className="actions">
			<Button label="Добавить жильца" icon="pi pi-user-plus" onClick={ handler.addClient }/>
		</div>
	)
}

export { AddressAction }
