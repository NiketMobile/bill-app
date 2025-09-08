import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import DateTimePicker, { DateType, useDefaultStyles } from 'react-native-ui-datepicker';
import moment from 'moment';
import Button from './button';
import { fonts } from '../constant/fonts';
import { scale } from '../utils/appScale';
import { colors } from '../constant/colors';

const CustomCalendar = ({ visible, onClose, onSelected }) => {
    const [tempDate, setTempDate] = useState(moment());
    const defaultStyles = useDefaultStyles();

    const handleConfirm = () => {
        onSelected?.(moment(tempDate).format('YYYY-MM-DD'));
        onClose();
    };

    return (
        <Modal
            isVisible={visible}
            onBackdropPress={onClose}
            style={styles.modal}
        >
            <View style={styles.modalContent}>
                <Text style={styles.title}>Select Date of Birth</Text>
                <DateTimePicker
                    mode="single"
                    date={tempDate}
                    onChange={({ date }) => setTempDate(moment(date))}
                    maxDate={moment().toDate()} // only allow past dates
                    navigationPosition="right"
                    styles={{
                        ...defaultStyles,
                        today: { borderColor: 'blue', borderWidth: 1 }, // Add a border to today's date
                        selected: { backgroundColor: colors.themeColor }, // Highlight the selected day
                        selected_label: { color: colors.white }, // Highlight the selected day label
                        today_label: { color: colors.themeColor }, // Highlight the today label
                        selected_year_label: { color: colors.white }, // Highlight the selected year label
                        selected_year: { backgroundColor: colors.themeColor }, // Highlight the selected year
                        selected_month: { backgroundColor: colors.themeColor }, // Highlight the selected month
                        selected_month_label: { color: colors.white }, // Highlight the selected month label
                    }}
                />
                <Button
                    title="Done"
                    onPress={handleConfirm}
                />
            </View>
        </Modal>
    );
};

export default CustomCalendar;

const styles = StyleSheet.create({
    modal: {
        justifyContent: 'center',
        margin: scale(20),
        flex: 1
    },
    modalContent: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: scale(15),
    },
    title: {
        fontSize: scale(17),
        fontWeight: '500',
        marginBottom: 12,
        textAlign: 'center',
        fontFamily: fonts.regular
    },
});
