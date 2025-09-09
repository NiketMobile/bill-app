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
            animationIn="slideInUp"
            animationOut="slideOutDown"
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
                        // date_input: { backgroundColor: colors.white, borderRadius: 40 }, // Change the date input background color

                        today: { backgroundColor: colors.white, borderColor: colors.white, borderWidth: 1 }, // Add a border to today's date
                        today_label: { fontFamily: fonts.regular, fontSize: scale(15), color: colors.seleted_text_v1, backgroundColor: colors.white }, // Highlight the today label

                        selected_year_label: { color: colors.seleted_text_v1, fontFamily: fonts.regular, fontSize: scale(15) }, // Highlight the selected year label
                        selected_year: { backgroundColor: colors.white, fontFamily: fonts.medium, fontSize: scale(15) }, // Highlight the selected year

                        selected: { backgroundColor: colors.seleted_v1, borderColor: colors.white, borderRadius: 40, fontFamily: fonts.regular }, // Highlight the selected day
                        selected_label: { color: colors.seleted_text_v1, fontFamily: fonts.medium, fontSize: scale(15) }, // Highlight the selected day label

                        selected_month: { backgroundColor: colors.seleted_v1 }, // Highlight the selected month
                        selected_month_label: { color: colors.seleted_text_v1, fontFamily: fonts.regular, fontSize: scale(14) }, // Highlight the selected month label

                        day_cell: { borderColor: colors.white, borderRadius: 40, fontFamily: fonts.regular }, // Add a border to all day cells
                        day_label: { fontFamily: fonts.regular, fontSize: scale(15), borderRadius: 40, borderColor: colors.white }, // Change the day label color
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
