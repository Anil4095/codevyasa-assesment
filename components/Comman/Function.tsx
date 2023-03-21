import { check, PERMISSIONS, RESULTS } from "react-native-permissions";
// import Toast from "react-native-toast-message";

// const showToast = (type: any, message: any) => {
//   Toast.show({
//     type,
//     position: "bottom",
//     text1: message,
//     visibilityTime: 3000,
//     autoHide: true,
//     topOffset: 0,
//     bottomOffset: 10,
//     onShow: () => {},
//     onHide: () => {},
//   });
// };

let activeRoute: string = "";
const setActiveRouteName = (routeName: string) => {
  activeRoute = routeName;
};
const getActiveRoute = () => activeRoute;

const checkCameraPermissions = async () => {
    console.log("premission granted -----------------------------------")
  let isGranted = false;
  const result = await check(PERMISSIONS.ANDROID.CAMERA);
  console.log("permission  of Camera  :", result)
  switch (result) {
    case RESULTS.UNAVAILABLE:
      console.log(
        "This feature is not available (on this device / in this context)"
      );
      isGranted = false;
      break;
    case RESULTS.DENIED:
      console.log(
        "The permission has not been requested / is denied but requestable"
      );
      isGranted = false;
      break;
    case RESULTS.LIMITED:
      console.log("The permission is limited: some actions are possible");
      isGranted = true;
      break;
    case RESULTS.GRANTED:
      console.log("The permission is granted");
      isGranted = true;
      break;
    case RESULTS.BLOCKED:
      console.log("The permission is denied and not requestable anymore");
      isGranted = false;
      break;
    default:
      isGranted = false;
      break;
  }
  return isGranted;
};

let addTestDriveData: any;

const setAddTestDriveData = (data: any) => {
  addTestDriveData = data;
};
const getAddTestDriveData = () => {
  return addTestDriveData;
};
let statusTestDrive : any;
const setStatusTestDrive = (data: any) => {
  statusTestDrive = data;
}

const getStatusTestDrive = ()=>{
  return statusTestDrive;
}
export {
//   showToast,
  setActiveRouteName,
  getActiveRoute,
  checkCameraPermissions,
  setAddTestDriveData,
  getAddTestDriveData,
  setStatusTestDrive,
  getStatusTestDrive
};
