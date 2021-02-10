import React, { useState, useEffect, useLayoutEffect } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Text,
  BackHandler,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import {
  getNotes,
  unCheckNotes,
  editNote,
  deleteNote,
} from "../../store/actions/Memo";

import NoteCard from "../../components/NoteCard";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";
import CheckBox from "@react-native-community/checkbox";
import { HeaderBackButton } from "@react-navigation/stack";

const MemoList = (props) => {
  const [checkBoxVisible, setCheckBoxVisible] = useState(false);

  const notes = useSelector((state) => state.notesReducer);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  useEffect(() => {
    setTimeout(() => {
      dispatch(unCheckNotes());
      dispatch(getNotes());
    }, 100);
  }, []);

  useEffect(() => {
    if (notes != null && notes.length == 0) {
      setCheckBoxVisible(false);
    }
  }, [notes]);

  useEffect(() => {
    dispatch(getNotes());
    props.navigation.setOptions({
      title: checkBoxVisible ? "Selectează notițe" : "Notițe",
      headerTitleAlign: "center",
      headerTintColor: "white",
      headerStyle: {
        backgroundColor: "orange",
      },
      headerLeft: () => (
        <HeaderBackButton
          onPress={() => {
            if (checkBoxVisible) {
              setCheckBoxVisible(false);
              dispatch(unCheckNotes());
            } else {
              props.navigation.navigate("GameFieldsScreen");
            }
          }}
          tintColor="white"
        />
      ),
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            if (checkBoxVisible) {
              dispatch(deleteNote());
              dispatch(getNotes());
            } else {
              props.navigation.navigate("AddNote");
            }
          }}
          style={{ marginRight: 15 }}
        >
          {checkBoxVisible ? (
            <AntDesign name="delete" size={24} color="white" />
          ) : (
            <MaterialIcons name="playlist-add" size={27} color="white" />
          )}
        </TouchableOpacity>
      ),
    });

    if (!isFocused) {
      setCheckBoxVisible(false);
      dispatch(unCheckNotes());
    }

    const backButtonHandler = () => {
      if (checkBoxVisible == true) {
        setCheckBoxVisible(false);
        dispatch(unCheckNotes());

        return true;
      } else {
        return false;
      }
    };
    BackHandler.addEventListener("hardwareBackPress", backButtonHandler);
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", backButtonHandler);
    };
  }, [isFocused, checkBoxVisible]);

  const Item = (itemData) => {
    return (
      <NoteCard
        onLongPress={() => {
          setCheckBoxVisible(true);
          dispatch(
            editNote(
              itemData.item.id,
              itemData.item.title,
              itemData.item.text,
              true
            )
          );
          // dispatch(getNotes());
        }}
        onPress={() => {
          props.navigation.navigate("AddNote", {
            id: itemData.item.id,
            title: itemData.item.title,
            text: itemData.item.text,
          });
        }}
        title={itemData.item.title}
        text={itemData.item.text}
      >
        <CheckBox
          style={
            checkBoxVisible
              ? { display: "flex", opacity: 1 }
              : { display: "none", opacity: 0 }
          }
          disabled={false}
          value={itemData.item.isChecked}
          onValueChange={() => {
            dispatch(
              editNote(
                itemData.item.id,
                itemData.item.title,
                itemData.item.text,
                (itemData.item.isChecked = !itemData.item.isChecked)
              )
            );
            dispatch(getNotes());
          }}
        />
      </NoteCard>
    );
  };

  if (notes != null && notes.length == 0) {
    return (
      <View style={styles.mainContainerText}>
        <Text style={styles.text}>Nu ai nici o notiță!</Text>
      </View>
    );
  }

  return (
    <View style={styles.mainContainer}>
      <FlatList
        data={notes}
        renderItem={Item}
        keyExtractor={(item) => item.id}
        numColumns={1}
      />
    </View>
  );
};

// export const screenOptions = (navData) => {
//   const notes = useSelector((state) => state.notesReducer);
//   const isSelected = notes.some((e) => e.isChecked === true);

//   return {
//     title: isSelected ? "Selectează notițe" : "Notițe",
//     headerTitleAlign: "center",
//     headerTintColor: "white",
//     headerStyle: {
//       backgroundColor: "orange",
//     },
// headerLeft: () => (
//   <HeaderBackButton
//     onPress={() => {
//       if (isSelected) {
//         dispatch(unCheckNotes());
//         dispatch(getNotes());
//       } else {
//         navData.navigation.navigate("GameFieldsScreen");
//       }
//     }}
//     tintColor="white"
//   />
// ),
// headerRight: () => (
//   <TouchableOpacity
//     onPress={() =>
//       isSelected
//         ? dispatch(deleteNote())
//         : navData.navigation.navigate("AddNote")
//     }
//     style={{ marginRight: 15 }}
//   >
//     {isSelected ? (
//       <AntDesign name="delete" size={24} color="white" />
//     ) : (
//       <MaterialIcons name="playlist-add" size={27} color="white" />
//     )}
//   </TouchableOpacity>
// ),
//   };
// };

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "#f2f2f2",
    alignItems: "center",
  },
  mainContainerText: {
    backgroundColor: "#f2f2f2",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 25,
    color: "#8c8c8c",
  },
  headerDeleteCheckBoxContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default MemoList;
