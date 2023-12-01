const AddressInfo = ( { enable, address } ) => {
	if ( !enable ) {
		return
	}
	
	const { addressId, streetName, building, corpus, flat, clients } = address
	
	return (
		<div>
			<p>ID: { addressId }</p>
			<p>Улица: { streetName }</p>
			<p>Здание №: { building }</p>
			{ corpus && <p>Корпус №: { corpus }</p> }
			<p>Квартира №: { flat }</p>
			{/*<p>Жильцов: { clients.length }</p>*/ }
		</div>
	)
}

export { AddressInfo }
