export type Employee<T> = {
  name: string;
  salary: number;
  department: T;
};

export class SalaryCalculator {
  private employees: Employee<string>[];

  constructor(employees: Employee<string>[]) {
    this.employees = employees;
  }

  calculateTotalSalary(): number {
    let employees = [...this.employees];

    let total = 0;

    while (employees.length) {
      let employee = employees.pop();

      if (typeof employee !== 'undefined') {
        total += employee.salary;
      }
    }

    return total;
  }

  calculateTaxPaid(taxRate: number): number {
    let totalSalary = 0;

    for (let x = 0; x < this.employees.length; x++) {
      totalSalary += this.employees[x].salary;
    }

    let totalTax = 0;

    for (let x = 0; x < this.employees.length; x++) {
      totalTax += this.employees[x].salary * (taxRate / 100);
    }

    return totalTax;
  }

  getDepartmentsWithEmployees(): Record<string, Employee<string>[]> {
    let departments: Record<string, Employee<string>[]> = {};

    for (let x = 0; x < this.employees.length; x++) {
      let { department, name, salary } = this.employees[x];

      if (departments[department]) {
        departments[department] = [
          ...departments[department],
          { name, salary, department },
        ];
      } else {
        departments[department] = [{ name, salary, department }];
      }
    }

    return departments;
  }

  getTaxPaidForEachDepartment(taxRate: number): Record<string, number> {
    let result: Record<string, number> = {};

    let departments = this.getDepartmentsWithEmployees();

    for (let departmentName in departments) {
      const employees = departments[departmentName];

      const calculator = new SalaryCalculator(employees);

      result[departmentName] = calculator.calculateTaxPaid(taxRate);
    }

    return result;
  }
}
