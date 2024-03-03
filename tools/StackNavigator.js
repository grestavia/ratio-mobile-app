import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Library';
import DetailPost from '../screens/DetailPost';

const Stack = createStackNavigator();

export const LibraryStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Library" component={Home} />
            <Stack.Screen name="DetailPost" component={DetailPost} />
        </Stack.Navigator>
    );
};
