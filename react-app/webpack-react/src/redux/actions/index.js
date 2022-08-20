import {
    CHANGE_INPUT_VALUE,
    ADD_TODO_ITEM,
    DEL_TODO_ITEM,
} from '../actionTypes'
import {GET_LIST} from "../actionTypes";
import request from "../../util/request";
export const getInputChangeAction = (value) => ({
    type: CHANGE_INPUT_VALUE,
    value
});

export const addToDoAction = () => ({
    type: ADD_TODO_ITEM,
});

export const delToDoAction = (index) => ({
    type: DEL_TODO_ITEM,
    index
});

// thunk使得可以发送一个函数（异步）
export const getListAction  = () => {
    return (dispatch) => {
        request({
            url: 'https://www.forguo.com/api/express/list',
            type: 'get'
        }).then(res => {
            console.log(res);
            // that.props.getListAction(res);
            dispatch({
                type: GET_LIST,
                data: res.list
            });
        }, error => {
            console.log('error =>', error);
        }).catch((error) => {
            console.log('catch =>', error);
        });
    }
};
