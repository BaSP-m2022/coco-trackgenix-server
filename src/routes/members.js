import express from 'express';
import members from '../controllers/members';
import validateMembers from '../validations/members';

const router = express.Router();

router
  .get('/', members.getAllMembers)
  .get('/:id', validateMembers.idValidation, members.getByIdMembers)
  .put('/:id', validateMembers.idValidation, validateMembers.validateMemberPut, members.putMembers)
  .post('/', validateMembers.validateMember, members.addMembers)
  .delete('/:id', validateMembers.idValidation, members.deleteMember);
export default router;
