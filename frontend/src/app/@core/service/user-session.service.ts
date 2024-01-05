import { Injectable } from '@angular/core'
import { User } from '../model/user'

@Injectable({
  providedIn: 'root'
})
export class UserSessionService {
  constructor() {}

  getUser(): User | undefined {
    const user = localStorage.getItem('user')

    if (user) return JSON.parse(user)

    return
  }

  setUser(user: User): void {
    localStorage.setItem('user', JSON.stringify(user))
  }

  removeUser(): void {
    localStorage.removeItem('user')
  }
}
