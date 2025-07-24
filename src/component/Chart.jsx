import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PieChart } from 'react-native-gifted-charts';

const Chart = ({ expenses = [], showEmptyMessage = true }) => {
  // 1. Safely transform data
  const generatePieData = (expenses) => {
    const categoryTotals = expenses.reduce((acc, expense) => {
      const category = expense.category?.toLowerCase() || 'other';
      acc[category] = (acc[category] || 0) + (expense.amount || 0);
      return acc;
    }, {});

    const categoryConfig = {
      food: { color: '#3110c5ff', gradient: '#006DFF', label: 'Food' },
      transport: { color: '#1be8e1ff', gradient: '#3BE9DE', label: 'Transport' },
      shopping: { color: '#BDB2FA', gradient: '#8F80F3', label: 'Shopping' },
      other: { color: '#FFA5BA', gradient: '#FF7F97', label: 'Other' }
    };

    return Object.entries(categoryConfig).map(([key, config]) => ({
      value: categoryTotals[key] || 0,
      color: config.color,
      gradientCenterColor: config.gradient,
      focused: key === 'food',
      label: config.label
    })).filter(item => item.value > 0);
  };

  const pieData = generatePieData(expenses);
  const totalExpenses = pieData.reduce((sum, item) => sum + item.value, 0);

  // 2. Handle empty state
  if (pieData.length === 0 && showEmptyMessage) {
    return (
      <View style={[styles.container, styles.emptyContainer]}>
        <Text style={styles.emptyText}>No expenses found for this category</Text>
      </View>
    );
  }

  // 3. Render chart
  return (
    <View style={styles.container}>
      <PieChart
        data={pieData}
        donut
        showGradient
        radius={90}
        innerRadius={60}
        innerCircleColor="#232B5D"
        centerLabelComponent={() => (
          <View style={{ alignItems: 'center' }}>
            <Text style={{ color: 'white', fontSize: 16 }}>Total</Text>
            <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>
              PKR {totalExpenses || 0}
            </Text>
          </View>
        )}
      />
      
      {/* Legend */}
      <View style={styles.legendContainer}>
        {pieData.map((item, index) => (
          <View key={index} style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: item.color }]} />
            <Text style={styles.legendText}>
              {item.label}: PKR {item.value}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#6495ED',
    padding: 10,
    borderRadius: 25,
    marginVertical: 10
  },
  emptyContainer: {
    justifyContent: 'center',
    height: 200
  },
  emptyText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center'
  },
  legendContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 20
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 8,
    marginVertical: 4
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6
  },
  legendText: {
    marginLeft: 5,
    color: 'black',
    fontSize: 12
  }
});

export default Chart;