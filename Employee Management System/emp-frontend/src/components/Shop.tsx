import React from 'react';
import {Button} from "@mui/material";
import {useDispatch} from "react-redux";
import {bindActionCreators} from 'redux';
import actionCreators from '../state/action_creators/actionCreators';
import employeeActionCreators from '../state/action_creators/actionCreators';

const Shop : React.FC = () => {

    const dispatch = useDispatch();

    //const actions = bindActionCreators(actionCreators, dispatch);
    const actions = bindActionCreators(employeeActionCreators, dispatch);
    const depositMoney = () => {
      //  actions.depositMoney(100);
    }

    const withdrawMoney = () => {
        //actions.withdrawMoney(100);
    }

    return (
        <>
            <Button variant="contained" onClick={depositMoney}>Deposit</Button>
            Balance
            <Button variant="contained" onClick={withdrawMoney}>Widthdraw</Button>
        </>
    );
};

export default Shop;
