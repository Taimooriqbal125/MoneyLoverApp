import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Platform,
  ScrollView,
  KeyboardAvoidingView,
  ImageBackground,
} from 'react-native';
import React, { useState } from 'react';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useDispatch, useSelector } from 'react-redux';
import { addExpense } from '../Redux/Slices/ExpenseSlice';
import Toast from 'react-native-toast-message';
import auth from '@react-native-firebase/auth';

export default function AddExpense({ navigation }) {
  const dispatch = useDispatch();
  const { loading, error } = useSelector(state => state.expenses);

  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [note, setNote] = useState('');

  const resetForm = () => {
    setTitle('');
    setAmount('');
    setCategory(null);
    setNote('');
  };

  const categoryData = [
    { label: 'Food', value: 'food' },
    { label: 'Transport', value: 'transport' },
    { label: 'Shopping', value: 'shopping' },
    { label: 'Other', value: 'other' },
  ];

  const handleSubmit = async () => {
    if (!title || !amount || !category) {
      Toast.show({
        type: 'error',
        text1: 'Missing Fields',
        text2: 'Please fill all required fields',
        visibilityTime: 3000,
      });
      return;
    }

    const user = auth().currentUser;
    if (!user) {
      Toast.show({
        type: 'error',
        text1: 'Authentication Error',
        text2: 'Please login to add expenses',
      });
      return;
    }

    const expenseData = {
      title,
      amount: parseFloat(amount),
      category,
      note,
      userId: user.uid, // Include userId in the expense data
      createdAt: new Date().toISOString(), // Use client-side timestamp
    };

    try {
      await dispatch(addExpense({ expenseData, userId: user.uid })).unwrap();
      
      Toast.show({
        type: 'success',
        text1: 'Expense Added',
        text2: 'Your record was saved successfully'
      });

      resetForm();
      navigation.goBack();
    } catch (err) {
      console.error('Failed to add expense:', err);
      Toast.show({
        type: 'error',
        text1: 'Submission Failed',
        text2: err.message || 'Failed to add expense'
      });
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <View style={{ marginHorizontal: 5, marginVertical: 10, flex: 1 }}>
        <ScrollView>
          <View style={{ marginVertical: 14 }}>
            <Text style={styles.headerText}>Add New Expense</Text>
          </View>

          {/* Expense Title */}
          <View style={styles.inputWrapper}>
            <Text style={styles.label}>Expense Title*</Text>
            <TextInput
              style={styles.input}
              placeholder="Grocery / Food"
              placeholderTextColor="grey"
              value={title}
              onChangeText={setTitle}
            />
          </View>

          {/* Amount */}
          <View style={styles.inputWrapper}>
            <Text style={styles.label}>Amount*</Text>
            <TextInput
              style={styles.input}
              placeholder="eg, 500"
              placeholderTextColor="grey"
              value={amount}
              onChangeText={setAmount}
              keyboardType="decimal-pad"
            />
          </View>

          {/* Category */}
          <View style={styles.inputWrapper}>
            <Text style={styles.label}>Category*</Text>
            <Dropdown
              animationDuration={100}
              style={[styles.inputs, isFocus && { borderColor: 'blue' }]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              containerStyle={styles.dropdownContainer}
              data={categoryData}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={!isFocus ? 'Select category' : '...'}
              searchPlaceholder="Search..."
              value={category}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={item => {
                setCategory(item.value);
                setIsFocus(false);
              }}
              renderLeftIcon={() => (
                <AntDesign
                  style={styles.icon}
                  color={isFocus ? 'blue' : 'grey'}
                  name="tags"
                  size={20}
                />
              )}
            />
          </View>

          {/* Note */}
          <View style={styles.inputWrapper}>
            <Text style={styles.label}>Note</Text>
            <ImageBackground
              source={require('../assets/download.jpg')}
              resizeMode="repeat"
              style={styles.commentBoxContainer}
            >
              <TextInput
                style={styles.commentInput}
                multiline
                placeholder="Write your note..."
                placeholderTextColor="#999"
                value={note}
                onChangeText={setNote}
              />
            </ImageBackground>
          </View>

          {/* Submit Button */}
          <View style={{ alignItems: 'center', marginTop: 20, marginBottom: 40 }}>
            <TouchableOpacity
              onPress={handleSubmit}
              style={styles.btncontainer}
              disabled={loading}
            >
              <Text style={styles.btn}>
                {loading ? 'Adding...' : 'Add Expense'}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  headerText: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '500'
  },
  inputWrapper: {
    marginHorizontal: 15,
    marginVertical: 10,
  },
  input: {
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#e0e4f0ff',
  },
  label: {
    padding: 5,
    fontWeight: '500',
    fontSize: 15,
    color:'#000000ff'
  },
  btncontainer: {
    width: '60%',
    backgroundColor: '#232B5D',
    borderRadius: 50,
  },
  btn: {
    color: '#fff',
    fontWeight: '500',
    fontSize: 16,
    padding: 10,
    textAlign: 'center',
  },
  inputs: {
    height: 50,
    borderColor: 'gray',
    borderRadius: 8,
    paddingHorizontal: 8,
    backgroundColor: '#e0e4f0ff',
  },
  placeholderStyle: {
    fontSize: 16,
    color: 'grey',
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  icon: {
    marginRight: 5,
  },
  dropdownContainer: {
    backgroundColor: 'white',
    borderColor: '#e0e0e0',
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  commentBoxContainer: {
    height: 120,
    borderRadius: 8,
    overflow: 'hidden',
  },
  commentInput: {
    flex: 1,
    padding: 12,
    textAlignVertical: 'top',
    backgroundColor: 'rgba(224, 228, 240, 0.8)',
    fontSize: 16,
  },
});