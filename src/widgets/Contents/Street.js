import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { PageTitle } from '../../components/PageTitle'
import { StreetInfo } from '../../components/StreetInfo'
import { useStreets } from '../../process/useStreets'
import { Preloader } from '../Preloader'

const Street = () => {
	
	const { street_id }           = useParams()
	const { streets, getStreets } = useStreets()
	
	const handler = {
		init: () => {
			if ( !streets.fetched ) {
				getStreets()
			}
		}
	}
	
	useEffect( handler.init, [] )
	
	return <>
		<PageTitle>Улица</PageTitle>
		<Preloader enable={ streets.fetching }/>
		<StreetInfo enable={ streets.fetched } streets={ streets.data } selected={ street_id }/>
	</>
}

export { Street }
