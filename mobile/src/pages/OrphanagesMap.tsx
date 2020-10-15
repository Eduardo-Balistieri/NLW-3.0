import React from 'react'
import { StyleSheet, View, Dimensions, Text, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps'

import { Feather } from '@expo/vector-icons'
import mapMarker from '../images/map-marker.png'



const OrphanagesMap = () => {

	const navigation = useNavigation()

	const handleNavigationToDetails = () => {
		navigation.navigate('OrphanageDetails')
	}

	return (
		<View style={styles.container}>

			<MapView
				style={styles.map}
				initialRegion={{
					latitude: -27.6393007,
					longitude: -52.2750797,
					latitudeDelta: 0.008,
					longitudeDelta: 0.008
				}}
				provider={PROVIDER_GOOGLE}
			>
				<Marker
					icon={mapMarker}
					coordinate={{
						latitude: -27.6393007,
						longitude: -52.2750797,
					}}
					calloutAnchor={{
						x: 2.7,
						y: 0.9
					}}
				>
					<Callout tooltip onPress={handleNavigationToDetails}>
						<View style={styles.calloutContainer}>
							<Text style={styles.calloutText}>Lar das meninas</Text>
						</View>
					</Callout>
				</Marker>
			</MapView>

			<View style={styles.footer}>
				<Text style={styles.footerText}>2 orfanatos encontrados</Text>

				<TouchableOpacity style={styles.createOrphanageButton} onPress={() => { }}>
					<Feather name='plus' size={20} color='#fff' />
				</TouchableOpacity>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},

	map: {
		width: Dimensions.get('window').width,
		height: Dimensions.get('window').height
	},

	calloutContainer: {
		width: 160,
		height: 46,
		paddingHorizontal: 16,
		backgroundColor: 'rgba(255, 255, 255, 0.8)',
		borderRadius: 16,
		justifyContent: 'center'
	},

	calloutText: {
		color: '#0089a5',
		fontSize: 14,
		fontFamily: 'nunito700'
	},

	footer: {
		position: 'absolute',
		left: 24,
		right: 24,
		bottom: 32,
		backgroundColor: '#fff',
		borderRadius: 20,
		height: 56,
		paddingLeft: 24,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',

		elevation: 3,

		shadowColor: '#666',
		shadowOffset: { width: 0, height: 3 },
		shadowRadius: 3,
		shadowOpacity: 0.3
	},

	footerText: {
		color: '#8fa7b3',
		fontFamily: 'nunito700',
		fontSize: 16
	},

	createOrphanageButton: {
		width: 56,
		height: 56,
		backgroundColor: '#15c3d6',
		borderRadius: 20,

		justifyContent: 'center',
		alignItems: 'center'
	}
})

export default OrphanagesMap