import { inject } from '@angular/core'
import {
  ActivatedRouteSnapshot,
  CanActivateChildFn,
  CanActivateFn,
  Router,
  RouterStateSnapshot
} from '@angular/router'
import { UserSessionService } from '../../@core/service/user-session.service'

export const canLoadVote: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const { sessionId } = route.params
  const authService = inject(UserSessionService)
  const router = inject(Router)
  const user = authService.getUser()

  if (!user) {
    router.navigate(['vote', 'user-login', sessionId])
    return false
  }

  return true
}

export const canLoadUserLogin: CanActivateFn = (
  route: ActivatedRouteSnapshot
) => {
  const { sessionId } = route.params
  const authService = inject(UserSessionService)
  const router = inject(Router)
  const user = authService.getUser()

  if (user) {
    router.navigate(['vote', sessionId])
    return false
  }

  return true
}
