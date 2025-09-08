import { Alert } from 'react-native';

const showAlert = ({
    title = 'Alert',
    message = 'Are you sure?',
    confirmText = 'OK',
    cancelText = 'Cancel',
    onConfirm = () => { },
    onCancel = () => console.log('Cancelled'),
}) => {
    Alert.alert(
        title,
        message,
        [
            {
                text: cancelText,
                onPress: onCancel,
                style: 'cancel',
            },
            {
                text: confirmText,
                onPress: onConfirm,
            },
        ]
    );
};

export default showAlert;
