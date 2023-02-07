import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { RolesEnum } from 'src/enum/roles.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector){}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<Array<RolesEnum>>("roles", context.getHandler());
    if(!roles){
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if(!user){
      throw new ForbiddenException("could not determine role");
    }
    return this.matchRole(roles, user.role);
  }
  private matchRole(roles: Array<RolesEnum>, ...userRoles: Array<RolesEnum> ): boolean{
    return userRoles.some(role => roles.includes(role));
  }
}
