import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Beranda';
import DetailPost from '../screens/DetailPost';

const Stack = createStackNavigator();

export const PostStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Post" component={Home} />
            <Stack.Screen name="DetailPost" component={DetailPost} />
        </Stack.Navigator>
    );
};
