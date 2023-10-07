package com.example.employee.controller;

import com.example.employee.model.Employee;
import com.example.employee.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class EmployeeController {

    @Autowired
    EmployeeService empService;

    @PostMapping(value = "/employees")
    public Employee createEmployee(@RequestBody Employee emp){
        return empService.createEmployee(emp);
    }

    @GetMapping(value = "/employees")
    public List<Employee> readEmployees(){
        return empService.getEmployees();
    }

    @PutMapping(value = "/employees/{empId}")
    public Employee updateEmployee(@PathVariable(value = "empId") Long id,
                                   @RequestBody Employee empDetails){
        return empService.updateEmployee(id, empDetails);
    }

    @DeleteMapping(value = "/employees/{empId}")
    public void deleteEmployee(@PathVariable(value = "empId") Long id){
        empService.deleteEmployee(id);
    }
}
