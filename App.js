import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TodoApp from './components/todo'; // Adjust the path if necessary

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ToDoList">
        <Stack.Screen name="ToDoList" component={TodoApp} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
