import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Modal
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { deleteExpense, fetchExpenses } from '../Redux/Slices/ExpenseSlice';
import Svg, { Rect, Circle, Path } from 'react-native-svg';
import { useAuth } from '../auth/AuthContext';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Toast from 'react-native-toast-message';

const DeleteExpense = () => {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const { expenses, loading, error } = useSelector(state => state.expenses);

  const [localLoading, setLocalLoading] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    if (user?.uid) {
      dispatch(fetchExpenses(user.uid));
    }
  }, [dispatch, user?.uid]);

  const handleDelete = async (id) => {
    setLocalLoading(true);
    try {
      await dispatch(deleteExpense(id)).unwrap();

      Toast.show({
        type: 'success',
        text1: 'Deleted Successfully',
        text2: 'Expense was removed',
        visibilityTime: 3000,
        position: 'bottom',
      });
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Deletion Failed',
        text2: error.message || 'Could not delete expense',
        visibilityTime: 4000,
        position: 'bottom',
      });
    } finally {
      setLocalLoading(false);
    }
  };

  const confirmDelete = (id) => {
    setSelectedId(id);
    setShowConfirmModal(true);
  };

  const handleConfirmDelete = () => {
    setShowConfirmModal(false);
    handleDelete(selectedId);
  };

  if (loading && expenses.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4C6EF5" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Svg style={StyleSheet.absoluteFillObject}>
        <Rect width="100%" height="100%" fill="white" />
        <Circle cx="10%" cy="30%" r="60" fill="#F5F5F5" />
        <Circle cx="90%" cy="60%" r="80" fill="#F5F5F5" />
        <Path
          d="M0,100 Q50,50 100,100 T200,100 T300,100"
          fill="none"
          stroke="#F0F0F0"
          strokeWidth="2"
        />
      </Svg>

      <View style={styles.content}>
        <Text style={styles.title}>Your Expenses</Text>

        {expenses.length === 0 ? (
          <Text style={styles.emptyText}>No expenses found</Text>
        ) : (
          <FlatList
            data={expenses}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContainer}
            renderItem={({ item }) => (
              <View style={styles.expenseItem}>
                <View style={styles.expenseInfo}>
                  <Text style={styles.expenseTitle}>{item.title || 'Untitled Expense'}</Text>
                  <Text style={styles.expenseAmount}>-PKR {item.amount}</Text>
                  <Text style={styles.expenseCategory}>{item.category}</Text>
                  {item.createdAt && (
                    <Text style={styles.expenseDate}>
                      {new Date(item.createdAt).toLocaleDateString()}
                    </Text>
                  )}
                </View>

                <TouchableOpacity
                  onPress={() => confirmDelete(item.id)}
                  disabled={localLoading}
                  style={styles.deleteButton}
                >
                  <Ionicons name="trash-outline" size={24} color="#ff3b30" />
                </TouchableOpacity>
              </View>
            )}
          />
        )}
      </View>

      {/* Custom Confirm Modal */}
      <Modal
        transparent
        animationType="fade"
        visible={showConfirmModal}
        onRequestClose={() => setShowConfirmModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Confirm Deletion</Text>
            <Text style={styles.modalText}>Are you sure you want to delete this expense?</Text>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                onPress={() => {
                  setShowConfirmModal(false);
                  Toast.show({
                    type: 'info',
                    text1: 'Cancelled',
                    text2: 'Deletion was cancelled',
                    visibilityTime: 2000,
                  });
                }}
                style={[styles.modalButton, { backgroundColor: '#ccc' }]}
              >
                <Text>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleConfirmDelete}
                style={[styles.modalButton, { backgroundColor: '#ff3b30' }]}
              >
                <Text style={{ color: '#fff' }}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  content: { flex: 1, padding: 20, zIndex: 1 },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  errorContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  errorText: { color: '#ff3b30', fontSize: 16 },
  title: { fontSize: 24, fontWeight: '600', color: '#333', marginBottom: 20, textAlign: 'center' },
  emptyText: { textAlign: 'center', color: '#666', marginTop: 40, fontSize: 16 },
  listContainer: { paddingBottom: 20 },
  expenseItem: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  expenseInfo: { flex: 1 },
  expenseTitle: { fontSize: 16, fontWeight: '500', marginBottom: 4 },
  expenseAmount: { fontSize: 16, fontWeight: '600', color: '#ff3b30', marginBottom: 4 },
  expenseCategory: { fontSize: 14, color: '#666', marginBottom: 4 },
  expenseDate: { fontSize: 12, color: '#999' },
  deleteButton: { padding: 8, marginLeft: 10 },

  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    backgroundColor: 'white',
    width: '80%',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 20,
    color: '#444',
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  modalButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
});

export default DeleteExpense;
