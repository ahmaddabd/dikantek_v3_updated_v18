import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthSocialService {
  constructor(private usersService: UsersService) {}

  async validateOAuthLogin(profile: any, provider: string) {
    let user = await this.usersService.findByEmail(profile.emails[0].value);
    if (!user) {
      user = await this.usersService.createUser({
        email: profile.emails[0].value,
        name: profile.displayName,
        provider,
      });
    }
    return user;
  }
}
