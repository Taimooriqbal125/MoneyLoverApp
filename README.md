# 💰 .moneylover – Expense Tracker App

A simple and modern **React Native** app to track your daily expenses with beautiful UI, charts, category-wise filtering, and Google Sign-In support.

---

## 📸 Demo

## 📱 App Demo

<img src="https://github.com/user-attachments/assets/0ef18169-4fd5-485c-8e87-08b53e3d5cc3" alt="App Demo" width="200"/>



## 🛠️ Tech Stack

- **React Native** (v0.80.1)
- **Firebase** (Auth & Firestore)
- **Redux Toolkit** for state management
- **React Navigation** for smooth routing
- **Google Sign-In** integration

---

## 📦 Packages Used

| Package | Usage |
|--------|-------|
| `@react-native-firebase/app` | Firebase core config |
| `@react-native-firebase/auth` | Firebase Authentication |
| `@react-native-firebase/firestore` | Firestore DB for storing expenses |
| `@react-native-google-signin/google-signin` | Google login support |
| `@reduxjs/toolkit` | State management |
| `react-redux` | Connect Redux to components |
| `@react-navigation/native` & stacks | Navigation structure |
| `@react-native-community/datetimepicker` | Native date picker |
| `react-native-toast-message` | Toast notifications |
| `react-native-vector-icons` | Icons |
| `react-native-gifted-charts` | Expense charts |
| `react-native-linear-gradient` | Gradient UI |
| `react-native-element-dropdown` | Stylish dropdowns |
| `react-native-svg` & `svg-transformer` | Chart rendering |
| `react-native-safe-area-context` | Safe area support |
| `react-native-gesture-handler` & `react-native-screens` | Navigation gestures |
| `@react-native/new-app-screen` | App initialization UI |

---

## 🚀 Features

- 🔐 Secure Google Sign-In
- 📊 Category-wise analytics with charts
- 🧾 Expense logging with date & type
- 📆 Date picker to filter expenses
- 📤 Real-time sync with Firebase Firestore

---

## 🧪 Setup

```bash
git clone https://github.com/yourusername/moneylover.git
cd moneylover
npm install
npx react-native run-android # or run-ios
