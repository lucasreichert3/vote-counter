import { Component } from '@angular/core'
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms'
import { MatButtonModule } from '@angular/material/button'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { ActivatedRoute, Router } from '@angular/router'
import { UserSessionService } from '../../../../@core/service/user-session.service'

@Component({
  selector: 'app-user-login',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule
  ],
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.scss'
})
export class UserLoginComponent {
  userForm: FormGroup<UserForm>

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private userSessionService: UserSessionService
  ) {
    this.userForm = this.fb.group<UserForm>({
      cpf: new FormControl<string>('', {
        nonNullable: true,
        validators: [Validators.required]
      })
    })
  }

  sendToVote() {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched()
      return
    }

    console.log('pass')

    this.saveUser()
    const { pautaId } = this.activatedRoute.snapshot.params
    this.router.navigate(['vote', pautaId])
  }

  saveUser() {
    const { cpf } = this.userForm.value

    this.userSessionService.setUser({ cpf: cpf as string })
  }

  backToList() {
    this.router.navigate(['pauta', 'list'])
  }
}

interface UserForm {
  cpf: FormControl<string>
}
