import {
  Image,
   SafeAreaView,
   StatusBar,
   StyleSheet,
   Text,
   TouchableOpacity,
   useColorScheme,
   View,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import React, {createRef, useRef, useState} from 'react';
 
 import {
   Colors,
 } from 'react-native/Libraries/NewAppScreen';
 import ActionSheet, {SheetManager} from 'react-native-actions-sheet';
 import { checkCameraPermissions } from "../Comman/Function";
 import {
   launchCamera,
   MediaType,
 } from 'react-native-image-picker';
 import ImageResizer from 'react-native-image-resizer';


const styles = StyleSheet.create({
      actionSheetViewContainer: {
        borderWidth: 0,
        height: hp(10),
        borderRadius: 10,
        padding: 10,
      },
      actionDetailsViewContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginTop: '5%',
        height: hp(6),
        borderRadius: 10,
        borderWidth: 0,
        borderBottomColor: Colors.Grey,
        backgroundColor: '#rgb(26 115 232)',
      },
      galleryText: {
        fontSize: 20,
        color: '#ffffff',
        borderWidth: 0,
      },
      cancelTextView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '3%',
        height: hp(6),
        borderRadius: 10,
        borderWidth: 0,
        borderBottomColor: 'Grey',
        backgroundColor: '#rgb(26 115 232)',
      },
      scrollView: {
        height: '63%',
      },
      cameraContainer: {
        // backgroundColor: "lightgray",
        alignSelf: 'center',
        borderRadius: 4,
        width: '90%',
        borderWidth: 0,
        height: hp(94),
        borderColor: `${Colors.Grey}`,
      },
      cameraHeader: {
        height: "70%",
        width: '60%',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor:"#0071BC",
        borderRadius:10
      },
      innerTopContainer: {
        borderWidth:0,
        width : "100%",
        height: "87%"
      },
      innerBottomContainer: {
        borderWidth:0,
        width : "100%",
        height: "10%"
      }
});
interface IActivityQuestionProps {
  navigation: any;
  route: any;
  activitySelection: any;
}
let imagePath: any = null;
const ImagePicker: any= () => {
    const actionSheetRef: any = createRef();
    const [image, setImage] = useState('');
    const [path, setPath] = useState('');
    const [loading, setLoading] = useState(false);
    const isDarkMode = useColorScheme() === 'dark';
  
    const backgroundStyle = {
      backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };
  
    const launchCameraAndUploadImage = () => {
      const mediaType: MediaType = 'photo';
      const options = {
        mediaType,
      };
      launchCamera(options, (cb: any) => {
        try {
          const path = cb?.assets[0]?.uri;
          ImageResizer.createResizedImage(
            path,
            1024,
            768,
            'JPEG',
            100,
            0,
            undefined,
          )
            .then((response: any) => {
              setPath(response.uri);
              imagePath = response.uri();
    return response.readFile("base64")
              setImage(response.uri.slice(50));
              // uploadSelectedImage(response.uri, true);
            })
            .catch((err: any) => {
              return;
            });
        } catch (error) {
          return error;
        }
      }).catch(err => {
        return;
      });
    };
  return (
    <SafeAreaView style={backgroundStyle}>
       <StatusBar
         barStyle={isDarkMode ? 'light-content' : 'dark-content'}
         backgroundColor={backgroundStyle.backgroundColor}
       />
        <ScrollView
         contentInsetAdjustmentBehavior="automatic"
         style={backgroundStyle}>
         {/* <Header /> */}
         <View style={styles.cameraContainer}>
           <View style={styles.innerTopContainer}>
             <View style={{ backgroundColor: "#ffffff",borderWidth:0, height: "10%", width: "100%", justifyContent:"center", alignItems:"flex-start"}}>
               <Text style = {{ marginLeft: 10,color: "#000000", fontFamily:"Poppins", fontSize:20, fontWeight:"bold"}}>Image</Text>
             </View>
             <View style={{borderWidth:0, height: "40%", width: "100%"}}>
                 <Image source={imagePath} alt="Capture Image"/>
             </View>
           </View>
           <View style={styles.innerBottomContainer}>
           <TouchableOpacity
             onPress={() => {
               SheetManager.show('actionSheet');
             }}
             style={styles.cameraHeader}>
             <Text
               style={{
                 fontSize: 20,
                 color:"#ffffff"
               }}>
               Open Camera
             </Text>
           </TouchableOpacity>
           </View>
           <ActionSheet
             id="actionSheet"
             ref={actionSheetRef}
             closeAnimationDuration={0}>
             <TouchableOpacity
               onPress={() => {
                 SheetManager.hide('actionSheet').then(async () => {
                   setLoading(true);
                   const isCameraAvailable = await checkCameraPermissions();
                   if (isCameraAvailable) {
                     launchCameraAndUploadImage();
                   } else {
                     setLoading(false);
                   }
                 });
               }}>
               <View style={styles.actionSheetViewContainer}>
               <View style={styles.cancelTextView}>
                   <Text style={styles.galleryText}>Camera</Text>
               </View>
             </View>
             </TouchableOpacity>
             <View style={styles.actionSheetViewContainer}>
               <View style={styles.cancelTextView}>
                 <TouchableOpacity
                   onPress={() => actionSheetRef.current?.hide()}>
                   <Text style={styles.galleryText}>Cancel</Text>
                 </TouchableOpacity>
               </View>
             </View>
           </ActionSheet>
         </View>
         
         
       </ScrollView>
     </SafeAreaView>
  );
};
export default ImagePicker;
