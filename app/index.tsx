import { Text, View } from "react-native";
import TaskListProvider, { AddAction, RemoveAction, Task, TaskListContext } from "./TaskListProvider";
import { useContext } from "react";
import uuid from 'react-native-uuid';

function TaskList() {
  const {tasks, updateTaskList} = useContext(TaskListContext);

  const removeTaskFromListOnClick = (id : string) : void => {
    const removeTask : RemoveAction = {
        type: "REMOVE",
        id: id
      }

    updateTaskList(removeTask);
  }

  const addTaskToListOnClick = () : void => {
    const addTask : AddAction = {
      type: "ADD",
      payload: {
        id: uuid.v4(),
        name: "Sample Add"
      }
    }
    updateTaskList(addTask);
  }

  const TaskDisplay = (task : Task) => {
    return (
      <View>
        <Text>{task.name}</Text>
        <button onClick={() => removeTaskFromListOnClick(task.id)}>Remove</button>
      </View>
    )
  }

  return (
    <View>
      <View>
        { tasks.map(task => <TaskDisplay name={task.name} id={task.id}/>)}
      </View>
      <button onClick={addTaskToListOnClick}>Add</button>
    </View>
  )
}

export default function Index() {
  return (
    <TaskListProvider>
      <TaskList/>
    </TaskListProvider>
  );
}
