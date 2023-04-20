export { AuthState, AuthStateChange } from "./auth-state";

export interface AuthToken {
	exp?: number,
	iss?: string,
	sub?: string,
	aud?: string | string[];
	nbf?: number,
	iat?: number,
	jti?: string,
	[key: string]: any
}

export type SignedAuthToken = string;
