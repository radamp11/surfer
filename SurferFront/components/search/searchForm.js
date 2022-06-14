import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableWithoutFeedback, Keyboard, TextInput, TouchableOpacity } from "react-native";
import { Formik } from "formik";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from "moment";
import * as yup from 'yup';

const maxDifferenceInMillis = 1209600000;   // 14 days in milliseconds

const parametersSchema = yup.object({
    subject: yup.string()
        .required()
        .min(2),
    maxResults: yup.string()
        .test('is-number', 'The number of results must be positive without any additional characters!', (val) => {
            return !isNaN(parseInt(val)) && parseInt(val) > 0;
        }),
    start: yup.string()
        .test('is-not-too-old', 'You cannot search for posts older than 14 days (and from future :))!', (val) => {
            let date = moment(val).toDate();
            let now = new Date();
            return now - date < maxDifferenceInMillis && moment() - moment(val).toDate() >= 0;
        }),
    end: yup.string()
        .test({
            name: 'end-later-that-start',
            exclusive: false,
            params: {},
            message: 'End date cannot be either future nor earlier than start date!',
            test: function (val) {
                // console.log(moment(val).toDate() - moment(this.parent.start).toDate())
                return moment(val).toDate() - moment(this.parent.start).toDate() > 0 && moment() - moment(val).toDate() >= 0;
            },
        }),
})

export default function SearchForm({ setModalVisible, getNewPosts }) {

    function hideModal() {
        setModalVisible(false)
    }

    return (
        <View style={{backgroundColor: '#ECFBFF'}}>
            <Formik
                initialValues={{ subject: '', start: moment().subtract(1, 'days'), end: moment(), maxResults: 20}}
                validationSchema={parametersSchema}
                onSubmit={(values) => {
                    if (values.maxResults === '') {
                        values.maxResults = 20;
                    }
                    else values.maxResults = parseInt(values.maxResults);
                    hideModal();
                    values.start = moment(values.start).format('YYYY-MM-DD hh:mm')
                    values.end = moment(values.end).format('YYYY-MM-DD hh:mm')
                    getNewPosts(values);
                }}>
                    {(props) => (
                        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View style={styles.formContainer}>
                            <TextInput 
                                style={styles.subjectInput}
                                placeholder='Type in subject of posts'
                                onChangeText={props.handleChange('subject')}
                                value={props.values.subject}
                                onBlur={props.handleBlur('subject')}
                                />
                            <Text style={styles.error}>{props.touched.subject && props.errors.subject}</Text>

                            <DatePicker dateField={props.values.start} setFieldValue={props.setFieldValue} fieldName='start'/>
                            <Text style={styles.error}>{props.touched.start && props.errors.start}</Text>

                            <DatePicker dateField={props.values.end} setFieldValue={props.setFieldValue} fieldName='end'/>
                            <Text style={styles.error}>{props.touched.end && props.errors.end}</Text>

                            <TextInput 
                                style={styles.subjectInput}
                                placeholder='Max results (default 20)'
                                onChangeText={props.handleChange('maxResults')}
                                value={props.values.maxResults}
                                keyboardType='numeric'
                                onBlur={props.handleBlur('subject')}
                                />
                            <Text style={styles.error}>{props.touched.maxResults && props.errors.maxResults}</Text>

                            <View style={styles.container}>
                                <View style={styles.button}>
                                    <TouchableOpacity onPress={hideModal}>
                                        <Icon
                                            name='close'
                                            size={40}
                                            style={styles.closeIcon}
                                            />
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.button}>
                                    <TouchableOpacity onPress={() => props.handleSubmit()} >
                                        <Icon
                                            name='search'
                                            size={40}
                                            style={styles.searchIcon}
                                            />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        </TouchableWithoutFeedback>
                    )}
            </Formik>
        </View>
    );
}

const DatePicker = ({ dateField, setFieldValue, fieldName }) => {
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  
    const showDatePicker = () => {
      setDatePickerVisibility(true);
    };
  
    const hideDatePicker = () => {
      setDatePickerVisibility(false);
    };
  
    const handleConfirm = (date) => {
      if (fieldName === 'end'){
        setFieldValue(fieldName, moment(date).subtract(30, 'minutes'));
      }
      setFieldValue(fieldName, moment(date));
      hideDatePicker();
    };
  
    return (
      <View style={{width: '100%', alignSelf: 'center'}}>
        <TouchableOpacity style={styles.selectDateButton} onPress={showDatePicker}>
            <View>
                <Text style={styles.subjectInput}>{'Select ' + fieldName + ' date: ' + moment(dateField).format('YYYY-MM-DD')}</Text>
            </View>
        </TouchableOpacity>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
          date={moment(dateField).toDate()}
        />
      </View>
    );
};


const styles = StyleSheet.create({
    formContainer: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ECFBFF'
    },
    subjectInput: {
        fontSize: 20,
        color: '#173776',
        width: '90%',
        height: 50,
        alignSelf: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        backgroundColor: '#F9FEFF',
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#E9F2F2',
        marginTop: 15,
        marginBottom: 5,
    },
    selectDateButton: {
        width: '100%'
    },
    container: {
        flexDirection: 'row',
        width: '100%',
        backgroundColor: '#ECFBFF'
    },
    closeIcon: {
        alignSelf: 'center',
        color: '#C70039',
    },
    searchIcon: {
        alignSelf: 'center',
        color: '#2DB9E5',
    },
    button: {
        alignContent: 'center',
        justifyContent: 'center',
        width: '50%',
        height: 40,
        backgroundColor: '#ECFBFF'
    },
    error: {
       color: 'crimson',
       fontWeight: 'bold',
       marginBottom: 5,
       textAlign: 'center',
    }
})