import React from 'react';
import axios from 'axios';
import useLocation from '../Hooks/useLocation';

const useRequestApi = () => {
	// current states
	const [city, setCity] = React.useState('');
	const [data, setData] = React.useState([]);
	const [isLoading, setIsLoading] = React.useState(false);
	const [error, setError] = React.useState(null);
	// location hook
	const { location } = useLocation();

	const updateCityValue = (value) => {
		setCity(value);
	};

	const fetchData = async () => {
		const paramVaue =
			city === '' ? `${location?.latitude},${location?.longitude}` : city;
		const options = {
			method: 'GET',
			url: 'https://weatherapi-com.p.rapidapi.com/current.json',
			params: { q: paramVaue },
			headers: {
				'X-RapidAPI-Key': '2c1deb7fccmsh31d734702f0e449p1bddedjsn0deecd3e7318',
				'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com',
			},
		};
		setIsLoading(true);

		try {
			const response = await axios.request(options);
			if (response.status === 200) {
				setData(response.data);
			} else {
				setError('Error Fetching Location Data');
			}
			setIsLoading(false);
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	};

	React.useEffect(() => {
		fetchData();
	}, [city, location]);

	return { data, isLoading, error, updateCityValue };
};

export default useRequestApi;
