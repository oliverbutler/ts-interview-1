import { describe, it, expect } from 'vitest';
import { Employee, SalaryCalculator } from './main';

const john: Employee<string> = {
  name: 'John',
  salary: 75_000,
  department: 'Engineering',
};

const jane: Employee<string> = {
  name: 'Jane',
  salary: 20_000,
  department: 'Engineering',
};

const johnny: Employee<string> = {
  name: 'Johnny',
  salary: 30_000,
  department: 'Shipping',
};

describe('SalaryCalculator', () => {
  it('should be able to calculate the total salary of all employees', () => {
    const calculator = new SalaryCalculator([john, jane, johnny]);

    expect(calculator.calculateTotalSalary()).toStrictEqual(125_000);
  });

  it('should be able to get each department with its employees', () => {
    const calculator = new SalaryCalculator([john, jane, johnny]);

    expect(calculator.getDepartmentsWithEmployees()).toStrictEqual({
      Engineering: [john, jane],
      Shipping: [johnny],
    });
  });

  it('should calculate the tax paid per year', () => {
    const calculator = new SalaryCalculator([john, jane, johnny]);

    expect(calculator.calculateTaxPaid(20)).toStrictEqual(25_000);
  });

  it('should be able to get the tax paid for each department', () => {
    const calculator = new SalaryCalculator([john, jane, johnny]);

    expect(calculator.getTaxPaidForEachDepartment(20)).toStrictEqual({
      Engineering: 19_000,
      Shipping: 6_000,
    });
  });
});
