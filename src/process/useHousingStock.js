import { apiEndpoint, useAPI } from './useAPI'

const useHousingStock = () => {
	const { housing_stock }  = apiEndpoint
	const { process, fetch } = useAPI()
	
	const privateHandler = {
		get: ( { street_id = 0, house_id = 0 } ) => {
			fetch( housing_stock.get( { street_id, house_id } ) )
		},
		getClients: ( { addressId = 0 } ) => {
			fetch( housing_stock.get_clients( { addressId } ) )
		},
		addClient: ( data = { Name: '', Phone: '', Email: '' } ) => {
			fetch( housing_stock.add_client( data ) )
		},
		deleteClient: ( { bindId = 0 } ) => {
			fetch( housing_stock.delete_client( { bindId } ) )
		},
		bindClient: ( data = { AddressId: 0, ClientId: 0 } ) => {
			fetch( housing_stock.bind_client( data ) )
		}
	}
	
	return {
		housingStock: process,
		getHousingStock: privateHandler.get,
		addClient: privateHandler.addClient,
		getClients: privateHandler.getClients,
		deleteClient: privateHandler.deleteClient,
		bindClient: privateHandler.bindClient
	}
}

export { useHousingStock }
