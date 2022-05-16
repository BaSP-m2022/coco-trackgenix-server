import express from 'express';
import employeeController from '../controllers/employees';
import employeeValidation from '../validations/employees';

const router = express.Router();

router
  .get('/', employeeController.getAllEmployees)
  .get('/:id', employeeController.getEmployeeById)
  .post('/', employeeValidation.validateEmployee, employeeController.addNewEmployee)
  .put('/:id', employeeValidation.validateMod, employeeController.modifyEmployee)
  .delete('/:id', employeeController.deleteEmployee);

export default router;
