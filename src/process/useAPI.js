import axios from 'axios'
import { useState } from 'react'

export const initState = {
	fetching: false,
	fetched: false,
	data: null,
	error: false,
	errorData: null
}
const apiBase          = () => {
	return 'https://dispex.org/api/vtest'
}

export const apiEndpoint = {
	streets: {
		get: () => {
			return {
				method: 'GET',
				path: '/Request/streets',
				data: null
			}
		}
	},
	houses: {
		get: ( { street_id = 0 } ) => {
			return {
				method: 'GET',
				path: `/Request/houses/${ street_id }`,
				data: null
			}
		}
	},
	housing_stock: {
		get: ( { street_id = 0, house_id = 0 } ) => {
			return {
				method: 'GET',
				path: `/HousingStock?streetId=${ street_id }&houseId=${ house_id }`,
				data: null
			}
		},
		get_clients: ( { addressId = 0 } ) => {
			return {
				method: 'GET',
				path: `/HousingStock/clients?addressId=${ addressId }`,
				data: null
			}
		},
		add_client: ( data = { Name: '', Phone: '', Email: '' } ) => {
			return {
				method: 'POST',
				path: '/HousingStock/client',
				data
			}
		},
		delete_client: ( { bindId = 0 } ) => {
			return {
				method: 'DELETE',
				path: `/HousingStock/bind_client/${ bindId }`,
				data: null
			}
		},
		bind_client: ( data = { AddressId: 0, ClientId: 0 } ) => {
			return {
				method: 'PUT',
				path: '/HousingStock/bind_client',
				data
			}
		}
	}
}

const API = async ( method, path, data ) => {
	return new Promise( ( resolve, reject ) => {
		axios
			.create( {
				method: method,
				responseType: 'json',
				baseURL: apiBase() + path
			} )
			.request( {
				data: data
			} )
			.then( res => {
				if ( res.status === 200 ) {
					resolve( res.data )
				}
				else {
					reject( res.data )
				}
			} )
			.catch( err => {
				reject( err?.response?.data || err )
			} )
	} )
}

const useAPI = () => {
	const [ process, setProcess ] = useState( () => initState )
	return {
		process,
		fetch: ( { method, path, data } ) => {
			if ( !process.fetching ) {
				setProcess( { ...initState, fetching: true } )
				API( method, path, data ).then( responseData => {
					setProcess( { ...initState, fetched: true, data: responseData } )
				} ).catch( errorData => {
					setProcess( { ...initState, error: true, errorData: errorData } )
				} )
			}
		}
	}
}

export { useAPI }
