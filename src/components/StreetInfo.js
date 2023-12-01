import { filteredStreetsById } from '../addons/helpers'

const StreetInfo = ( { enable, streets, selected } ) => {
	if ( !enable ) {
		return
	}
	
	const { id, city, nameWithPrefix } = filteredStreetsById( { streets, id: selected } )
	
	return (
		<div>
			<p>ID: { id }</p>
			<p>Город: { city }</p>
			<p>Название: { nameWithPrefix }</p>
		</div>
	)
}

export { StreetInfo }
