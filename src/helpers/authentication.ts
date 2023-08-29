import jsonwebtoken from 'jsonwebtoken'
import {
  JWT_ACCESS_TOKEN_SECRET,
  JWT_ACCESS_TOKEN_EXPIRY_TIME,
  JWT_REFRESH_TOKEN_SECRET,
  JWT_REFRESH_TOKEN_EXPIRY_TIME, OTP_EXPIRY_TIME
} from '../Loaders/config'
import logger from '../logger'

function generateJWT (payload: object, expiresIn: number, secret: string): string {
  return jsonwebtoken.sign(payload, secret, {
    algorithm: 'HS256',
    expiresIn
  })
}

export function generateAccessToken (payload: object, expiresIn: number = JWT_ACCESS_TOKEN_EXPIRY_TIME): string {
  try {
    return generateJWT(payload, expiresIn, JWT_ACCESS_TOKEN_SECRET)
  } catch (error) {
    logger.error(`ERROR in login generateAccessToken() => ${error}`)
  }
}

export function verifyAccessToken (token: string): any {
  return jsonwebtoken.verify(token, JWT_ACCESS_TOKEN_SECRET)
}

export async function generateRefreshToken(payload: object, expiresIn = JWT_REFRESH_TOKEN_EXPIRY_TIME) {
  try {
    console.log('JWT_REFRESH_TOKEN_EXPIRY_TIME ------ ', JWT_REFRESH_TOKEN_EXPIRY_TIME)
    console.log('expiresIn ------ ', JWT_REFRESH_TOKEN_EXPIRY_TIME)
    return generateJWT(payload, expiresIn, JWT_REFRESH_TOKEN_SECRET);
  } catch (error) {
    logger.error(`ERROR in login generateRefreshToken() => ${error}`);
  }
}

export const verifyRefreshJWT = async (token: string) => {
  return jsonwebtoken.verify(token, JWT_REFRESH_TOKEN_SECRET);
};

export async function generateOTPToken(payload: object, expiresIn = OTP_EXPIRY_TIME) {
  try {
    console.log('generateOTPToken ------ ', OTP_EXPIRY_TIME)
    console.log('generateOTPToken expiresIn ------ ', OTP_EXPIRY_TIME)
    return generateJWT(payload, expiresIn, JWT_ACCESS_TOKEN_SECRET);
  } catch (error) {
    logger.error(`ERROR in login generateRefreshToken() => ${error}`);
  }
}

export const verifyOTPJWT = async (token: string) => {
  return jsonwebtoken.verify(token, JWT_ACCESS_TOKEN_SECRET);
};
