import { filteredHousesById } from '../addons/helpers'

const HouseInfo = ( { enable, houses, selected } ) => {
	if ( !enable ) {
		return
	}
	
	const { id, name } = filteredHousesById( { houses, id: selected } )
	return (
		<div>
			<p>ID: { id }</p>
			<p>Номер дома: { name }</p>
		</div>
	)
}

export { HouseInfo }
