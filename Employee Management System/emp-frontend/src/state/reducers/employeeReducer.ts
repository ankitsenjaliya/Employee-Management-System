import {IEmployee} from "../../types/interfaces/IEmployee";

const employeeReducer = (state:IEmployee | null =null, action:any) => {
    if (action.type === 'selectEmployee'){
        return action.payload;
    }else {
        return state;
    }
}

export default employeeReducer;