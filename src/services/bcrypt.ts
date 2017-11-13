// This is a refactor of bcrypt for this use with Promise

import * as bcrypt from 'bcrypt-nodejs'

export function hash(password: string): Promise<string> {
	return new Promise((resolve, reject) => {
		bcrypt.hash(password, null, null, (err, hash) => {
			if (hash) {
				resolve(hash)
			} else {
				reject(err)
			}
		})
	})//Promise
}

export function compare (string1: string, string2: string): Promise<boolean> {
	return new Promise<boolean>((resolve, reject) => {
		bcrypt.compare(string1, string2, (err, check) => {
			if (check) {
				resolve(true)
			} else {
				resolve(false)
			}
		})
	})//Promise
}
