import {
  Alert,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import {ScrollView} from 'react-native-gesture-handler';
// import connectWith from "../ActivityQuestion/withConnectActivityQuestion";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import React, {createRef, useRef, useState} from 'react';
import type {PropsWithChildren} from 'react';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
//  import ImagePicker from './components/ImagePicker';
import ActionSheet, {SheetManager} from 'react-native-actions-sheet';
import {checkCameraPermissions} from '../Comman/Function';
import {
  launchCamera,
  launchImageLibrary,
  MediaType,
} from 'react-native-image-picker';
import ImageResizer from 'react-native-image-resizer';
import RNPickerSelect from 'react-native-picker-select';
import GetLocation from 'react-native-get-location';
//  import PictureIcon from 'react-native-vector-icons/SimpleLineIcons';
//  import {RNCamera} from 'react-native-camera';

const styles = StyleSheet.create({
  header: {
    borderWidth: 0,
    height: hp(80),
    width: wp(100),
  },
  currentLocationButton: {
    width: wp(40),
    height: '40%',
    borderWidth: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#0071BC',
  },
  buttonOuterView: {
    width: wp(100),
    height: hp(15),
    display: 'flex',
    justifyContent: 'center',
    flexDirection: "row",
    alignItems: 'center',
  },
  buttonContainer: {
    width: wp(90),
    height: hp(15),
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: "row",
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontFamily: 'Poppins',
    fontSize: 14,
    fontWeight: 'bold',
  },
  coordsContainer: {
    width: wp(100),
    height: hp(6),
    borderWidth: 0,
  },
  coordsValueContainer: {
    width: wp(100),
    height: '100%',
    borderWidth: 0,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  latitudeInnerContainer: {
    width: '60%',
    height: '100%',
    borderWidth: 0,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  latitudeInnerValueContainer: {
    width: '40%',
    height: '100%',
    borderWidth: 0,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  coordsText: {
    color: '#0071BC',
    fontFamily: 'Poppins',
    fontSize: 22,
    fontWeight: 'bold',
  }
});
interface IActivityQuestionProps {
  navigation: any;
  route: any;
  activitySelection: any;
}
const PortFolio: any = () => {
  const actionSheetRef: any = createRef();
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const currentLocation = () => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 60000,
    })
      .then(location => {
        // Alert.alert("", location)
        setLatitude(location.latitude);
        setLongitude(location.longitude);
        console.log(location);
      })
      .catch(error => {
        const {code, message} = error;
        console.warn(code, message);
      });
  };
  const removeCurrentLocation =() => {
    setLatitude(0);
    setLongitude(0);
  }

  //   const launchCameraAndUploadImage = () => {
  //     setLoading(true);
  //     const mediaType: MediaType = 'photo';
  //     const options = {
  //       mediaType,
  //     };
  //     launchCamera(options, (cb: any) => {
  //       try {
  //         const path = cb?.assets[0]?.uri;
  //         ImageResizer.createResizedImage(
  //           path,
  //           1024,
  //           768,
  //           'JPEG',
  //           100,
  //           0,
  //           undefined,
  //         )
  //           .then((response: any) => {
  //             setPath(response.uri);
  //             setImage(response.uri.slice(50));
  //             // uploadSelectedImage(response.uri, true);
  //           })
  //           .catch((err: any) => {
  //             setLoading(false);
  //           });
  //       } catch (error) {
  //         setLoading(false);
  //         return error;
  //       }
  //     }).catch(err => {
  //       setLoading(false);
  //     });
  //   };
  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View style={styles.header}>
        <View style={styles.coordsContainer}>
          <View style={styles.coordsValueContainer}>
            <View style={styles.latitudeInnerContainer}>
              <Text style={styles.coordsText}>Latitude :</Text>
            </View>
            <View style={styles.latitudeInnerValueContainer}>
              <Text style={styles.coordsText}> {`${latitude}`}</Text>
            </View>
          </View>
        </View>
        <View style={styles.coordsContainer}>
        <View style={styles.coordsValueContainer}>
            <View style={styles.latitudeInnerContainer}>
              <Text style={styles.coordsText}>Longitude :</Text>
            </View>
            <View style={styles.latitudeInnerValueContainer}>
              <Text style={styles.coordsText}> {`${longitude}`}</Text>
            </View>
          </View>
        </View>
      </View>
      {/* <StatusBar
           barStyle={isDarkMode ? 'light-content' : 'dark-content'}
           backgroundColor={backgroundStyle.backgroundColor}
         /> */}
         <View style={styles.buttonOuterView}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.currentLocationButton}
          onPress={() => currentLocation()}>
          <Text style={styles.buttonText}>Get Location</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.currentLocationButton}
          onPress={() => removeCurrentLocation()}>
          <Text style={styles.buttonText}>Remove Location</Text>
        </TouchableOpacity>
      </View>
      </View>
    </SafeAreaView>
  );
};
export default PortFolio;
