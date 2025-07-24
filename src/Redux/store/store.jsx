// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import expenseReducer from '../Slices/ExpenseSlice'; // Import your expense slice

// Create the Redux store
const store = configureStore({
  reducer: {
    expenses: expenseReducer, 
    
  },
//   middleware: getDefaultMiddleware =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         // Ignore these field paths in all actions
//         ignoredActionPaths: ['meta.arg', 'payload.timestamp'],
//         // Ignore these paths in the state
//         ignoredPaths: ['items.dates'],
//       },
//     }),
//   devTools: process.env.NODE_ENV !== 'production', // Enable Redux DevTools in development
});

export default store;