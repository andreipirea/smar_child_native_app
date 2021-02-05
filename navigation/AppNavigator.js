import React from "react";
import { Button, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

import { SimpleLineIcons } from "@expo/vector-icons";

import HomeScreen from "../screens/HomeScreen";
import GameFieldsScreen from "../screens/GuessGame/GameFieldsScreen";
import PlayGameScreen from "../screens/GuessGame/PlayGameScreen";
import GameOverScreen from "../screens/GuessGame/GameOverScreen";
import LostGameScreen from "../screens/GuessGame/LostGameScreen";
import MemoList, {screenOptions} from "../screens/Memo/MemoList";
import AddNote, {addNoteScreenOptions} from "../screens/Memo/AddNote";
import Colors from "../constants/colors";

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

const GuessGameStack = (props) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="GameFieldsScreen"
        component={GameFieldsScreen}
        options={{
          title: "Seteaza jocul",
          headerTitleAlign: "center",
          headerTintColor: "white",
          // headerShown: false,
          headerStyle: {
            backgroundColor: "green",
          },
        }}
      />
      <Stack.Screen
        name="PlayGameScreen"
        component={PlayGameScreen}
        options={{
          title: "Ghicește cuvântul",
          headerTitleAlign: "center",
          headerTintColor: "white",
          // headerShown: false,
          headerStyle: {
            backgroundColor: "green",
          },
        }}
      />
      <Stack.Screen
        name="GameOverScreen"
        component={GameOverScreen}
        options={{
          title: "",
          headerTitleAlign: "left",
          headerTintColor: "white",
          headerShown: false,
          headerStyle: {
            backgroundColor: "green",
          },
        }}
      />
      <Stack.Screen
        name="LostGameScreen"
        component={LostGameScreen}
        options={{
          title: "",
          headerTitleAlign: "left",
          headerTintColor: "white",
          headerShown: false,
          headerStyle: {
            backgroundColor: "green",
          },
        }}
      />
    </Stack.Navigator>
  );
};

const MemoListStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MemoList"
        component={MemoList}
        // options={screenOptions}
      />
      <Stack.Screen 
        name="AddNote"
        component={AddNote}
        options={addNoteScreenOptions}
      />
    </Stack.Navigator>
  );
};

const GuessGameTab = () => {
  return (
    <Tab.Navigator shifting={true}>
      <Tab.Screen
        name="GuessGameStack"
        component={GuessGameStack}
        options={{
          tabBarLabel: "Ghicește cuvântul",
          tabBarColor: "green",
          tabBarIcon: ({ color }) => {
            return <SimpleLineIcons name="book-open" size={24} color={color} />;
          },
        }}
      />

      <Tab.Screen
        name="MemoListStack"
        component={MemoListStack}
        options={{
          tabBarColor: "orange",
          tabBarLabel: "Memo",
          tabBarIcon: ({ color }) => {
            return <SimpleLineIcons name="notebook" size={24} color={color} />;
          },
        }}
      />
    </Tab.Navigator>
  );
};

const AppNavigator = (props) => {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{
            title: "Incepe joaca!",
            headerTitleAlign: "center",
            headerTintColor: "white",
            headerShown: false,
            headerStyle: {
              backgroundColor: "#2980c5",
            },
          }}
        />
        <Stack.Screen name="GuessGameTab" component={GuessGameTab} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
