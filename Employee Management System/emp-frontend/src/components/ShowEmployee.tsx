import React, {useRef, useState} from "react";
import {IEmployee, IEmployeeList} from "../types/interfaces/IEmployee";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    tableCellClasses,
    styled, Button
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import styles from '../styles/styles.module.css';
import ModifyProfileIcon from "../resources/icon_components/ModifyProfileIcon";
import DeleteProfileIcon from "../resources/icon_components/DeleteProfileIcon";
import {useDispatch} from "react-redux";
import {bindActionCreators} from "redux";
import employeeActionCreators from "../state/action_creators/actionCreators";
import {unSelectEmployee} from "../state/action_creators/employeeActions";
import ConfirmationDialogue, {handleClickType} from "./ConfirmationDialogue";
import AddEmployeeIcon from "../resources/icon_components/AddEmployeeIcon";
import { ButtonProps } from '@mui/material/Button';
import {grey, purple} from '@mui/material/colors';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
    color: theme.palette.getContrastText('#fafafa'),
    backgroundColor: grey[200],
    '&:hover': {
        backgroundColor: grey[300],
    },
}));



const ShowEmployee : React.FC<IEmployeeList> = ({employees}) => {
    const confirmationModalRefFunction = useRef<handleClickType>(null);
    const dispatch = useDispatch();
    const actions = bindActionCreators(employeeActionCreators, dispatch);
    const [actionSelected, setActionSelected] = useState("edit");
    const onSelect= (action: 'edit' | 'delete' | 'add' , emp?:IEmployee) => {
        console.log('action starts:',action);
        if (emp && action !== 'add'){
            console.log(action,' an employee:',emp);
            actions.selectEmployee(emp);
        }
        setActionSelected(action);
        if (confirmationModalRefFunction.current !== null) {
            confirmationModalRefFunction.current.handleClickFromParent();
        }
        console.log('action ends:',action);
    }

    return (
        <div>
            <ConfirmationDialogue action={actionSelected} ref={confirmationModalRefFunction}/>
            <div style={{ overflow:"hidden", maxWidth:'750px'}}>
                <h2 style={{ margin: '25px', float:"left" }}>Employees</h2>
                <ColorButton variant="contained"
                             startIcon={<AddEmployeeIcon />}
                             onClick={() => onSelect('add')}
                             sx={{margin: '25px', float:"right"}}>
                    Add Employee
                </ColorButton>
            </div>

            <TableContainer component={Paper} style={{ maxWidth: '700px', margin: '25px' }}>
                <Table sx={{ maxWidth: 700 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="right">ID</StyledTableCell>
                            <StyledTableCell>Employee Name</StyledTableCell>
                            <StyledTableCell align="left">Email Address</StyledTableCell>
                            <StyledTableCell align="center">Action</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {employees.map((employee) => (
                            <StyledTableRow key={employee.id}>
                                <StyledTableCell align="right">{employee.id}</StyledTableCell>
                                <StyledTableCell component="th" scope="row">
                                    {employee.firstName + " " + employee.lastName}
                                </StyledTableCell>
                                <StyledTableCell align="left">{employee.emailId}</StyledTableCell>
                                <IconButton size="large" onClick={() => onSelect('edit', employee)} sx={{marginLeft:5}}>
                                    <ModifyProfileIcon />
                                </IconButton>
                                <IconButton size="large" onClick={() => onSelect('delete', employee)}>
                                    <DeleteProfileIcon />
                                </IconButton>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default ShowEmployee;