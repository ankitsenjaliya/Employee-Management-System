import React, {createContext, useContext, useEffect, useState} from "react";
import {IEmployee, IEmployeeList} from "../types/interfaces/IEmployee";
import ShowEmployee from "../components/ShowEmployee";
import {useSelector} from "react-redux";

interface EmployeeContextType {
    employees?: IEmployee[];
    fetchEmployees: () => void;
}
const EmployeeContext = createContext<EmployeeContextType | undefined>(undefined);
const MainContainer : React.FC = () => {

    const useAppSelector = useSelector;
    const selectEmployee = (state:any) => state.employee;
    const currentSelectedEmployee = useAppSelector(selectEmployee);
    const [employees, setEmployees] = useState<IEmployee[]>([]);

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        const options: RequestInit = {
            headers:{
                'Content-Type':'application/json'
            }
        };
        try {
            const response = await fetch('http://localhost:8080/api/employees',options);
            if (response.ok) {
                const employeeData = await response.json();
                setEmployees(employeeData);
            } else {
                return {} as IEmployee[];
                console.error('Error fetching employees:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching employees:', error);
        }
    }

    return (
        <>
            <EmployeeContext.Provider value={{fetchEmployees}}>
                <ShowEmployee employees={employees}/>
            </EmployeeContext.Provider>
        </>
    );
};

export function useEmployeeContext() {
    const context = useContext(EmployeeContext);
    if (!context) {
        throw new Error('useEmployeeContext must be used within an EmployeeProvider');
    }
    return context;
}


export default MainContainer;