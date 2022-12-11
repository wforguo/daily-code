/**
 *
 * @param state 上一次所存储的数据
 * @param action
 * @returns {*}
 */
import {
    CHANGE_INPUT_VALUE,
    ADD_TODO_ITEM,
    DEL_TODO_ITEM,
    GET_LIST,
} from '../actionTypes'
const defaultState = {
    toDoItem: '',
    toDoList: []
};

export default (state = defaultState, action) => {
    if (action.type === CHANGE_INPUT_VALUE) {
        // reducer可以接收state，但不能改变state;
        const newState = JSON.parse(JSON.stringify(state));
        newState.toDoItem = action.value;
        return newState;
    }

    if (action.type === ADD_TODO_ITEM) {
        // reducer可以接收state，但不能改变state;
        const newState = JSON.parse(JSON.stringify(state));
        newState.toDoList.push(newState.toDoItem);
        newState.toDoItem = '';
        console.log(newState);
        return newState;
    }

    if (action.type === DEL_TODO_ITEM) {
        // reducer可以接收state，但不能改变state;
        const newState = JSON.parse(JSON.stringify(state));
        newState.toDoList.splice(action.index, 1);
        console.log(newState);
        return newState;
    }

    if (action.type === GET_LIST) {
        // reducer可以接收state，但不能改变state;
        const newState = JSON.parse(JSON.stringify(state));
        newState.toDoList = action.data;
        console.log(action);
        return newState;
    }
    return state;
};
