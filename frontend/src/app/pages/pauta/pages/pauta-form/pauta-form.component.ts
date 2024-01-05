import { Component, OnInit } from '@angular/core'
import { MatInputModule } from '@angular/material/input'
import { MatFormFieldModule } from '@angular/material/form-field'
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms'
import { MatButtonModule } from '@angular/material/button'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatNativeDateModule } from '@angular/material/core'
import { Router } from '@angular/router'
import { PautaService } from '../../../../features/pauta/service/pauta.service'
import { SessionService } from '../../../../features/session/service/session.service'
import { pipe, switchMap } from 'rxjs'

@Component({
  selector: 'app-pauta-form',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule
  ],
  templateUrl: './pauta-form.component.html',
  styleUrl: './pauta-form.component.scss'
})
export class PautaFormComponent implements OnInit {
  form!: FormGroup<PautaForm>

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private pautaService: PautaService,
    private sessionService: SessionService
  ) {}

  ngOnInit() {
    this.form = this.fb.group<PautaForm>({
      title: new FormControl<string>('', {
        nonNullable: true,
        validators: [Validators.required]
      }),
      description: new FormControl(''),
      endDate: new FormControl(null, {
        nonNullable: true,
        validators: [Validators.required]
      }),
      category: new FormControl<string>('', {
        nonNullable: true,
        validators: [Validators.required]
      })
    })
  }

  createPauta() {
    if (this.form.invalid) {
      this.form.markAllAsTouched()
      return
    }

    const { category, description, endDate, title } = this.form.value

    this.pautaService
      .create({
        category: category as string,
        description: description as string,
        title: title as string
      })
      .pipe(
        switchMap(({ id }) =>
          this.sessionService.create({
            pautaId: id,
            closeDate: endDate!.toISOString()
          })
        )
      )
      .subscribe({ next: () => this.backToList() })
  }

  backToList() {
    this.router.navigate(['pauta', 'list'])
  }
}

interface PautaForm {
  title: FormControl<string>
  description: FormControl<string | null>
  endDate: FormControl<Date | null>
  category: FormControl<string>
}
