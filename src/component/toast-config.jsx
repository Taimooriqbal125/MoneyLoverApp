import { View, Text, StyleSheet, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export const toastConfig = {
  success: ({ text1, text2, props }) => {
    const opacity = props?.opacity ?? new Animated.Value(1);
    const position = props?.position ?? new Animated.Value(0);

    return (
      <Animated.View
        style={[
          styles.toastContainer,
          styles.successBorder,
          {
            opacity: opacity,
            transform: [{ translateY: position }],
            backgroundColor: '#ECFDF5',
          },
        ]}
      >
        <View style={styles.iconWrapper}>
          <Icon name="check-circle-outline" size={28} color="#10B981" />
        </View>
        <View style={styles.textWrapper}>
          <Text style={styles.titleSuccess}>{text1}</Text>
          {text2 && <Text style={styles.message}>{text2}</Text>}
        </View>
      </Animated.View>
    );
  },

error: ({ text1, text2, props, ...rest }) => {
  const opacity = props?.opacity ?? new Animated.Value(1);
  const position = props?.position ?? new Animated.Value(0);

    return (
  <Animated.View
      style={[
        styles.toastContainer,
        styles.errorBorder,
        {
          opacity: opacity,
          transform: [{ translateY: position }],
          backgroundColor: '#FEF2F2',
        },
      ]}
    >
      <View style={styles.iconWrapper}>
        <Icon name="alert-circle-outline" size={28} color="#DC2626" />
      </View>
      <View style={styles.textWrapper}>
        <Text style={styles.titleError}>{text1}</Text>
        {text2 && <Text style={styles.message}>{text2}</Text>}
        {props?.showConfirm && (
          <TouchableOpacity
            onPress={props.onConfirm}
            style={styles.confirmButton}
          >
            <Text style={styles.confirmButtonText}>Confirm Delete</Text>
          </TouchableOpacity>
        )}
      </View>
    </Animated.View>
    );
  },
};

const styles = StyleSheet.create({
  toastContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 14,
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 12,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  iconWrapper: {
    marginRight: 12,
    marginTop: 2,
  },
  textWrapper: {
    flex: 1,
  },
  titleSuccess: {
    fontSize: 15,
    fontWeight: '700',
    color: '#065F46',
  },
  titleError: {
    fontSize: 15,
    fontWeight: '700',
    color: '#7F1D1D',
  },
  message: {
    fontSize: 13,
    color: '#4B5563',
    marginTop: 2,
  },
  successBorder: {
    borderLeftWidth: 4,
    borderLeftColor: '#10B981',
  },
  errorBorder: {
    borderLeftWidth: 4,
    borderLeftColor: '#EF4444',
  },
  confirmButton: {
  backgroundColor: '#DC2626',
  paddingVertical: 6,
  paddingHorizontal: 12,
  borderRadius: 6,
  marginTop: 8,
  alignSelf: 'flex-start',
},
confirmButtonText: {
  color: 'white',
  fontWeight: '600',
  fontSize: 14,
},
});
