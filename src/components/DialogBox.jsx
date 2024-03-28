import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Button,
} from "react-native";
import React, { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { Dropdown } from "react-native-element-dropdown";
import KeyBoardView from "./KeyboardHandlerView";

const DialogBox = ({
  value,
  task,
  title,
  closeDialog,
  addTask,
  editTask,
  deleteTask,
  prioritiesData,
}) => {
  const statusesList = [
    {
      value: 1,
      label: "Pending",
    },
    {
      value: 2,
      label: "In Progress",
    },
    {
      value: 3,
      label: "Completed",
    },
    {
      value: 4,
      label: "Deployed",
    },
    {
      value: 5,
      label: "Deferred",
    },
  ];
  const [newTaskDetails, setNewTaskDetails] = useState({
    taskName: "",
    description: "",
    team: "",
    assignee: "",
    priority: "",
  });
  const [editingPriority, setEditingPriority] = useState(
    task ? task.priority : ""
  );
  const [editingTitle, setEditingTitle] = useState(title);
  const [isPriorityFocus, setIsPriorityFocus] = useState(false);
  const [isStatusFocus, setIsStatusFocus] = useState(false);

  const handleInputChange = (text, field) => {
    setNewTaskDetails({
      ...newTaskDetails,
      [field]: text,
    });
  };

  const getAddTaskDialog = () => {
    return (
      <KeyBoardView>
        <View
          style={{
            padding: 10,
            paddingHorizontal: 20,
            backgroundColor: "white",
          }}
        >
          <View style={styles.headerAndClose}>
            <Text style={styles.dialogHeader}>CREATE TASK</Text>
            <AntDesign
              name="close"
              size={24}
              color="black"
              onPress={closeDialog}
            />
          </View>
          <Text style={styles.label}>Title:</Text>
          <TextInput
            style={styles.dialogInputs}
            value={newTaskDetails.title}
            onChangeText={(text) => handleInputChange(text, "taskName")}
          />
          <Text style={styles.label}>Description:</Text>
          <TextInput
            style={[styles.dialogInputs, { height: 100 }]} // Adjust height as needed
            multiline
            value={newTaskDetails.description}
            onChangeText={(text) => handleInputChange(text, "description")}
          />
          <Text style={styles.label}>Team:</Text>
          <TextInput
            style={styles.dialogInputs}
            value={newTaskDetails.team}
            onChangeText={(text) => handleInputChange(text, "team")}
          />
          <Text style={styles.label}>Assignee:</Text>
          <TextInput
            style={styles.dialogInputs}
            value={newTaskDetails.assignee}
            onChangeText={(text) => handleInputChange(text, "assignee")}
          />
          <Text style={[styles.label, { marginTop: 10 }]}>Priority:</Text>
          <Dropdown
            style={[
              styles.dialogInputs,
              isPriorityFocus && { borderColor: "blue" },
            ]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            data={prioritiesData}
            labelField="label"
            valueField="value"
            placeholder="Choose priority"
            value={newTaskDetails.priority}
            onFocus={() => setIsPriorityFocus(true)}
            onBlur={() => setIsPriorityFocus(false)}
            onChange={(item) => {
              handleInputChange(item.label, "priority");
              setIsPriorityFocus(false);
            }}
          />
          <Button title="Create Task" onPress={() => addTask(newTaskDetails)} />
        </View>
      </KeyBoardView>
    );
  };

  const getEditTaskDialog = () => {
    return (
      <KeyBoardView>
        <View
          style={{
            padding: 10,
            paddingHorizontal: 20,
            backgroundColor: "white",
          }}
        >
          <View style={styles.headerAndClose}>
            <Text style={styles.dialogHeader}>EDIT TASK</Text>
            <AntDesign
              name="close"
              size={24}
              color="black"
              onPress={closeDialog}
            />
          </View>
          <View style={styles.dialogContent}>
            <Text style={styles.label}>Title:</Text>
            <TextInput
              style={[styles.dialogInputs, styles.readOnly]}
              value={task.taskName}
              readOnly
            />
            <Text style={styles.label}>Description:</Text>
            <TextInput
              style={[[styles.dialogInputs, styles.readOnly], { height: 100 }]}
              value={task.description}
              readOnly
              multiline
            />
            <Text style={styles.label}>Team:</Text>
            <TextInput
              style={[styles.dialogInputs, styles.readOnly]}
              value={task.team}
              readOnly
            />
            <Text style={styles.label}>Assignee:</Text>
            <TextInput
              style={[styles.dialogInputs, styles.readOnly]}
              value={task.assignee}
              readOnly
            />
            <Text style={styles.label}>Priority:</Text>
            <Dropdown
              style={[
                styles.dialogInputs,
                isPriorityFocus && { borderColor: "blue" },
              ]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              data={prioritiesData}
              labelField="label"
              valueField="value"
              placeholder={task.priority}
              value={editingPriority}
              onFocus={() => setIsPriorityFocus(true)}
              onBlur={() => setIsPriorityFocus(false)}
              onChange={(item) => {
                setEditingPriority(item.value);
                setIsPriorityFocus(false);
              }}
            />
            <Text style={styles.label}>Status:</Text>
            <Dropdown
              style={[
                styles.dialogInputs,
                isStatusFocus && { borderColor: "blue" },
              ]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              data={statusesList}
              labelField="label"
              valueField="value"
              placeholder={title}
              value={editingTitle}
              onFocus={() => setIsStatusFocus(true)}
              onBlur={() => setIsStatusFocus(false)}
              onChange={(item) => {
                setEditingTitle(item.value);
                setIsStatusFocus(false);
              }}
            />
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={() => editTask(task, editingPriority, editingTitle)}
            >
              <View style={styles.addTaskContainer}>
                <Text style={styles.addNewTask}>Submit</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setEditingPriority(task.priority);
                setEditingTitle(title);
              }}
            >
              <View style={styles.addTaskContainer}>
                <Text style={styles.addNewTask}>Reset</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </KeyBoardView>
    );
  };

  const getDeleteTaskDialog = () => {
    return (
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          flex: 1,
          paddingBottom: 20,
        }}
      >
        <View style={styles.headerAndClose}>
          <Text style={styles.dialogHeader}>DELETE TASK</Text>
          <AntDesign
            name="close"
            size={24}
            color="black"
            onPress={closeDialog}
          />
        </View>
        <Text style={{ fontSize: 20, padding: 20 }}>
          Do you wish to delete{" "}
          <Text style={{ fontWeight: "bold", fontSize: 26 }}>
            {task.taskName}
          </Text>
        </Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={() => deleteTask(task)}>
            <View style={styles.addTaskContainer}>
              <Text style={styles.addNewTask}>Yes</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={closeDialog}>
            <View style={styles.addTaskContainer}>
              <Text style={styles.addNewTask}>No</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  if (value === "edit") {
    return getEditTaskDialog();
  } else if (value === "delete") {
    return getDeleteTaskDialog();
  } else if (value === "add") {
    return getAddTaskDialog();
  }
};
export default DialogBox;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  headerAndClose: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 25,
    paddingHorizontal: "4%",
  },
  dialogHeader: {
    margin: 0,
    fontSize: 24,
    fontWeight: "600",
    flexGrow: 1,
    // Adjust font size according to your requirement
  },
  closeIcon: {
    fontSize: 24, // Adjust font size according to your requirement
    cursor: "pointer",
  },
  closeIconHover: {
    backgroundColor: "red",
    color: "white",
    borderRadius: 50,
  },
  dialogContent: {
    width: "100%",
    height: "75%",
    paddingVertical: "2%",
    paddingHorizontal: "4%",
    flex: 1,
    flexDirection: "column",
    backgroundColor: "transparent", // Since linear gradient is applied separately
  },
  label: {
    marginTop: 14,
    marginBottom: 2,
    fontSize: 18, // Adjust font size according to your requirement
    marginRight: "0.5%",
  },
  dialogInputs: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
    width: "100%",
    height: 50,
    padding: 10,
    fontSize: 16,
    marginBottom: 20,
  },
  readOnly: {
    backgroundColor: "#c0c0c04a",
    color: "gray",
  },
  placeholderStyle: {
    fontSize: 16,
    color: "gray",
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  buttonContainer: {
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
    alignSelf: "center",
    marginVertical: "10%",
  },
  addTaskContainer: {
    backgroundColor: "#0052CC",
    width: 300,
    padding: 10,
    borderRadius: 8,
    alignSelf: "center",
    shadowColor: "#171717",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 5,
    marginVertical: 10,
  },
  addNewTask: {
    color: "#fff",
    fontSize: 18,
    textTransform: "none",
    textAlign: "center",
  },
});
