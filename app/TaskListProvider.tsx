import { createContext, useReducer, ReactNode } from 'react';

export const TaskListContext = createContext<TaskListContextProps>({
    tasks: [],
    updateTaskList: () => {}
});

type TaskListContextProps = {
    tasks: Array<Task>;
    updateTaskList: React.Dispatch<Action>;
}

export type Task = {
    id: string;
    name: string;
}

export type AddAction = {
    type: 'ADD';
    payload: Task;
}

export type RemoveAction = {
    type: 'REMOVE';
    id: string;
}

type Action = AddAction | RemoveAction;

const TaskListProvider = ({children} : {children : ReactNode}) => {
    const reducer = (state : Array<Task> , action : Action) => {
        switch (action.type) {
            case 'ADD':
                return [...state, action.payload];
            case 'REMOVE':
                return state.filter((task : Task) => task.id !== action.id);
            default:
                return state;
        }
    }
    const [taskList, dispatch] = useReducer(reducer, []);

    return (
        <TaskListContext.Provider value={{
            tasks: taskList,
            updateTaskList: dispatch 
        }}>
            { children }
        </TaskListContext.Provider>
    );
}

export default TaskListProvider;
