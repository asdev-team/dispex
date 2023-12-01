import { confirmDialog } from 'primereact/confirmdialog'
import { useEffect } from 'react'
import { useHousingStock } from '../process/useHousingStock'
import { ClientCard } from './ClientCard'

const Clients = ( { enable, clients, updateHandler, showMessage } ) => {
	const { housingStock, deleteClient } = useHousingStock()
	
	const handler = {
		onDelete: ( id ) => {
			confirmDialog( {
				message: 'Вы действительно хотите выселить жильца',
				header: 'Подтвердите удаление',
				icon: 'pi pi-info-circle',
				position: 'top',
				accept: () => handler.onDeleteAccept( id )
			} )
		},
		onDeleteAccept: ( bindId ) => {
			deleteClient( { bindId: bindId } )
		},
		onProcess: () => {
			if ( housingStock.fetched && typeof updateHandler === 'function' ) {
				updateHandler( 0 )
				showMessage( 'Жилец выселен удачно :)', 'success' )
			}
		}
	}
	
	useEffect( handler.onProcess, [ housingStock ] )
	
	if ( !enable ) {
		return
	}
	
	const isEmpty = !clients.length
	
	if ( isEmpty ) {
		return <p>Жильцы еще не добавлены или не заселены</p>
	}
	return <>
		<ul className="clients">
			{ clients.map( client =>
				<ClientCard key={ client.id } client={ client } onDelete={ handler.onDelete }/> ) }
		</ul>
	</>
}
export { Clients }
