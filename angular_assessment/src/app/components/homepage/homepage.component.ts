import { Component, OnInit, Output } from '@angular/core';
import { Employee } from 'src/app/interfaces/employee';
import { EmployeesService } from 'src/app/services/employees.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  @Output()
  employeeToEdit!: Employee;

  @Output()
  updateDataSwitch!: boolean;

  @Output()
  updateEmployeeSwitch!: boolean;

  constructor(private employeesService: EmployeesService) { }

  ngOnChanges(): void {
    console.log('updateDataSwitch in app component changes: ' + this.updateDataSwitch);
    console.log('updateEmployeeSwitch in app component changes:' + this.updateEmployeeSwitch);
  }

  ngOnInit(): void {
    this.employeesService.getEmployees();
    this.updateEmployeeSwitch = false;
    this.updateDataSwitch = false;
    console.log('updateDataSwitch in app component init: ' + this.updateDataSwitch);
    console.log('updateEmployeeSwitch in app component init:' + this.updateEmployeeSwitch);
  }

  editEmployee(employee: Employee): void {
    this.employeeToEdit = employee;
    console.log('Employee to edit in app component: ' + JSON.stringify(employee));
  }

  setUpdateEmployeeSwitch(updateEmployeeSwitch: boolean) {
    this.updateEmployeeSwitch = updateEmployeeSwitch;
    console.log('updateEmployeeSwitch in app component setUpdateEmployeeSwitch:' + this.updateEmployeeSwitch);
  }

  setUpdateDataSwitch(updateDataSwitch: boolean) {
    this.updateDataSwitch = updateDataSwitch;
    console.log('updateDataSwitch in app component setUpdateData:' + this.updateDataSwitch);

  }
}

