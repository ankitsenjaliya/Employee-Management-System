import * as React from 'react';
import Button, {ButtonProps} from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {IEmployee} from "../types/interfaces/IEmployee";
import {useDispatch, useSelector} from "react-redux";
import {forwardRef, MutableRefObject, useEffect, useImperativeHandle, useState} from "react";
import {InputAdornment, styled} from "@mui/material";
import {AccountCircle} from "@mui/icons-material";
import {useEmployeeContext} from "../containers/MainContainer";
import {bindActionCreators} from "redux";
import employeeActionCreators from "../state/action_creators/actionCreators";

interface IConfirmationModal {
    action: string
}

export type handleClickType = {
    handleClickFromParent: () => void;
};

const ConfirmationDialogue = forwardRef((props:IConfirmationModal, ref) => {
    const { fetchEmployees } = useEmployeeContext();
    const [open, setOpen] = React.useState(false);
    const [dialogueTitle, setDialogueTitle] = useState("Default Title Text");
    const [dialogueHeaderDescription, setDialogueHeaderDescription] = useState("Default Description Text");
    const [dialogueSubmitActionButton, setDialogueSubmitActionButton] = useState("Submit");
    const useAppSelector = useSelector;
    const dispatch = useDispatch();
    const actions = bindActionCreators(employeeActionCreators, dispatch);
    const selectEmployee = (state:any) => state.employee;
    const currentSelectedEmployee = useAppSelector(selectEmployee);
    const initialEmployeeState: IEmployee = {
        firstName: '',
        lastName: '',
        emailId : ''
    }
    const [modifiedEmployee, setModifiedEmployee] = useState<IEmployee>(initialEmployeeState);

    useImperativeHandle(ref, () => ({
        handleClickFromParent () {
            handleClickOpen();
        }
    }));

    useEffect(() => {
        if (currentSelectedEmployee){
            setModifiedEmployee({firstName: currentSelectedEmployee['firstName'],
                lastName: currentSelectedEmployee['lastName'],
                emailId : currentSelectedEmployee['emailId']});
        }
    }, [currentSelectedEmployee]);

    useEffect(() => {
        createDialogueContent();
    });

    const createDialogueContent = () => {
        switch (props.action){
            case 'edit':{
                setDialogueTitle("Update Employee");
                setDialogueHeaderDescription("Update an information of employee:");
                setDialogueSubmitActionButton("Update");
                break;
            }
            case 'delete':{
                setDialogueTitle("Delete Employee");
                setDialogueHeaderDescription("Are you sure want to delete this Employee?");
                setDialogueSubmitActionButton("Delete");
                break;
            }
            case 'add':{
                setDialogueTitle("Add Employee");
                setDialogueHeaderDescription("Add an information of employee");
                setDialogueSubmitActionButton("Add");
                break;
            }
        }
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        actions.selectEmployee(initialEmployeeState);
    };

    const submitRequest = async (empId:number|null) => {
        const options: RequestInit = {
            headers:{
                'Content-Type':'application/json'
            },
            method:props.action==='edit' ? 'PUT' : props.action!=='add' ? 'DELETE' : 'POST',
            body: (props.action!=='delete') ? JSON.stringify(modifiedEmployee) : null
        };

        const baseUrl = 'http://localhost:8080/api/employees';
        const url =  props.action!=='add' ? baseUrl + '/' + empId : baseUrl;

        try {
            const response = await fetch(url,options);
            if(!response.ok){
                console.log('Error occurred');
            }else {
                console.log('Action performed successfully');
                fetchEmployees();
            }
            handleClose();
        } catch (error) {
            console.error('Error fetching employees:', error);
        }
    };

    const changeEmployeeField = (empKey : keyof IEmployee, newValue : string) => {
        setModifiedEmployee((prevState)=> ({ ...prevState, [empKey] :newValue}));
    };

    const CancelColorButton = styled(Button)<ButtonProps>(({ theme  }) => ({
        color: '#000000',
        backgroundColor: '#ffffff',
        borderColor: '#000000',
        borderWidth: '1px',
        '&:hover': {
            backgroundColor: '#ffffff',
            borderColor: '#000000',
            borderWidth: '1px',
        },
    }));

    const ActionColorButton = styled(Button)<ButtonProps>(({ theme  }) => ({
        color: '#ffffff',
        backgroundColor: '#212121',
        '&:hover': {
            backgroundColor: '#616161',
            borderColor: '#212121',
        },
    }));

    return (<>
            {
                (currentSelectedEmployee || props.action==='add') && (
                    <div>
                        <Dialog open={open} onClose={handleClose}>
                            <DialogTitle>{dialogueTitle}</DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    {dialogueHeaderDescription}
                                </DialogContentText>
                                {props.action!=='add' && (
                                    <TextField
                                        id="empId"
                                        label="Employee ID"
                                        defaultValue={props.action!=='add' ? currentSelectedEmployee['id'] : ''}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <AccountCircle />
                                                </InputAdornment>
                                            ),
                                            readOnly : true,
                                            sx: {
                                                color: '#616161', // Input Text color
                                            }
                                        }}
                                        sx={{width: 75}}
                                        variant="standard"
                                        margin="dense"
                                    />
                                )}
                                <TextField
                                    margin="dense"
                                    id="firstname"
                                    label="First Name"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                    defaultValue={props.action!=='add' ? currentSelectedEmployee['firstName'] : ''}
                                    onChange={(e) => {changeEmployeeField('firstName',e.target.value)}}
                                />
                                <TextField
                                    margin="dense"
                                    id="lastname"
                                    label="Last Name"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                    defaultValue={props.action!=='add' ? currentSelectedEmployee['lastName'] : ''}
                                    onChange={(e) => {changeEmployeeField('lastName',e.target.value)}}
                                />
                                <TextField
                                    margin="dense"
                                    id="email"
                                    label="Email Address"
                                    type="email"
                                    fullWidth
                                    variant="standard"
                                    defaultValue={props.action!=='add' ? currentSelectedEmployee['emailId'] : ''}
                                    onChange={(e) => {changeEmployeeField('emailId',e.target.value)}}
                                />
                            </DialogContent>
                            <DialogActions>
                                <CancelColorButton variant="outlined" onClick={handleClose}>Cancel</CancelColorButton>
                                <ActionColorButton variant="contained" onClick={()=>submitRequest(props.action!=='add' ? currentSelectedEmployee['id'] : null)}>{dialogueSubmitActionButton}</ActionColorButton>
                            </DialogActions>
                        </Dialog>
                    </div>
                )
            }
    </>
    );

});

export default ConfirmationDialogue;
