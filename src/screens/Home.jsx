import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { filterExpensesByCategory, fetchExpenses } from '../Redux/Slices/ExpenseSlice';
import auth from '@react-native-firebase/auth';
import React, { useEffect, useState } from 'react';
import Chart from '../component/Chart';
import { useDispatch, useSelector } from 'react-redux';

export default function Home() {
  const [category, setCategory] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const dispatch = useDispatch();

  const userId = auth().currentUser?.uid;

  const { expenses, loading, error, filteredExpenses } = useSelector(
    state => state.expenses
  );

  useEffect(() => {
    if (userId) {
      dispatch(fetchExpenses(userId));
    }
  }, [dispatch, userId]);

  const handleFilter = (category) => {
    if (userId) {
      dispatch(filterExpensesByCategory({ category, userId }));
    }
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return 'No date';
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const categoryData = [
    { label: 'All', value: '' },
    { label: 'Food', value: 'food' },
    { label: 'Transport', value: 'transport' },
    { label: 'Shopping', value: 'shopping' },
    { label: 'Other', value: 'other' },
  ];

  if (loading) return <ActivityIndicator size="large" color="blue" />;
  if (error) return <Text style={styles.errorText}>❌ Error: {error}</Text>;

  const displayData = category ? filteredExpenses || [] : expenses || [];

  return (
    <View style={styles.container}>
      <Text style={styles.header}>All Expenses</Text>

      <View style={styles.inputWrapper}>
        <Chart expenses={displayData} showEmptyMessage={true} />

        <Text style={styles.label}>Search by Category</Text>
        <Dropdown
          animationDuration={100}
          style={[styles.inputs, isFocus && { borderColor: 'blue' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          containerStyle={styles.dropdownContainer}
          data={categoryData}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Select category' : '...'}
          value={category}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setCategory(item.value);
            setIsFocus(false);
            handleFilter(item.value);
          }}
          renderLeftIcon={() => (
            <AntDesign
              style={styles.icon}
              color={isFocus ? 'blue' : 'grey'}
              name="Safety"
              size={20}
            />
          )}
        />

        {displayData.length === 0 ? (
          <Text style={styles.noExpensesText}>No expenses found.</Text>
        ) : (
          <FlatList
            data={displayData}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <View style={styles.expenseItem}>
                <View>
                  <Text style={styles.expenseTitle}>{item.title}</Text>
                  <Text style={styles.expenseCategory}>{item.category}</Text>
                  <Text style={styles.expenseDate}>
                    {formatDate(item.createdAt || item.date)}
                  </Text>
                </View>
                <Text style={styles.expenseAmount}>-PKR {item.amount}</Text>
              </View>
            )}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 17,
    marginVertical: 10,
    marginBottom: 40,
  },
  header: {
    padding: 15,
    textAlign: 'center',
    fontSize: 19,
    fontWeight: '500',
    color: '#000000',
  },
  inputWrapper: {
    flex: 1,
  },
  label: {
    padding: 5,
    fontWeight: '500',
    fontSize: 15,
    color:'#000000'
  },
  inputs: {
    height: 50,
    borderColor: 'gray',
    borderRadius: 8,
    paddingHorizontal: 8,
    backgroundColor: '#e0e4f0ff',
    color:'#000000'
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
  noExpensesText: {
    textAlign: 'center',
    marginTop: 20,
    color: 'grey',
  },
  expenseItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 7,
    marginVertical: 10,
    padding: 10,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
  },
  expenseTitle: {
    fontSize: 16,
    fontWeight: '500',
    color:'#000000'
  },
  expenseCategory: {
    fontSize: 11,
    color: 'grey',
  },
  expenseDate: {
    fontSize: 11,
    color: 'grey',
    marginTop: 3,
  },
  expenseAmount: {
    color: 'red',
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
   inputSearchStyle: {
    height: 40,
    fontSize: 16,
    color:'#000000'
  },
   selectedTextStyle: {
    fontSize: 16,
    color:'#000000' 
  },
    placeholderStyle: {
    fontSize: 16,
    color: '#000000',
  },
    iconStyle: {
    width: 20,
    height: 20,
  },
});
