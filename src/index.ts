export { AuthState, AuthStateChange } from "./auth-state";

export interface AuthToken {
	[key: string]: any;
}

export type SignedAuthToken = string;
