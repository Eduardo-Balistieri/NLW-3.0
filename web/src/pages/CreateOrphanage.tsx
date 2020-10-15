import React, { ChangeEvent, FormEvent, useState } from 'react'
import { Map, Marker, TileLayer } from 'react-leaflet'
import { LeafletMouseEvent } from 'leaflet'
import { useHistory } from 'react-router-dom'

import { FiPlus } from 'react-icons/fi'

import styles from '../styles/pages/createOrphanage.module.css'
import Sidebar from '../components/Sidebar'

import { mapIcon } from '../utils/mapIcon'
import api from '../services/api'


const CreateOrphanage = () => {

	const history = useHistory()

	const [position, setPosition] = useState({ latitude: 0, longitude: 0 })

	const [name, setName] = useState('')
	const [about, setAbout] = useState('')
	const [instructions, setInstructions] = useState('')
	const [opening_hours, setOpeningHours] = useState('')
	const [open_on_weekends, setOpenOnWeekends] = useState(true)

	const [images, setImages] = useState<File[]>([])
	const [previewImages, setPreviewImages] = useState<string[]>([])


	const handleMapClick = (event: LeafletMouseEvent) => {
		const { lat, lng } = event.latlng

		setPosition({
			latitude: lat,
			longitude: lng
		})
	}

	const handleSubmit = async (event: FormEvent) => {
		event.preventDefault()

		const { latitude, longitude } = position

		const data = new FormData()

		data.append('name', name)
		data.append('about', about)
		data.append('instructions', instructions)
		data.append('latitude', String(latitude))
		data.append('longitude', String(longitude))
		data.append('opening_hours', opening_hours)
		data.append('open_on_weekends', String(open_on_weekends))
		
		
		images.forEach(image => {
			data.append('images', image)
		})

		await api.post('/orphanages', data)

		alert('Cadastro realizado com sucesso!')
		history.push('/app')
	}

	const handleSelectImages = (event: ChangeEvent<HTMLInputElement>) => {
		if (!event.target.files)
			return

		const inputImages = Array.from(event.target.files)
		const inputImagesPreview = inputImages.map(image => URL.createObjectURL(image))

		setPreviewImages(inputImagesPreview)
		setImages(inputImages)
	}


	return (
		<div id={styles.pageCreateOrphanage}>
			<Sidebar />

			<main>
				<form className={styles.createOrphanageForm} onSubmit={handleSubmit}>
					<fieldset>
						<legend>Dados</legend>

						<Map
							center={[-27.6393007, -52.2750797]}
							style={{ width: '100%', height: 280 }}
							zoom={15}
							className={styles.map}
							onClick={handleMapClick}
						>
							<TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`} />

							{position.latitude !== 0 && (
								<Marker
									interactive={false}
									icon={mapIcon}
									position={[position.latitude, position.longitude]}
								/>
							)}
						</Map>

						<div className={styles.inputBlock}>
							<label htmlFor='name'>Nome</label>
							<input
								id='name'
								value={name}
								onChange={event => setName(event.target.value)}
							/>
						</div>

						<div className={styles.inputBlock}>
							<label htmlFor='about'>Sobre <span>Máximo de 300 caracteres</span></label>
							<textarea
								id='name'
								maxLength={300}
								value={about}
								onChange={event => setAbout(event.target.value)}
							/>
						</div>

						<div className={styles.inputBlock}>
							<label htmlFor='images'>Fotos</label>

							<div className={styles.imagesContainer}>

								{previewImages.map(image => <img src={image} alt={name} key={image} />)}

								<label htmlFor='image[]' className={styles.newImage}>
									<FiPlus size={24} color='#15b6d6' />
								</label>
							</div>

							<input multiple onChange={handleSelectImages} type='file' id='image[]' />
						</div>
					</fieldset>

					<fieldset>
						<legend>Visitação</legend>

						<div className={styles.inputBlock}>
							<label htmlFor='instructions'>Instruções</label>
							<textarea
								id='instructions'
								value={instructions}
								onChange={event => setInstructions(event.target.value)}
							/>
						</div>

						<div className={styles.inputBlock}>
							<label htmlFor='opening_hours'>Horário de funcionamento</label>
							<input
								id='opening_hours'
								value={opening_hours}
								onChange={event => setOpeningHours(event.target.value)}
							/>
						</div>

						<div className={styles.inputBlock}>
							<label htmlFor='open_on_weekends'>Atende fim de semana</label>

							<div className={styles.buttonSelect}>
								<button
									type='button'
									className={open_on_weekends ? styles.active : ''}
									onClick={() => setOpenOnWeekends(true)}
								>
									Sim
								</button>

								<button
									type='button'
									className={!open_on_weekends ? styles.active : ''}
									onClick={() => setOpenOnWeekends(false)}
								>
									Não
								</button>
							</div>
						</div>
					</fieldset>

					<button className={styles.confirmButton} type='submit'>
						Confirmar
          			</button>
				</form>
			</main>
		</div>
	);
}

export default CreateOrphanage
