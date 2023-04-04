import { GetPublicKeyOrSecret, Jwt, Secret, sign, SignOptions, verify, VerifyOptions } from 'jsonwebtoken';
import { InvalidArgumentsError } from '@socket-mesh/errors';

export class AuthEngine {
	verifyToken(signedToken: string, key: Secret | GetPublicKeyOrSecret, options: VerifyOptions & { complete: true; }): Promise<Jwt | undefined> {
		const jwtOptions = Object.assign({}, options || {});

		delete jwtOptions['socket'];

		if (typeof signedToken === 'string' || signedToken == null) {
			return new Promise((resolve, reject) => {
				verify(signedToken || '', key, jwtOptions, (err, token) => {
					if (err) {
						reject(err);
						return;
					}
					resolve(token);
				});
			});
		}

		return Promise.reject(
			new InvalidArgumentsError('Invalid token format - Token must be a string')
		);
	};

	signToken(token: string | object | Buffer, key: Secret, options: SignOptions): Promise<string | undefined> {
		const jwtOptions = Object.assign({}, options || {});

		return new Promise<string | undefined>((resolve, reject) => {
			sign(token, key, jwtOptions, (err, signedToken) => {
				if (err) {
					reject(err);
					return;
				}
				resolve(signedToken);
			});
		});
	};
}