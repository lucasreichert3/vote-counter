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
  const { pautaId } = route.params
  const authService = inject(UserSessionService)
  const router = inject(Router)
  const user = authService.getUser()

  if (!user) {
    router.navigate(['vote', 'user-login', pautaId])
    return false
  }

  return true
}

export const canLoadUserLogin: CanActivateFn = (
  route: ActivatedRouteSnapshot
) => {
  const { pautaId } = route.params
  const authService = inject(UserSessionService)
  const router = inject(Router)
  const user = authService.getUser()

  if (user) {
    router.navigate(['vote', pautaId])
    return false
  }

  return true
}
