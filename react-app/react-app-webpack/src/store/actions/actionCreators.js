import {
    CHANGE_INPUT_VALUE,
    ADD_TODO_ITEM,
    DEL_TODO_ITEM,
    GET_LIST
} from '../actionTypes'
export const getInputChangeAction = (value) => ({
    type: CHANGE_INPUT_VALUE,
    value
});

export const addToDoAction = (value) => ({
    type: ADD_TODO_ITEM,
});

export const delToDoAction = (index) => ({
    type: DEL_TODO_ITEM,
    index
});
export const getListAction  = (data)=>({
    type: GET_LIST,
    data
});