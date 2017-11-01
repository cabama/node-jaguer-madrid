import { Request } from 'express'

export function expressAuthentication (request: Request, securityName: string, scopes?: string[]): Promise<any> {
  const user = (request as any).user

  if (securityName === 'adminRequired') {
    if (user.isAdmin()) return Promise.resolve(user)
    return Promise.reject({ status: 403, message: 'You don\'t have permissions' })
  }

  if (securityName === 'loginRequired') {
    if (user.isAuthenticated()) return Promise.resolve(user)
    return Promise.reject({ status: 401, message: 'You have to be logged in' })
  }

  if (securityName === 'permissionRequired') {
    if (scopes.length !== 1) return Promise.reject({ status: 500, message: 'Only one perm can be provided' })
    if (user.hasPermission(scopes[0])) return Promise.resolve(user)
    return Promise.reject({ status: 403, message: 'You don\'t have permissions' })
  }

  return Promise.reject({ status: 500, message: `Invalid securityName ${securityName} provided` })
}