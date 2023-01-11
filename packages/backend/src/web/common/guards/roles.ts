import { Role } from '@domain/enums';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles =
      this.reflector.get<Role[]>('roles', context.getHandler()) || [];
    const rolesFromClass =
      this.reflector.get<Role[]>('roles', context.getClass()) || [];

    const allRoles = [...roles, ...rolesFromClass];
    if (!allRoles.length) {
      return true;
    }
    const request = context.switchToHttp().getRequest();

    const user = request.user;

    return this.matchRoles(allRoles, user.role);
  }

  matchRoles(roles: Role[], userRole: Role) {
    return roles.includes(userRole);
  }
}
