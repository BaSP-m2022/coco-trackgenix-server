import express from 'express';
import employeeController from '../controllers/employees';
import employeeValidation from '../validations/employees';
import authValidation from '../validations/auth';

const router = express.Router();

router
  .get('/', authValidation, employeeController.getAllEmployees)
  .get('/:id', authValidation, employeeController.getEmployeeById)
  .post('/', authValidation, employeeValidation.validateEmployee, employeeController.addNewEmployee)
  .put('/:id', authValidation, employeeValidation.validateMod, employeeController.modifyEmployee)
  .delete('/:id', authValidation, employeeController.deleteEmployee);

export default router;
