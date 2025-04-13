import passport, { Profile } from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import jwt from 'jsonwebtoken';
import { prisma } from './prismaClient';
import ThrowError from '../middleware/error';
import AuthRepository from '../modules/auth/repository/auth_repository';

const initializePassport = () => {
  // JWT token generator scoped under the function
  const generateToken = (user: any) => {
    const SECRET_KEY = process.env.JWT_SECRET || '';
    const EXPIRES_IN = '1d';

    const payload = {
      userId: user.id,
      email: user.email,
    };

    return jwt.sign(payload, SECRET_KEY, { expiresIn: EXPIRES_IN });
  };

  // Use Google strategy
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.CLIENT_ID!,
        clientSecret: process.env.CLIENT_SECRET!,
        callbackURL: process.env.CALLBACK_URL!,
      },
      async (accessToken, refreshToken, profile: any, done) => {
        try {

          console.log("Profile", profile);



          const user = await AuthRepository.handleGoogleCheck(profile);
          console.log("User Data", user);

          const token = generateToken(user);

          return done(null, { user, token });
        } catch (error) {
          console.error('Authentication error:', error);
          done(error, false);
        }
      }
    )
  );

  // Session config (optional)
  passport.serializeUser((user: any, done) => {
    done(null, user);
  });

  passport.deserializeUser((user: any, done) => {
    done(null, user);
  });
};

export { initializePassport };
