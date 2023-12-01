export const getTreeIconByLevel  = ( level = 0 ) => {
	switch ( level ) {
		case 1:
			return 'pi pi-fw pi-sitemap'
		case 2:
			return 'pi pi-fw pi-building'
		case 3:
			return 'pi pi-fw pi-home'
		default:
			return ''
	}
}
export const buildNavigatePath   = ( { street_id = 0, house_id = 0, address_id = 0 }, action = '' ) => {
	let navigate_path = '/info/'
	
	if ( street_id ) {
		navigate_path += `${ street_id }/`
	}
	if ( house_id ) {
		navigate_path += `${ house_id }/`
	}
	if ( address_id ) {
		navigate_path += `${ address_id }/`
	}
	
	if ( action ) {
		navigate_path += `${ action }/`
	}
	
	return navigate_path
}
export const nodeKeyToObject     = ( value = '' ) => {
	return JSON.parse( value )
}
export const streetsToNodes      = ( { data = [] } ) => {
	return data.map( i => {
		const level = 1
		const slug  = { street_id: i.id, level }
		return {
			level, key: JSON.stringify( slug ), id: i.id, slug, label: `г. ${ i.city }, ${ i.nameWithPrefix }`, icon: getTreeIconByLevel( level ), leaf: false, children: []
		}
	} )
}
export const housesToNodes       = ( { data = [], street_id = 0 } ) => {
	return data
		.map( i => {
			const level = 2
			const slug  = { house_id: i.id, level, street_id }
			return {
				level, key: JSON.stringify( slug ), id: i.id, slug, label: `${ i.name }`, icon: getTreeIconByLevel( level ), leaf: false, children: []
			}
		} )
		.sort( ( a, b ) => a.id - b.id )
}
export const housingStockToNodes = ( { data = [], street_id = 0, house_id = 0 } ) => {
	return data
		.filter( h => +h.houseId === +house_id )
		.map( i => {
			const level = 3
			const slug  = { address_id: i.addressId, level, street_id, house_id }
			return {
				level, key: JSON.stringify( slug ), id: i.id, slug, label: `${ i.flat }`, icon: getTreeIconByLevel( level ), leaf: true
				// children: []
			}
		} )
		.sort( ( a, b ) => a.id - b.id )
}
export const filteredStreetsById = ( { streets = [], id = 0 } ) => {
	const filtered = streets.filter( s => +s.id === +id )
	if ( filtered.length ) {
		return filtered[ 0 ]
	}
	return {}
}
export const filteredHousesById  = ( { houses = [], id = 0 } ) => {
	const filtered = houses.filter( s => +s.id === +id )
	if ( filtered.length ) {
		return filtered[ 0 ]
	}
	return {}
}
export const clearPhone          = ( phone = '' ) => {
	return phone.replace( /[^0-9+]/g, '' )
}
export const clearString         = ( string = '' ) => {
	return string.trim()
}
