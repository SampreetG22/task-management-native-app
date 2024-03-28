import { View, Text, StyleSheet, ScrollView } from "react-native";
import React from "react";

const TasksSections = ({ tasksList, handleDialogOps }) => {
  return (
    <View style={styles.allTasksCategories}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        nestedScrollEnabled
      >
        {tasksList.map((each, index) => (
          <View key={index} style={styles.eachTasksSection}>
            <View style={[styles.titleContainer, styles[each.color]]}>
              <Text style={styles.cardTitle}>{each.title}</Text>
            </View>
            <ScrollView style={{ flex: 1 }}>
              {each.tasks.length > 0 ? (
                each.tasks.map((task, index) => (
                  <View key={index} style={styles.eachTaskContainer}>
                    <View style={styles.taskNameAndPriority}>
                      <Text style={styles.tasksName}>{task.taskName}</Text>
                      <Text style={styles.priority}>{task.priority}</Text>
                    </View>
                    <Text style={styles.description}>{task.description}</Text>
                    <View style={styles.assigneeAndOptions}>
                      <Text style={styles.assignee}>@{task.assignee}</Text>
                      <View style={styles.editAndDelete}>
                        <Text
                          style={styles.options}
                          onPress={() =>
                            handleDialogOps("edit", task, each.title)
                          }
                        >
                          Edit
                        </Text>
                        {each.title !== "Completed" && (
                          <Text
                            style={[
                              styles.options,
                              { borderLeftWidth: 1, borderLeftColor: "gray" },
                            ]}
                            onPress={() =>
                              handleDialogOps("delete", task, each.title)
                            }
                          >
                            Delete
                          </Text>
                        )}
                      </View>
                    </View>
                    {/* Task status */}
                    <View style={styles.taskStatusContainer}>
                      <Text style={styles.taskStatus}>
                        {each.title === "Pending" ? "Assign" : each.title}
                      </Text>
                    </View>
                  </View>
                ))
              ) : (
                <Text style={styles.noTaskText}>No tasks {each.title}</Text>
              )}
            </ScrollView>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default TasksSections;

const styles = StyleSheet.create({
  allTasksCategories: {
    width: "100%",
    height: "72%",
    display: "flex",
    flexDirection: "row",
    overflowX: "scroll",
  },
  eachTasksSection: {
    width: 300,
    height: "90%",
    borderRadius: 10,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "white",
    margin: 15,
    paddingBottom: 10,
    shadowColor: "#171717",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  titleContainer: {
    marginBottom: 10,
    padding: 14,
    borderRadius: 10,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    width: "100%",
    shadowColor: "#171717",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  cardTitle: {
    fontSize: 18,
    textAlign: "center",
    color: "white",
    fontWeight: "600",
    textTransform: "uppercase",
  },
  gray: {
    backgroundColor: "black",
  },
  orange: {
    backgroundColor: "orange",
  },
  green: {
    backgroundColor: "green",
  },
  blue: {
    backgroundColor: "#0000bc",
  },
  pink: {
    backgroundColor: "#ff8095",
  },
  eachTaskContainer: {
    width: "92%",
    height: 230,
    backgroundColor: "#c0c0c04a",
    borderRadius: 8,
    margin: 5,
    marginVertical: 10,
    padding: 5,
    paddingHorizontal: 10,
    paddingBottom: 10,
    display: "flex",
    alignSelf: "center",
    flexDirection: "column",
    justifyContent: "space-between",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.6)",
  },
  noTaskText: {
    marginTop: "70%",
  },
  taskNameAndPriority: {
    width: "100%",
    paddingVertical: 12,
    marginBottom: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 0.8,
    borderBottomColor: "black",
  },
  tasksName: {
    fontSize: 20,
    margin: 0,
  },
  priority: {
    backgroundColor: "#0052CC",
    padding: 5,
    fontSize: 15,
    color: "white",
    margin: 0,
    borderRadius: 3,
  },
  description: {
    fontSize: 12,
    marginHorizontal: 10,
    textAlign: "left",
  },
  assigneeAndOptions: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    margin: 5,
    padding: 5,
  },
  assignee: {
    fontSize: 15,
    margin: 0,
    textAlign: "left",
  },
  editAndDelete: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  options: {
    fontSize: 14,
    padding: 5,
    fontWeight: "600",
    margin: 0,
    marginHorizontal: 5,
  },
  optionsHover: {
    textDecorationLine: "underline",
  },
  taskStatusContainer: {
    backgroundColor: "#0052CC",
    width: "96%",
    borderRadius: 8,
    margin: 5,
  },
  taskStatus: {
    padding: 10,
    width: "96%",
    color: "white",
    fontSize: 15,
    textAlign: "center",
  },
});
