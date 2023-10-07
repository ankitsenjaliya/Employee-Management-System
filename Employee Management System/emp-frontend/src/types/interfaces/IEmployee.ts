import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import * as React from "react";

export interface IEmployee{
    id?: number;
    firstName: string;
    lastName: string;
    emailId: string;
}

export interface IEmployeeList {
    employees: IEmployee[];
}


export enum numb{
    one = 'fskjdk',
    two = ''
}