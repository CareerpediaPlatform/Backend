export interface IUserSession {
  userId: string
  role: string
  userName: string
  permissions: string[]
}

export class UserSession implements IUserSession {
  public userId: string
  public role: string
  public userName: string
  public permissions: string[]

  constructor (userId: string, role: string, userName: string, permissions?: string[]) {
    this.userId = userId
    this.role = role
    this.userName = userName
    this.permissions = permissions
  }
}
