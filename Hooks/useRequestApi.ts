import React from 'react';
import axios from 'axios';
import useLocation from './useLocation';
import { WEATHER_OPTIONS } from '../Constants';

interface DataProps {
	location: LocationDataProps;
	condition: ConditionProps;
	temp_c: string;
}

interface LocationDataProps {
	region: string;
	name: string;
}

interface ConditionProps {
	icon: string;
	text: string;
}

const useRequestApi = () => {
	const [city, setCity] = React.useState<string>('');
	const [data, setData] = React.useState<DataProps>();
	const [isLoading, setIsLoading] = React.useState<boolean>(false);
	const [error, setError] = React.useState<string>(null);
	const { latitude, longitude } = useLocation();

	const updateCityValue = (value: string) => {
		setCity(value);
	};

	const fetchData = async () => {
		const exactLocation = buildCoords(latitude, longitude, city);
		const requestOptions = {
			...WEATHER_OPTIONS,
			params: { q: exactLocation },
		};
		setIsLoading(true);

		axios
			.request(requestOptions)
			.then(function (response) {
				if (response.status === 200) {
					setData(response.data);
				} else {
					setError('Error Fetching Location Data');
				}
			})
			.catch(function (error) {
				console.error(error);
			})
			.finally(function () {
				setIsLoading(false);
			});
	};

	React.useEffect(() => {
		fetchData();
	}, [city, latitude, longitude]);

	return { data, isLoading, error, updateCityValue };
};

const buildCoords = (latitude: number, longitude: number, city: string) =>
	city === '' ? `${latitude},${longitude}` : city;

export default useRequestApi;
