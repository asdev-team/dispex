import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { buildNavigatePath } from '../../addons/helpers'
import { AddressAction } from '../../components/AddressAction'
import { AddressInfo } from '../../components/AddressInfo'
import { PageTitle } from '../../components/PageTitle'
import { useHousingStock } from '../../process/useHousingStock'
import { Preloader } from '../Preloader'
import { AddressClients } from './AddressClients'

const Address = () => {
	const { street_id, house_id, address_id } = useParams()
	
	const { housingStock, getHousingStock } = useHousingStock()
	const [ address, setAddress ]           = useState( false )
	
	const handler = {
		init: () => {
			getHousingStock( { street_id, house_id } )
		},
		filterData: () => {
			if ( housingStock.fetched ) {
				const f = housingStock.data.find( d => +d.addressId === +address_id )
				setAddress( f )
			}
		}
	}
	
	useEffect( handler.init, [ street_id ] )
	useEffect( handler.filterData, [ housingStock.fetched, address_id ] )
	
	const isFetched     = housingStock.fetched && address
	const addClientPath = buildNavigatePath( { street_id, house_id, address_id }, 'addClient' )
	
	return <>
		<PageTitle>Жилье</PageTitle>
		<Preloader enable={ housingStock.fetching }/>
		<AddressInfo enable={ isFetched } address={ address }/>
		<AddressAction enable={ isFetched } path={ { addClient: addClientPath } }/>
		<AddressClients address_id={ address_id }/>
	</>
}

export { Address }
