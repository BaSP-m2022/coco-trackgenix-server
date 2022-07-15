import express from 'express';
import members from '../controllers/members';
import validateMembers from '../validations/members';
import authValidation from '../validations/auth';

const router = express.Router();

router
  .get('/', authValidation, members.getAllMembers)
  .get('/:id', authValidation, validateMembers.idValidation, members.getByIdMembers)
  .put('/:id', authValidation, validateMembers.idValidationEmployee, validateMembers.idValidation, validateMembers.validateMemberPut, members.putMembers)
  .post('/', authValidation, validateMembers.idValidationEmployee, validateMembers.validateMember, members.addMembers)
  .delete('/:id', authValidation, validateMembers.idValidation, members.deleteMember);
export default router;
