import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { ConfigService } from '@nestjs/config';
import { google, Auth } from 'googleapis';

 
@Injectable()
export class GoogleAuthenticationService {
  oauthClient: Auth.OAuth2Client;
  constructor() {
    const clientID = process.env.GOOGLE_AUTH_ID_DEV;
    const clientSecret = process.env.GOOGLE_AUTH_SECRET_DEV;
 
    this.oauthClient = new google.auth.OAuth2(
      clientID,
      clientSecret,
    );
  }
 
  async authenticate(token: string) {
    const tokenInfo = await this.oauthClient.getTokenInfo(token);
    return tokenInfo
  }
}