import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const db = firestore();
  const user = auth().currentUser;

// ➕ Add new expense (now requires userId)
export const addExpense = createAsyncThunk(
  'expenses/addExpense',
  async ({ expenseData, userId }, { rejectWithValue }) => {
    try {
      const docRef = await db.collection('expenses').add({
        ...expenseData,
        userId, 
        createdAt: firestore.FieldValue.serverTimestamp(),
      });

      const doc = await docRef.get();
      return {
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate().toISOString() || null
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// 📋 Fetch all expenses (now requires userId)
export const fetchExpenses = createAsyncThunk(
  'expenses/fetchExpenses',
  async (userId, { rejectWithValue }) => { // Now accepts userId parameter
    try {
      if (!userId) {
        throw new Error('No user ID provided');
      }

      const snapshot = await db.collection('expenses')
        .where('userId', '==', userId) // Filter by the provided userId
        .orderBy('createdAt', 'desc')
        .get();

      return snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          // Convert Firestore Timestamps to ISO strings
          createdAt: data.createdAt?.toDate()?.toISOString() || null,
          date: data.date?.toDate()?.toISOString() || null
        };
      });
    } catch (error) {
      console.error('Fetch error:', error);
      return rejectWithValue(error.message);
    }
  }
);

// 🔍 Filter expenses by category (now requires userId)
export const filterExpensesByCategory = createAsyncThunk(
  'expenses/filterByCategory',
  async ({ category, userId }, { rejectWithValue }) => { // 👈 Accept userId
    try {
      let query = db.collection('expenses')
        .where('userId', '==', userId);

      if (category) query = query.where('category', '==', category);
      
      const snapshot = await query.get();
      
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate?.()?.toISOString() || null
      }));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// ✏️ Update expense (no userId needed for update, but add security rules in Firestore)
export const updateExpense = createAsyncThunk(
  'expenses/updateExpense',
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
      await db.collection('expenses').doc(id).update(updatedData);
      return { id, ...updatedData };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// 🗑️ Delete expense (no userId needed here, but add security rules)
export const deleteExpense = createAsyncThunk(
  'expenses/deleteExpense',
  async (id, { rejectWithValue }) => {
    try {
      await db.collection('expenses').doc(id).delete();
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


// 🧠 Initial state
const initialState = {
  expenses: [],
  loading: false,
  error: null,
  filteredExpenses: [],
};

// 🧩 Expense slice
const ExpenseSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      // Add expense
      .addCase(addExpense.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addExpense.fulfilled, (state, action) => {
        state.loading = false;
        state.expenses = [action.payload, ...state.expenses]
        state.filteredExpenses = state.expenses;
        console.log("✅ Expense added to slice:", action.payload);
      })
      .addCase(addExpense.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch expenses
      .addCase(fetchExpenses.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchExpenses.fulfilled, (state, action) => {
        state.loading = false;
        state.expenses = action.payload;
        state.filteredExpenses = action.payload;
        console.log('inslice',state.expenses)
      })
      .addCase(fetchExpenses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Filter by category
      .addCase(filterExpensesByCategory.fulfilled, (state, action) => {
        state.filteredExpenses = action.payload;
        console.log('filter by catgeory',state.filteredExpenses)
      })

      // Update expense
      .addCase(updateExpense.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateExpense.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.expenses.findIndex(e => e.id === action.payload.id);
        if (index !== -1) {
          state.expenses[index] = action.payload;
          const filteredIndex = state.filteredExpenses.findIndex(e => e.id === action.payload.id);
          if (filteredIndex !== -1) {
            state.filteredExpenses[filteredIndex] = action.payload;
          }
        }
      })
      .addCase(updateExpense.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete expense
      .addCase(deleteExpense.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteExpense.fulfilled, (state, action) => {
        state.loading = false;
        state.expenses = state.expenses.filter(e => e.id !== action.payload);
        state.filteredExpenses = state.filteredExpenses.filter(e => e.id !== action.payload);
      })
      .addCase(deleteExpense.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default ExpenseSlice.reducer;
