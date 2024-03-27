import { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import TaskSections from "./src/components/TaskSections";
import DateTimePicker from "@react-native-community/datetimepicker";
import DialogBox from "./src/components/DialogBox";
import Dialog from "react-native-popup-dialog";

export let defaultList = [
  {
    title: "Pending",
    color: "gray",
    tasks: [
      {
        taskName: "Task 1",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit erat, sed diam nonumy eirmod tempor",
        assignee: "Rookie",
        team: "Avengers",
        priority: "P0",
        created: new Date("December 17, 2023 00:00:00"),
      },
      {
        taskName: "Task 10",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit erat, sed diam nonumy eirmod tempor",
        assignee: "Rookie",
        team: "Avengers",
        priority: "P0",
        created: new Date("December 17, 2023 00:00:00"),
      },
      {
        taskName: "Task 12",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit erat, sed diam nonumy eirmod tempor",
        assignee: "Rookie",
        team: "Avengers",
        priority: "P0",
        created: new Date("December 17, 2023 00:00:00"),
      },
      {
        taskName: "Task 31",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit erat, sed diam nonumy eirmod tempor",
        assignee: "Rookie",
        team: "Avengers",
        priority: "P0",
        created: new Date("December 17, 2023 00:00:00"),
      },
    ],
  },
  {
    title: "In Progress",
    color: "orange",
    tasks: [
      {
        taskName: "Task 2",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit erat, sed diam nonumy eirmod tempor",
        assignee: "Sampreet",
        team: "Progressers",
        priority: "P1",
        created: new Date("January 10, 2024 00:00:00"),
      },
    ],
  },
  {
    title: "Completed",
    color: "green",
    tasks: [
      {
        taskName: "Task 3",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit erat, sed diam nonumy eirmod tempor",
        assignee: "Sampreet",
        team: "Completers",
        priority: "P0",
        created: new Date("Feb 14, 2024 00:00:00"),
      },
    ],
  },
  {
    title: "Deployed",
    color: "blue",
    tasks: [
      {
        taskName: "Task 4",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit erat, sed diam nonumy eirmod tempor",
        assignee: "Sampreet",
        team: "Deployers",
        priority: "P2",
        created: new Date("March 05, 2024 00:00:00"),
      },
    ],
  },
  {
    title: "Deferred",
    color: "pink",
    tasks: [
      {
        taskName: "Task 5",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit erat, sed diam nonumy eirmod tempor",
        assignee: "Sampreet",
        team: "Deferrers",
        priority: "P2",
        created: new Date("Feb 01, 2024 00:00:00"),
      },
    ],
  },
];
export default function App() {
  const [tasksToDisplay, setTasksToDisplay] = useState([...defaultList]);
  const [showDialog, setShowDialog] = useState(false);
  const [currentTitle, setCurrentTitle] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [dialogType, setDialogType] = useState("");
  const [nameFilter, setNameFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const [isPriorityFocus, setIsPriorityFocus] = useState(false);

  useEffect(() => {
    const filteredList = defaultList.map((status) => {
      return {
        ...status,
        tasks: status.tasks.filter(
          (task) =>
            task.assignee.toLowerCase().includes(nameFilter.toLowerCase()) &&
            task.priority.toLowerCase().includes(priorityFilter.toLowerCase())
        ),
      };
    });
    setTasksToDisplay(filteredList);
  }, [nameFilter, priorityFilter]);

  const prioritiesData = [
    { value: "1", label: "P0" },
    { value: "2", label: "P1" },
    { value: "3", label: "P2" },
  ];

  const handleDialogOps = (value, task, title) => {
    setCurrentTitle(title);
    setSelectedTask(task);
    setShowDialog(true);
    if (value === "edit") {
      setDialogType("edit");
    } else if (value === "delete") {
      setDialogType("delete");
    } else if (value === "add") {
      setDialogType("add");
    }
  };

  const closeDialog = () => {
    setShowDialog(false);
  };

  const createNewTask = (taskToCreate) => {
    const isTaskExists = defaultList[0].tasks.some(
      (task) => task.taskName === taskToCreate.taskName
    );

    if (isTaskExists) {
      Alert.alert("Task with the same name already exists!");
    } else {
      taskToCreate.created = new Date();
      defaultList[0].tasks.push(taskToCreate);
      setTasksToDisplay(defaultList);
      setShowDialog(false);
    }
    Alert.alert(`New task ${taskToCreate.taskName} is created successfully`);
  };

  const editTask = (taskToEdit, newPriority, newStatus) => {
    // Delete the task from its current status
    tasksToDisplay.forEach((status) => {
      if (status.title === currentTitle) {
        status.tasks = status.tasks.filter(
          (task) => task.taskName !== taskToEdit.taskName
        );
      }
    });
    // Create the edited task object
    const editedTask = {
      taskName: taskToEdit.taskName,
      description: taskToEdit.description,
      assignee: taskToEdit.assignee,
      team: taskToEdit.team,
      priority: newPriority,
      created: taskToEdit.created,
    };
    if (newStatus === "Completed") {
      editedTask.endDate = new Date();
    }
    // Find the status to which the task should be added
    const newStatusIndex = tasksToDisplay.findIndex(
      (status) => status.title === newStatus
    );
    if (newStatusIndex !== -1) {
      tasksToDisplay[newStatusIndex].tasks.push(editedTask);
    }
    Alert.alert(`${taskToEdit.taskName} deleted successfully`);
    setShowDialog(false);
  };

  const deleteTask = (taskToDelete) => {
    tasksToDisplay.forEach((status) => {
      if (status.title === currentTitle) {
        status.tasks = status.tasks.filter(
          (task) => task.taskName !== taskToDelete.taskName
        );
      }
    });
    Alert.alert(`${taskToDelete.taskName} deleted successfully`);
    setShowDialog(false);
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.nameAndUserContainer}>
        <Text style={styles.mainTitle}>Task Board</Text>
        <Image
          source={{
            uri: "https://cdn-icons-png.flaticon.com/512/666/666201.png",
          }}
          alt="userLogo"
          style={styles.userIcon}
        />
      </View>
      <View style={styles.tasksContainer}>
        <Text style={styles.filterByText}>Filter By: </Text>
        <View style={styles.filtersContainer}>
          <TextInput
            type="text"
            style={styles.inputBox}
            placeholder="Assignee"
            value={nameFilter}
            onChangeText={setNameFilter}
            placeholderTextColor={"gray"}
          />
          <Dropdown
            style={[
              styles.dropdown,
              isPriorityFocus && { borderColor: "blue" },
            ]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            data={prioritiesData}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={priorityFilter ? priorityFilter : "Priority"}
            value={priorityFilter}
            onFocus={() => setIsPriorityFocus(true)}
            onBlur={() => setIsPriorityFocus(false)}
            onChange={(item) => {
              setPriorityFilter(item.label);
              setIsPriorityFocus(false);
            }}
          />
        </View>
        <TouchableOpacity
          onPress={() => {
            setNameFilter("");
            setPriorityFilter("");
          }}
        >
          <Text style={styles.clearFilters}>Clear filters</Text>
        </TouchableOpacity>
        <TaskSections
          tasksList={tasksToDisplay}
          handleDialogOps={handleDialogOps}
          closeDialog={closeDialog}
          addTask={createNewTask}
        />
        <TouchableOpacity onPress={() => handleDialogOps("add")}>
          <View style={styles.addTaskContainer}>
            <Text style={styles.addNewTask}>Add new task</Text>
          </View>
        </TouchableOpacity>
      </View>
      <Dialog visible={showDialog} width={400} height={800}>
        <DialogBox
          value={dialogType}
          task={selectedTask}
          title={currentTitle}
          closeDialog={closeDialog}
          addTask={createNewTask}
          editTask={editTask}
          deleteTask={deleteTask}
          prioritiesData={prioritiesData}
        />
      </Dialog>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    width: Dimensions.get("screen").width,
    height: Dimensions.get("screen").height,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingTop: "20%",
  },
  nameAndUserContainer: {
    display: "flex",
    flexDirection: "row",
    width: "90%",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  mainTitle: {
    fontSize: 30,
    color: "black",
    fontWeight: "600",
  },
  userIcon: {
    width: 36,
    height: 36,
  },
  tasksContainer: {
    width: "90%",
    borderRadius: 10,
    borderWidth: 4,
    borderColor: "white",
    height: "90%",
    padding: 10,
    paddingBottom: 60,
  },
  filteringSections: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    paddingLeft: "1vw",
    paddingRight: "1.5vw",
  },
  filterByText: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 10,
  },
  filtersContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  inputBox: {
    backgroundColor: "white",
    width: "60%",
    padding: 10,
    borderRadius: 5,
    fontSize: 16,
    height: 42,
    shadowColor: "#171717",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
  },
  dropdown: {
    width: "38%",
    height: 42,
    borderRadius: 5,
    paddingHorizontal: 8,
    backgroundColor: "white",
    marginHorizontal: 5,
    shadowColor: "#171717",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
    color: "gray",
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  datePickerContainer: {
    width: "100%",
    marginTop: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  dateButtons: {
    backgroundColor: "white",
    borderRadius: 5,
    height: 38,
    width: "40%",
    color: "silver",
  },
  inputBoxDates: {
    backgroundColor: "white",
    padding: "0.5vw",
    outline: "none",
    border: "none",
    borderRadius: 5,
    fontSize: "1%",
    width: "8vw",
    margin: 0,
  },
  dateContainer: {
    backgroundColor: "white",
    borderRadius: 5,
    width: "max-content",
    fontSize: "1%",
    display: "flex",
    alignItems: "center",
    padding: "1px 10px",
    marginLeft: "1vw",
    marginRight: "1vw",
  },
  clearIcon: {
    margin: 0,
    fontSize: "0.8%",
    marginLeft: "-0.5vw",
    marginTop: "1.4%",
    cursor: "pointer",
  },
  clearFilters: {
    color: "#0052CC",
    fontSize: 14,
    marginVertical: 10,
    fontWeight: "600",
    alignSelf: "flex-end",
  },
  addTaskContainer: {
    backgroundColor: "#0052CC",
    width: "86%",
    padding: 10,
    borderRadius: 8,
    alignSelf: "center",
    shadowColor: "#171717",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 5,
  },
  addNewTask: {
    color: "#fff",
    fontSize: 18,
    textTransform: "none",
    textAlign: "center",
  },
  sortBySection: {
    display: "flex",
    alignItems: "center",
  },
});
