export const BASE_COLOR = '#D1CFCD';
export const COLOR_ONE = '#A2661C';
export const COLOR_WHITE = '#FFFFFF';
export const DARK_COLOR_ONE = '#333333';
import Constants from 'expo-constants';

const SECRET_KEY = Constants.expoConfig.extra.SECRET_KEY;

// Font variable
export const FONT_FAMILY = 'fantasy';

export const WEATHER_OPTIONS = {
	method: 'GET',
	url: 'https://weatherapi-com.p.rapidapi.com/current.json',
	headers: {
		'X-RapidAPI-Key': `${SECRET_KEY}`, //put in .env
		'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com',
	},
};
