import { useEffect, useState } from "react";
import {
  Alert,
  Dimensions,
  Image,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import TaskSections from "./src/components/TaskSections";
import DialogBox from "./src/components/DialogBox";
import Dialog from "react-native-popup-dialog";
import DatePicker, {
  getToday,
  getFormatedDate,
} from "react-native-modern-datepicker";

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
        created: new Date("2022-03-25"),
      },
      {
        taskName: "Task 10",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit erat, sed diam nonumy eirmod tempor",
        assignee: "Rookie",
        team: "Avengers",
        priority: "P0",
        created: new Date("2021-11-22"),
      },
      {
        taskName: "Task 12",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit erat, sed diam nonumy eirmod tempor",
        assignee: "Rookie",
        team: "Avengers",
        priority: "P0",
        created: new Date("2019-03-25"),
      },
      {
        taskName: "Task 31",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit erat, sed diam nonumy eirmod tempor",
        assignee: "Rookie",
        team: "Avengers",
        priority: "P0",
        created: new Date("2023-05-17"),
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
        created: new Date("2023-02-10"),
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
        created: new Date("2022-01-15"),
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
        created: new Date("2023-01-25"),
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
        created: new Date("2023-02-05"),
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
  const [sortBy, setSortBy] = useState("Priority");
  const [isSortByFocus, setIsSortByFocus] = useState(false);
  const [fromOpen, setFromOpen] = useState(false);
  const [toOpen, setToOpen] = useState(false);
  const [fromDate, setFromDate] = useState("yyyy/mm/dd");
  const [toDate, setToDate] = useState("yyyy/mm/dd");
  const today = new Date();

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

  useEffect(() => {
    const sortedList = defaultList.map((status) => {
      let sortedTasks = [...status.tasks];
      if (sortBy === "Priority") {
        sortedTasks.sort((a, b) => {
          const priorityOrder = { P0: 0, P1: 1, P2: 2 };
          return priorityOrder[a.priority] - priorityOrder[b.priority];
        });
      } else if (sortBy === "Start Date") {
        sortedTasks.sort((a, b) => a.created - b.created);
      } else if (sortBy === "End Date") {
        sortedTasks =
          status.title === "Completed"
            ? [...status.tasks].sort((a, b) => b.endDate - a.endDate)
            : [...status.tasks];
      }
      return { ...status, tasks: sortedTasks };
    });
    setTasksToDisplay(sortedList);
  }, [sortBy]);

  const prioritiesData = [
    { value: "1", label: "P0" },
    { value: "2", label: "P1" },
    { value: "3", label: "P2" },
  ];

  const sortByData = [
    { value: "1", label: "Priority" },
    { value: "2", label: "Start Date" },
    { value: "3", label: "End Date" },
  ];

  const openFromDate = () => {
    setFromOpen(true);
  };

  const openToDate = () => {
    setToOpen(true);
  };

  const handleFromChange = (propFromDate) => {
    setFromDate(propFromDate);
  };

  const handleToChange = (propToDate) => {
    setToDate(propToDate);
  };

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
    Alert.alert(
      `New task ${taskToCreate.taskName} has been created successfully`
    );
  };

  const editTask = (taskToEdit, newPriority, newStatus) => {
    // Delete the task from its current status
    console.log(taskToEdit, newPriority, newStatus);
    /* tasksToDisplay.forEach((status) => {
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
    Alert.alert(`${taskToEdit.taskName} has been edited successfully`); */
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
    Alert.alert(`${taskToDelete.taskName} has been deleted successfully`);
    setShowDialog(false);
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.nameAndUserContainer}>
        <Text style={styles.mainTitle}>Task Board</Text>
        <Image
          source={{
            uri: "https://cdn-icons-png.flaticon.com/512/9131/9131529.png",
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
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: "70%",
            marginBottom: 10,
          }}
        >
          <View
            style={
              ({
                flexDirection: "row",
                alignItems: "center",
              },
              styles.dateElements)
            }
          >
            <TouchableOpacity onPress={openFromDate}>
              <Text>{fromDate}</Text>
            </TouchableOpacity>
          </View>
          <Text style={{ marginHorizontal: 10, fontSize: 18 }}> -- </Text>
          <View
            style={
              ({
                flexDirection: "row",
                alignItems: "center",
              },
              styles.dateElements)
            }
          >
            <TouchableOpacity onPress={openToDate}>
              <Text>{toDate}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.filterByText}>Sort By: </Text>
        <Dropdown
          style={[styles.dropdown, isSortByFocus && { borderColor: "blue" }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          data={sortByData}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={sortBy ? sortBy : "Priority"}
          value={sortBy}
          onFocus={() => setIsSortByFocus(true)}
          onBlur={() => setIsSortByFocus(false)}
          onChange={(item) => {
            setSortBy(item.label);
            setIsSortByFocus(false);
          }}
        />
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
        <Modal animationType="slide" transparent visible={fromOpen}>
          <View style={styles.dateModal}>
            <DatePicker
              mode="calendar"
              selected={fromDate}
              onDateChange={handleFromChange}
            />
            <TouchableOpacity onPress={() => setFromOpen(false)}>
              <Text style={{ fontSize: 14 }}>Close</Text>
            </TouchableOpacity>
          </View>
        </Modal>
        <Modal animationType="slide" transparent visible={toOpen}>
          <View style={styles.dateModal}>
            <DatePicker
              mode="calendar"
              selected={toDate}
              onDateChange={handleToChange}
              minimumDate={fromDate}
            />
            <TouchableOpacity onPress={() => setToOpen(false)}>
              <Text style={{ fontSize: 14 }}>Close</Text>
            </TouchableOpacity>
          </View>
        </Modal>
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
  dateModal: {
    marginTop: "50%",
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    shadowColor: "#171717",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 3,
    width: "90%",
    padding: 35,
    alignItems: "center",
  },
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
    paddingBottom: 130,
  },
  filteringSections: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    paddingLeft: "1vw",
    paddingRight: "1.5vw",
  },
  filterByText: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
  },
  filtersContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 13,
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
  dateElements: {
    backgroundColor: "white",
    padding: 10,
    paddingHorizontal: 15,
    borderRadius: 6,
    fontSize: 16,
    height: 42,
    shadowColor: "#171717",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    color: "gray",
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
