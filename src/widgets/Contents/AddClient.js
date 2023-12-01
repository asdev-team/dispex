import { Button } from 'primereact/button'
import { InputMask } from 'primereact/inputmask'
import { InputText } from 'primereact/inputtext'
import { classNames } from 'primereact/utils'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { buildNavigatePath, clearPhone } from '../../addons/helpers'
import { PageTitle } from '../../components/PageTitle'
import { useHousingStock } from '../../process/useHousingStock'
import { useToast } from '../../process/useToast'
import { Preloader } from '../Preloader'

const FormPreloader = ( { enable } ) => {
	if ( !enable ) {
		return
	}
	return <div className="form-preloader"><Preloader enable={ enable }/></div>
}
const AddClient     = () => {
	const defaultStage  = {
		submit: {
			status: false,
			value: null,
			error: null
		},
		add: {
			status: false,
			value: null,
			error: null
		},
		bind: {
			status: false,
			value: null,
			error: null
		}
	}
	const defaultValues = {
		Name: '', Phone: '', Email: ''
	}
	const requiredRules = {
		Name: {
			required: 'Имя жильца обязательно для заполнения',
			minLength: {
				value: 3,
				message: 'Имя жильца не должно быть менее 3 символом'
			},
			pattern: {
				value: /^[а-яА-ЯёЁ\s-]+$/,
				message: 'Необходимо использовать русскую раскладку'
			}
		},
		Phone: {
			required: 'Номер телефона жильца обязательно для заполнения',
			pattern: {
				value: /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/,
				message: 'Не верный формат номера телефона'
			}
		},
		Email: {
			required: 'Email жильца обязательно для заполнения',
			pattern: {
				value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
				message: 'Не верный формат Email'
			}
		}
	}
	const labelText     = {
		Name: 'Имя жильца', Phone: 'Номер телефона жильца', Email: 'Email жильца'
	}
	const stageMessage  = {
		addCompleted: 'Жилец успешно добавлен. Идет перенаправление...',
		addError: 'Ошибка добавления жильца. Что-то пошло не так.'
	}
	
	const { showMessage, ToastContainer } = useToast()
	
	const { street_id, house_id, address_id }     = useParams()
	const { housingStock, addClient, bindClient } = useHousingStock()
	const [ stage, setStage ]                     = useState( defaultStage )
	const navigate                                = useNavigate()
	
	const {
		      control, formState: { errors }, handleSubmit, getValues, reset
	      } = useForm( { defaultValues } )
	
	const handler = {
		goBack: () => {
			navigate( buildNavigatePath( { street_id, house_id, address_id } ) )
		},
		onSubmit: data => {
			setStage( () => {
				return {
					...defaultStage,
					submit: {
						status: true,
						value: {
							...data,
							Phone: clearPhone( data.Phone )
						}
					}
				}
			} )
		},
		getFormErrorMessage: ( name ) => {
			return errors[ name ]
			       ? <small className="p-error">{ errors[ name ].message }</small>
			       : ''
		},
		showMessage: ( message = '', type = 'success' || 'error' ) => {
			showMessage( message, type )
		},
		onStageChange: () => {
			const isSubmitOK  = !stage.submit.error && stage.submit.status
			const isSubmitBad = stage.submit.error && stage.submit.status
			
			const isAddOK  = !stage.add.error && stage.add.status
			const isAddBad = stage.add.error && stage.add.status
			
			const isBindOK  = !stage.bind.error && stage.bind.status
			const isBindBad = stage.bind.error && stage.bind.status
			
			if ( isSubmitOK ) {
				addClient( stage.submit.value )
			}
			if ( isAddOK ) {
				bindClient( stage.add.value )
			}
			if ( isBindOK ) {
				handler.showMessage( stageMessage.addCompleted, 'success' )
				reset()
				setTimeout( handler.goBack, 3000 )
			}
			
			if ( isBindBad ) {
				handler.showMessage( stageMessage.addError, 'error' )
			}
		},
		onProcess: () => {
			const isAdd       = housingStock.fetched && stage.submit.status
			const isAddError  = housingStock.error && stage.submit.status
			const isBind      = housingStock.fetched && stage.add.status
			const isBindError = housingStock.error && stage.add.status
			
			if ( isAdd || isAddError ) {
				setStage( () => {
					return {
						...defaultStage,
						add: {
							status: true,
							value: { ClientId: +housingStock.data.id, AddressId: +address_id },
							error: housingStock.errorData
						}
					}
				} )
			}
			if ( isBind || isBindError ) {
				setStage( () => {
					return {
						...defaultStage,
						bind: {
							status: true,
							value: isBind,
							error: housingStock.errorData
						}
					}
				} )
			}
		}
	}
	
	useEffect( handler.onStageChange, [ stage ] )
	useEffect( handler.onProcess, [ housingStock ] )
	
	return <>
		<PageTitle>Добавить жильца</PageTitle>
		<div className="card flex">
			{ ToastContainer }
			<form onSubmit={ handleSubmit( handler.onSubmit ) } className="flex flex-column form-add-client">
				<Controller
					name="Name"
					control={ control }
					rules={ requiredRules.Name }
					render={ ( { field, fieldState } ) => ( <>
						<label htmlFor={ field.name } className={ classNames( { 'p-error': errors.value } ) }></label>
						<span className="p-float-label">
                                <InputText id={ field.name } value={ field.value } className={ classNames( { 'p-invalid': fieldState.error } ) } onChange={ ( e ) => field.onChange( e.target.value ) }/>
                                <label htmlFor={ field.name }>{ labelText[ field.name ] }</label>
                            </span>
						{ handler.getFormErrorMessage( field.name ) }
					</> ) }
				/>
				<Controller
					name="Email"
					control={ control }
					rules={ requiredRules.Email }
					render={ ( { field, fieldState } ) => ( <>
						<label htmlFor={ field.name } className={ classNames( { 'p-error': errors.value } ) }></label>
						<span className="p-float-label">
                                <InputText id={ field.name } value={ field.value } type="email" className={ classNames( { 'p-invalid': fieldState.error } ) } onChange={ ( e ) => field.onChange( e.target.value ) }/>
                                <label htmlFor={ field.name }>{ labelText[ field.name ] }</label>
                            </span>
						{ handler.getFormErrorMessage( field.name ) }
					</> ) }
				/>
				<Controller
					name="Phone"
					control={ control }
					rules={ requiredRules.Phone }
					render={ ( { field, fieldState } ) => ( <>
						<label htmlFor={ field.name } className={ classNames( { 'p-error': errors.value } ) }></label>
						<span className="p-float-label">
								<InputMask
									id={ field.name }
									value={ field.value }
									className={ classNames( { 'p-invalid': fieldState.error } ) }
									onChange={ ( e ) => field.onChange( e.target.value ) }
									mask="+7 (999) 999-99-99" placeholder="+7 (999) 999-99-99"></InputMask>
                                <label htmlFor={ field.name }>{ labelText[ field.name ] }</label>
                            </span>
						{ handler.getFormErrorMessage( field.name ) }
					</> ) }
				/>
				<Button label="Добавить" type="submit" icon="pi pi-plus"/>
				<FormPreloader enable={ housingStock.fetching }/>
			</form>
		</div>
	</>
}

export { AddClient }
