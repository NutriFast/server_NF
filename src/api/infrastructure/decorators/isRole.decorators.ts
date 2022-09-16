import {
    ValidatorConstraint,
    ValidatorConstraintInterface,
  } from 'class-validator';
import { RolesArray } from '../constants/roles';
  
  @ValidatorConstraint({ name: 'IsRole', async: false })
  export class IsRole implements ValidatorConstraintInterface {
    validate(role: string) {
        return RolesArray.indexOf(role) != -1;
    }
  
    defaultMessage() {
      return 'role-does-not-match';
    }
  }
  