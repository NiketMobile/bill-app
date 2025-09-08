import Toast from "react-native-toast-message";

const showToast = ({ type, title }) => {
    Toast.show({
        type: type,
        text1: title
    })
}

export default showToast