/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import {NavigationContainer} from '@react-navigation/native';
 import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
 import React from 'react';
 // import type {Node} from 'react';
 import {
   Image,
   SafeAreaView,
   ScrollView,
   StatusBar,
   StyleSheet,
   Text,
   useColorScheme,
   View,
 } from 'react-native';
 
 import {
   Colors,
   DebugInstructions,
   Header,
   LearnMoreLinks,
   ReloadInstructions,
 } from 'react-native/Libraries/NewAppScreen';
 import {createNativeStackNavigator} from '@react-navigation/native-stack';
 import {GestureHandlerRootView} from 'react-native-gesture-handler';
import ImagePicker from './components/imagePiker/imagePiker';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import PortFolio from './components/portfolio/portfolio';


 const Stack = createNativeStackNavigator();
 const Tab = createBottomTabNavigator();
 const App = () => {
   const isDarkMode = useColorScheme() === 'dark';
 
   const backgroundStyle = {
     backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
   };
   const getTabHeader = (tabname: String) => (
    <View
      style={{
        height: heightPercentageToDP(8),
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 1,
        backgroundColor: Colors.iconColor,
      }}
    >
      <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white' }}>
        {tabname}
      </Text>
    </View>
  );

   const getSVGIcon = (routeName: String, color: String) => {
    if (routeName === 'image-picker') {
      return <Image source={require("./image/Camera.png")} style={{height: 30, width: 30}} />;
    } if (routeName === 'port-folio') {
      return <Image source={require("./image/PortFolio.png")} style={{height: 30, width: 30}}/>;
    } 
  };

   const Home = () => (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => getSVGIcon(route.name, color),
        tabBarActiveTintColor: Colors.primaryThemeColor,
        tabBarInactiveTintColor: Colors.labelColor,
        tabBarHideOnKeyboard: true,
      })}
    >
      <Tab.Screen
        name="image-picker"
        component={ImagePicker}
        options={{
          headerShown: false,
          header: () => getTabHeader('Camera'),
          title: 'Camera',
        }}
      />
      <Tab.Screen
        name="port-folio"
        component={PortFolio}
        options={{
          headerShown: false,
          header: () => getTabHeader('port-folio'),
          title: 'Portfolio',
        }}
      />
    </Tab.Navigator>
  );
 
   return (
         <GestureHandlerRootView style={{flex: 1}}>
           <NavigationContainer>
           <Stack.Navigator>
             <Stack.Screen
               name="home"
               component={Home}
               options={{headerShown: false}}
             />
           </Stack.Navigator>
           </NavigationContainer>
         </GestureHandlerRootView>
   );
 };
 
 const styles = StyleSheet.create({
   sectionContainer: {
     marginTop: 32,
     paddingHorizontal: 24,
   },
   sectionTitle: {
     fontSize: 24,
     fontWeight: '600',
   },
   sectionDescription: {
     marginTop: 8,
     fontSize: 18,
     fontWeight: '400',
   },
   highlight: {
     fontWeight: '700',
   },
 });
 
 export default App;
 