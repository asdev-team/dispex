import { apiEndpoint, useAPI } from './useAPI'

const useStreets = () => {
	const { streets }        = apiEndpoint
	const { process, fetch } = useAPI()
	
	const privateHandler = {
		get: () => {
			fetch( streets.get() )
		}
	}
	
	return {
		streets: process,
		getStreets: privateHandler.get
	}
}

export { useStreets }
