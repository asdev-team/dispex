import { apiEndpoint, useAPI } from './useAPI'

const useHouses = () => {
	const { houses }         = apiEndpoint
	const { process, fetch } = useAPI()
	
	const privateHandler = {
		get: ( { street_id = 0 } ) => {
			fetch( houses.get( { street_id } ) )
		}
	}
	
	return {
		houses: process,
		getHouses: privateHandler.get
	}
}

export { useHouses }
