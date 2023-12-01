import { Route, Routes } from 'react-router-dom'
import { AddClient } from './AddClient'
import { Address } from './Address'
import { Empty } from './Empty'
import { House } from './House'
import { Street } from './Street'

const Content = () => {
	return <div className="content block">
		<Routes>
			<Route path="/" element={ <Empty/> }/>
			<Route path="/info/:street_id" element={ <Street/> }/>
			<Route path="/info/:street_id/:house_id" element={ <House/> }/>
			<Route path="/info/:street_id/:house_id/:address_id" element={ <Address/> }/>
			<Route path="/info/:street_id/:house_id/:address_id/addClient" element={ <AddClient/> }/>
		</Routes>
	</div>
}

export { Content }
