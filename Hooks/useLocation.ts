import React, { useEffect } from 'react';
import * as Location from 'expo-location';

interface LocationProps {
	latitude: number;
	longitude: number;
}

const useLocation = () => {
	const [location, setLocation] = React.useState<LocationProps>();

	const fetchLocation = async () => {
		try {
			const { granted } = await Location.requestForegroundPermissionsAsync();
			if (!granted) return;
			const {
				coords: { latitude, longitude },
			} = await Location.getLastKnownPositionAsync();
			setLocation({ latitude, longitude });
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchLocation();
	}, []);

	return { ...location };
};

export default useLocation;
