import {IEmployee} from "../../types/interfaces/IEmployee";

export const selectEmployee = (employee:IEmployee) => {
    return (dispatch:any) => {
        dispatch({
            type : 'selectEmployee',
            payload: employee
        })
    }
}

export const unSelectEmployee = () => {
    return (dispatch:any) => {
        dispatch({
            type : 'unSelectEmployee'
        })
    }
}