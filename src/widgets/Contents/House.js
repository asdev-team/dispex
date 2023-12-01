import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { HouseInfo } from '../../components/HouseInfo'
import { PageTitle } from '../../components/PageTitle'
import { useHouses } from '../../process/useHouses'
import { Preloader } from '../Preloader'

const House = () => {
	const { street_id, house_id } = useParams()
	const { houses, getHouses }   = useHouses()
	
	const handler = {
		init: () => {
			getHouses( { street_id } )
		}
	}
	
	useEffect( handler.init, [ street_id ] )
	
	return <>
		<PageTitle>Дом</PageTitle>
		<Preloader enable={ houses.fetching }/>
		<HouseInfo enable={ houses.fetched } houses={ houses.data } selected={ house_id }/>
	</>
}

export { House }
