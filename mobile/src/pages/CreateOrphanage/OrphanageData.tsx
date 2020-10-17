import React, { useState } from 'react'
import { ScrollView, View, StyleSheet, Switch, Text, TextInput, TouchableOpacity, Alert, Image, KeyboardAvoidingView } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'

import { useNavigation, useRoute } from '@react-navigation/native'
import { Feather } from '@expo/vector-icons'

import * as ImagePicker from 'expo-image-picker'
import api from '../../services/api'


interface OrphanageRouteParams {
	position: {
		latitude: number
		longitude: number
	}
}


const OrphanageData = () => {

	const navigation = useNavigation()

	const route = useRoute()
	const params = route.params as OrphanageRouteParams

	const [name, setName] = useState('')
	const [about, setAbout] = useState('')
	const [instructions, setInstructions] = useState('')
	const [opening_hours, setOpeningHours] = useState('')
	const [open_on_weekends, setOpenOnWeekends] = useState(false)
	const [images, setImages] = useState<string[]>([])


	const handleCreateOrphanage = async () => {
		const { latitude, longitude } = params.position

		const data = new FormData()
		data.append('name', name)
		data.append('latitude', String(latitude))
		data.append('longitude', String(longitude))
		data.append('about', about)
		data.append('instructions', instructions)
		data.append('opening_hours', opening_hours)
		data.append('open_on_weekends', String(open_on_weekends))

		images.forEach((image, index) => {
			data.append('images', {
				type: 'image/jpg',
				uri: image,
				name: `${image}_${index}.jpg`
			} as any)
		})

		await api.post('/orphanages', data)
		navigation.navigate('OrphanagesMap')
	}

	const handleSelectImages = async () => {
		const { status } = await ImagePicker.requestCameraRollPermissionsAsync()

		if (status !== 'granted') {
			Alert.alert('Oops!', 'Pecisamos de acesso a sua galeria de fotos...')
			return
		}

		const result = await ImagePicker.launchImageLibraryAsync({
			allowsEditing: true,
			quality: 1,
			mediaTypes: ImagePicker.MediaTypeOptions.Images
		})

		if (result.cancelled)
			return

		const { uri: image } = result
		setImages([...images, image])
	}


	return (
		<KeyboardAvoidingView behavior='padding' style={{ flex: 1 }}>
			<ScrollView style={styles.container} contentContainerStyle={{ padding: 24 }}>

				<Text style={styles.title}>Dados</Text>

				<Text style={styles.label}>Nome</Text>
				<TextInput
					style={styles.input}
					value={name}
					onChangeText={setName}
				/>

				<Text style={styles.label}>Sobre</Text>
				<TextInput
					style={[styles.input, { height: 110 }]}
					multiline
					value={about}
					onChangeText={setAbout}
				/>

				{/* <Text style={styles.label}>Whatsapp</Text>
				<TextInput style={styles.input} /> */}

				<Text style={styles.label}>Fotos</Text>

				<View style={styles.loadedImagesContainer}>
					{images.map(image => (
						<Image
							key={image}
							style={styles.uploadedImage}
							source={{ uri: image }}
						/>
					))}
				</View>

				<TouchableOpacity style={styles.imagesInput} onPress={handleSelectImages}>
					<Feather name="plus" size={24} color="#15B6D6" />
				</TouchableOpacity>

				<Text style={styles.title}>Visitação</Text>

				<Text style={styles.label}>Instruções</Text>
				<TextInput
					style={[styles.input, { height: 110 }]}
					multiline
					value={instructions}
					onChangeText={setInstructions}
				/>

				<Text style={styles.label}>Horario de visitas</Text>
				<TextInput
					style={styles.input}
					value={opening_hours}
					onChangeText={setOpeningHours}
				/>

				<View style={styles.switchContainer}>
					<Text style={styles.label}>Atende final de semana?</Text>
					<Switch
						thumbColor="#fff"
						trackColor={{ false: '#ccc', true: '#39CC83' }}
						value={open_on_weekends}
						onValueChange={setOpenOnWeekends}
					/>
				</View>

				<RectButton style={styles.nextButton} onPress={handleCreateOrphanage}>
					<Text style={styles.nextButtonText}>Cadastrar</Text>
				</RectButton>

			</ScrollView>
		</KeyboardAvoidingView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},

	title: {
		color: '#5c8599',
		fontSize: 24,
		fontFamily: 'nunito700',
		marginBottom: 32,
		paddingBottom: 24,
		borderBottomWidth: 0.8,
		borderBottomColor: '#D3E2E6'
	},

	label: {
		color: '#8fa7b3',
		fontFamily: 'nunito600',
		marginBottom: 8,
	},

	comment: {
		fontSize: 11,
		color: '#8fa7b3',
	},

	input: {
		backgroundColor: '#fff',
		borderWidth: 1.4,
		borderColor: '#d3e2e6',
		borderRadius: 20,
		height: 56,
		paddingVertical: 18,
		paddingHorizontal: 24,
		marginBottom: 16,
		textAlignVertical: 'top',
	},

	imagesInput: {
		backgroundColor: 'rgba(255, 255, 255, 0.5)',
		borderStyle: 'dashed',
		borderColor: '#96D2F0',
		borderWidth: 1.4,
		borderRadius: 20,
		height: 56,
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: 32,
	},

	switchContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginTop: 16,
	},

	nextButton: {
		backgroundColor: '#15c3d6',
		borderRadius: 20,
		justifyContent: 'center',
		alignItems: 'center',
		height: 56,
		marginTop: 32,
	},

	nextButtonText: {
		fontFamily: 'nunito800',
		fontSize: 16,
		color: '#FFF',
	},

	loadedImagesContainer: {
		flexDirection: 'row'
	},

	uploadedImage: {
		width: 64,
		height: 64,
		borderRadius: 20,
		marginBottom: 32,
		marginRight: 8
	}
})


export default OrphanageData