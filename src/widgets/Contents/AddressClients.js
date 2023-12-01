import { ConfirmDialog } from 'primereact/confirmdialog'
import { useEffect } from 'react'
import { Clients } from '../../components/Clients'
import { PageTitle } from '../../components/PageTitle'
import { useHousingStock } from '../../process/useHousingStock'
import { useToast } from '../../process/useToast'
import { Preloader } from '../Preloader'

const AddressClients = ( { address_id } ) => {
	
	const { housingStock, getClients }    = useHousingStock()
	const { showMessage, ToastContainer } = useToast()
	
	const handler = {
		init: () => {
			handler.updateClients()
		},
		updateClients: ( pause = 0 ) => {
			if ( address_id ) {
				setTimeout( () => {
					getClients( { addressId: address_id } )
				}, pause )
			}
		}
	}
	
	useEffect( handler.init, [ address_id ] )
	
	return <div className="clients-wrapper">
		{ ToastContainer }
		<ConfirmDialog/>
		<PageTitle>Жильцы</PageTitle>
		<Preloader enable={ housingStock.fetching }/>
		<Clients enable={ !housingStock.fetching } clients={ housingStock.data || [] } updateHandler={ handler.updateClients } showMessage={ showMessage }/>
	</div>
}
export { AddressClients }
