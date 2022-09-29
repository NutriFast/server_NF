import { PassportStrategy } from "@nestjs/passport";
import { Strategy, VerifyCallback } from "passport-google-oauth20";
import { config } from "dotenv";

import { Injectable } from "@nestjs/common";

config();

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, "google") {
  constructor() {
    super({
      clientID:
        "586885413478-qrg9b4f1c6q04ksb3l3m8897ddmbl3bm.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "http://localhost:3000/auth/redirect",
      scope: ["email", "profile"],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback
  ): Promise<any> {
    const { name, emails, photos } = profile;
    const user = {
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      picture: photos[0].value,
      accessToken,
    };
    done(null, user);
  }
}
