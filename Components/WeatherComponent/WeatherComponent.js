import { View, Text, Image, ScrollView } from 'react-native';
import React from 'react';
import { BASE_COLOR, DARK_COLOR_ONE } from '../../Constants';
import {
	CreateResponsiveStyle,
	DEVICE_SIZES,
	useDeviceSize,
} from 'rn-responsive-styles';

const WeatherComponent = ({ data }) => {
	const styles = useStyles();

	return (
		<ScrollView contentContainerStyle={styles.container}>
			<View style={{ flex: 1, alignItems: 'center' }}>
				<Text style={styles.headingSmall}>Current location</Text>
				<Text style={styles.headingLarge}>
					{data?.location?.name}, {data?.location?.region}
				</Text>
				{/* Image section */}
				<Image
					style={styles.imageStyle}
					source={{
						uri: `https:${data?.current?.condition?.icon}`,
					}}
				/>
				<View style={styles.conditionContainer}>
					<Text style={styles.conditionText}>
						{data?.current?.condition?.text}
					</Text>
				</View>
				{/* Temprature */}
				<Text style={styles.temprature}>{data?.current?.temp_c} °C</Text>
				{/* Other stats */}
			</View>
		</ScrollView>
	);
};

const useStyles = CreateResponsiveStyle(
	{
		container: {
			flex: 1,
		},
		headingSmall: {
			fontSize: 20,
			fontWeight: 500,
			color: DARK_COLOR_ONE,
			marginBottom: 5,
		},
		headingLarge: {
			fontSize: 30,
			fontWeight: 700,
			color: DARK_COLOR_ONE,
			textAlign: 'center',
		},
		imageStyle: {
			width: 150,
			height: 150,
		},
		conditionContainer: {
			backgroundColor: BASE_COLOR,
			paddingHorizontal: 10,
			paddingVertical: 10,
			borderRadius: 20,
		},
		conditionText: {
			fontSize: 24,
			color: DARK_COLOR_ONE,
		},
		temprature: {
			marginTop: 40,
			fontSize: 40,
			fontWeight: 600,
			color: DARK_COLOR_ONE,
		},
	},
	{
		[DEVICE_SIZES.XS]: {
			container: {
				flex: 1,
			},
			headingSmall: {
				fontSize: 14,
			},
			headingLarge: {
				fontSize: 25,
			},
			imageStyle: {
				width: 100,
				height: 100,
			},
			conditionContainer: {
				paddingHorizontal: 20,
				paddingVertical: 8,
				marginTop: 10,
			},
			conditionText: {
				fontSize: 16,
				fontWeight: 700,
			},
			temprature: {
				marginTop: 40,
				fontSize: 30,
				fontWeight: 600,
			},
		},
	},
	{
		[DEVICE_SIZES.MD]: {
			conditionText: {
				fontSize: 34,
				fontWeight: 700,
			},
			headingSmall: {
				fontSize: 30,
				marginBottom: 15,
			},
			headingLarge: {
				fontSize: 40,
				fontWeight: 700,
				color: DARK_COLOR_ONE,
				textAlign: 'center',
			},
		},
	}
);

export default WeatherComponent;
