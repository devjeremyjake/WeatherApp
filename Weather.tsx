import {
	View,
	Text,
	SafeAreaView,
	TextInput,
	TouchableHighlight,
	ActivityIndicator,
} from 'react-native';
import Constant from 'expo-constants';
import React from 'react';
import useRequestApi from './Hooks/useRequestApi';
import {
	CreateResponsiveStyle,
	DEVICE_SIZES,
	useDeviceSize,
} from 'rn-responsive-styles';
// import * as ScreenOrientation from "expo-screen-orientation";
import WeatherComponent from './Components/WeatherComponent/WeatherComponent';
import { BASE_COLOR, COLOR_ONE, COLOR_WHITE, FONT_FAMILY } from './Constants';

const Weather = () => {
	const styles = useStyles();
	const deviceSize = useDeviceSize();
	const [inputField, setInputField] = React.useState<string>('');
	const { data, isLoading, error, updateCityValue } = useRequestApi();

	// ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
	// React.useEffect(() => {
	// 	console.log('Device Size : ', deviceSize);
	// }, [deviceSize]);

	const updateCity = () => {
		if (inputField === '') return false;
		updateCityValue(inputField);
		setInputField('');
	};

	const WeatherInformation = () =>
		isLoading ? (
			<ActivityIndicator />
		) : error !== null ? (
			<Text>Error Fetching</Text>
		) : (
			<WeatherComponent data={data} />
		);

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.inputContainer}>
				<TextInput
					style={[styles.inputField]}
					placeholder="Enter City"
					placeholderTextColor="#FAFAFA"
					onChangeText={(text) => setInputField(text)}
					value={inputField}
				/>
				<View style={styles.buttonContainer}>
					<TouchableHighlight onPress={updateCity}>
						<View>
							<Text style={styles.buttonText}>Search</Text>
						</View>
					</TouchableHighlight>
				</View>
			</View>
			<WeatherInformation />
		</SafeAreaView>
	);
};

const useStyles = CreateResponsiveStyle(
	{
		container: {
			flex: 1,
			marginHorizontal: 20,
			paddingTop: Constant.statusBarHeight + 10,
		},
		inputContainer: {
			display: 'flex',
			flexDirection: 'row',
			marginBottom: 30,
		},
		inputField: {
			backgroundColor: BASE_COLOR,
			paddingVertical: 15,
			paddingHorizontal: 10,
			borderTopLeftRadius: 10,
			borderBottomLeftRadius: 10,
			flex: 1,
		},
		buttonContainer: {
			backgroundColor: COLOR_ONE,
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			paddingHorizontal: 20,
			borderTopRightRadius: 10,
			borderBottomRightRadius: 10,
		},
		buttonText: {
			color: COLOR_WHITE,
			fontSize: 17,
			fontWeight: '600',
			fontFamily: FONT_FAMILY,
		},
	},
	{
		[DEVICE_SIZES.XS]: {
			container: {
				flex: 1,
			},
		},
		[DEVICE_SIZES.MEDIUM_DEVICE]: {
			container: {
				marginBottom: 40,
			},
			inputContainer: {
				marginTop: 10,
			},
		},
	}
);

export default Weather;
