import jwt from "jsonwebtoken";
import jwksClient from "jwks-rsa";

/* Getting the public key from the jwks.json file. */
const client = jwksClient({
  jwksUri: process.env.JWKSURI,
  requestHeaders: {},
  timeout: 30000,
});

export async function verifyToken(token) {
  const kid = process.env.KID; //decoded.header.kid;
  const key = await client.getSigningKey(kid);
  const signingKey = key.getPublicKey();

  try {
    /* Verifying the token. */
    jwt.verify(token, signingKey, { algorithms: ["RS256"] });
    return true;
  } catch (error) {
    throw new Error(error);
  }
}
