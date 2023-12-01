import { Button } from 'primereact/button'
import { Card } from 'primereact/card'

const ClientCard = ( {
	client = {
		id: 0,
		name: '',
		phone: '',
		email: '',
		bindId: 0
	},
	onDelete
} ) => {
	
	const title = <div className="client">{ client.name }</div>
	
	const subTitle = <div className="client-contact">
		<div className="client-contact-phone">Телефон: <a href={ 'tel:' + client.phone }>{ client.phone }</a></div>
		<div className="client-contact-phone">Email: <a href={ 'mailto:' + client.email }>{ client.email }</a></div>
	</div>
	
	const footer = <div className="client-action">
		<Button label="Удалить" severity="danger" icon="pi pi-user-minus" onClick={ () => onDelete( client.bindId ) }/>
	</div>
	
	return <li className="client-card">
		<Card title={ title } subTitle={ subTitle } footer={ footer }/>
	</li>
}

export { ClientCard }
