import React from 'react';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Home from './src/screen/Home';
import EduDetailsList from './src/screen/EduDetailsList';
import Login from './src/auth/Login';
import SignUp from './src/auth/SignUp';

const Stack = createStackNavigator();

function App() {
  return (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="EduDetailsList" component={EduDetailsList} />
    </Stack.Navigator>
  </NavigationContainer>
  );
}

export default App;