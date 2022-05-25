import express from 'express';
import members from '../controllers/members';
import valideteMembers from '../validations/members';

const router = express.Router();

router
  .get('/', members.getAllMembers)
  .get('/:id', members.getByIdMembers)
  .put('/:id', valideteMembers.validateMemberPut, members.putMembers)
  .post('/', valideteMembers.validateMember, members.addMembers)
  .delete('/:id', members.deleteMember);
export default router;
