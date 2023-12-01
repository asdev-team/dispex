import { Tree } from 'primereact/tree'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { buildNavigatePath, housesToNodes, housingStockToNodes, nodeKeyToObject, streetsToNodes } from '../../addons/helpers'
import { useHouses } from '../../process/useHouses'
import { useHousingStock } from '../../process/useHousingStock'
import { useStreets } from '../../process/useStreets'
import { Preloader } from '../Preloader'

const TreeMenu = () => {
	const navigate = useNavigate()
	
	const { streets, getStreets }           = useStreets()
	const { houses, getHouses }             = useHouses()
	const { housingStock, getHousingStock } = useHousingStock()
	
	const [ nodes, setNodes ]     = useState( [] )
	const [ loading, setLoading ] = useState( true )
	
	const [ selectionKeys, setSelectionKeys ] = useState( '' )
	const [ nodeSelected, setNodeSelected ]   = useState( {
		street_id: 0,
		house_id: 0,
		address_id: 0
	} )
	const [ nodeExpanded, setNodeExpanded ]   = useState( {
		street_id: { id: 0, fetched: false },
		house_id: { id: 0, fetched: false },
		address_id: { id: 0, fetched: false }
	} )
	
	const handler = {
		onInit: () => {
			handler.fetchEntities( 1 )
		},
		onExpand: e => {
			setNodeExpanded( prev => {
				const { slug, children } = e.node
				const isFetched          = !!children.length
				
				for ( const key in prev ) {
					prev[ key ] = { id: 0, fetched: false }
					if ( slug.hasOwnProperty( key ) ) {
						prev[ key ] = { id: slug[ key ], fetched: isFetched }
					}
				}
				return { ...prev }
			} )
		},
		onSelect: e => {
			setSelectionKeys( e.value )
			setNodeSelected( prev => {
				const meta = nodeKeyToObject( e.value )
				for ( const key in prev ) {
					prev[ key ] = 0
					if ( meta.hasOwnProperty( key ) ) {
						prev[ key ] = meta[ key ]
					}
				}
				return { ...prev }
			} )
		},
		onStreetsFetch: () => {
			if ( streets.fetched ) {
				const nodes = streetsToNodes( { data: streets.data } )
				setNodes( nodes )
				setLoading( false )
			}
		},
		onHousesFetch: () => {
			if ( houses.fetched ) {
				const street_id     = nodeExpanded.street_id.id
				const housesNodes   = housesToNodes( { data: houses.data, street_id } )
				const parentNode    = nodes.find( n => +n.id === +street_id )
				parentNode.children = housesNodes
				setNodes( nodes )
				setLoading( false )
			}
		},
		onHousingStockFetch: () => {
			if ( housingStock.fetched ) {
				const street_id         = nodeExpanded.street_id.id
				const house_id          = nodeExpanded.house_id.id
				const housingStockNodes = housingStockToNodes( { data: housingStock.data, street_id, house_id } )
				
				const streetNode   = nodes.find( n => +n.id === +street_id )
				const houseNode    = streetNode.children.find( n => +n.id === +house_id )
				houseNode.children = housingStockNodes
				
				setNodes( nodes )
				setLoading( false )
			}
		},
		redirectOnSelect: () => {
			const { street_id, house_id, address_id } = nodeSelected
			if ( !street_id && !house_id && !address_id ) {
				return
			}
			navigate( buildNavigatePath( nodeSelected ) )
		},
		fetchOnExpand: () => {
			const { street_id, house_id, address_id } = nodeExpanded
			if ( street_id.id && !street_id.fetched && !house_id.id && !address_id.id ) {
				handler.fetchEntities( 2, { street_id: street_id.id } )
			}
			if ( street_id.id && house_id.id && !house_id.fetched && !address_id.id ) {
				handler.fetchEntities( 3, { street_id: street_id.id, house_id: house_id.id } )
			}
		},
		fetchEntities: ( level = 0, params = {
			street_id: 0,
			house_id: 0,
			address_id: 0
		} ) => {
			setLoading( true )
			switch ( level ) {
				case 1:
					getStreets()
					break
				case 2:
					getHouses( params )
					break
				case 3:
					getHousingStock( params )
					break
				default:
					break
				
			}
		}
	}
	
	useEffect( handler.onInit, [] )
	useEffect( handler.onStreetsFetch, [ streets.fetched ] )
	useEffect( handler.onHousesFetch, [ houses.fetched ] )
	useEffect( handler.onHousingStockFetch, [ housingStock.fetched ] )
	useEffect( handler.redirectOnSelect, [ nodeSelected ] )
	useEffect( handler.fetchOnExpand, [ nodeExpanded ] )
	
	return <aside className="menu block">
		<Tree
			value={ nodes }
			filter filterMode="lenient" filterPlaceholder="Поиск"
			onExpand={ handler.onExpand }
			loading={ loading }
			loadingIcon={ <Preloader enable={ loading }/> }
			selectionMode="single"
			selectionKeys={ selectionKeys }
			onSelectionChange={ handler.onSelect }
		/>
	</aside>
}

export { TreeMenu }
