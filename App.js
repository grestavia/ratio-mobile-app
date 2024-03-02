import Library from "./screens/Library";
import Albums from "./screens/Albums";
import ForYou from "./screens/ForYou";
import Search from "./screens/Search";
import { Icon } from 'react-native-elements'
import { Text, Platform, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

// Variabel untuk menyimpan style yang sama
const tabIconStyle = {
  alignItems: "center",
  justifyContent: "center",
};

const tabIconBackground = (focused) => ({
  backgroundColor: focused ? "#D9EDC8" : "",
  width: 60,
  paddingVertical: 3,
  borderRadius: 50,
});

const tabTextStyle = (focused) => ({
  color: focused ? "#003502" : "#444746",
});

const screenOptions = {
  tabBarShowLabel: false,
  headerShown: false,
  tabBarStyle: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    elevation: 0,
    backgroundColor: "#F3FCF6",
    height: 80,
  },
};

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={screenOptions}>
        <Tab.Screen
          name="Library"
          options={{
            tabBarIcon: ({ focused }) => {
              return (
                <View style={tabIconStyle}>
                  <Icon
                    size={25}
                    style={[tabIconBackground(focused)]}
                    name="photo-library"
                    type="material"
                    color={focused ? "#003502" : "#444746"}
                  />
                  <Text style={tabTextStyle}>Beranda</Text>
                </View>
              );
            },
          }}
          component={Library}
        />
        <Tab.Screen
          name="For You"
          options={{
            tabBarIcon: ({ focused }) => {
              return (
                <View style={tabIconStyle}>
                  <Icon
                    size={25}
                    style={[tabIconBackground(focused)]}
                    name="wallet"
                    type="material"
                    color={focused ? "#003502" : "#444746"}
                  />
                  <Text style={tabTextStyle}>Dompet</Text>
                </View>
              );
            },
          }}
          component={ForYou}
        />
        <Tab.Screen name="Albums" component={Albums} />
        <Tab.Screen name="Search" component={Search} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
