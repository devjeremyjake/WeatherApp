import React from 'react';
import * as Location from 'expo-location';

const useLocation = () => {
	const [location, setLocation] = React.useState();

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

	React.useEffect(() => {
		fetchLocation();
	}, []);

	return { location };
};

export default useLocation;
