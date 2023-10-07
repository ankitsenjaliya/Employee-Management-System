const amountReducer = (state=0, action: any) => {
    if (action.type === 'deposit'){
        return state + action.payload;
    }else if (action.type === 'withdraw'){
        return state - action.payload;
    }else {
        return state;
    }
}

export default amountReducer;