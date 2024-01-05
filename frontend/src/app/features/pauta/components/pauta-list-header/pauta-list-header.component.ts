import { Component, EventEmitter, Output } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { MatButtonModule } from '@angular/material/button'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'

@Component({
  selector: 'app-pauta-list-header',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    FormsModule
  ],
  templateUrl: './pauta-list-header.component.html',
  styleUrl: './pauta-list-header.component.scss'
})
export class PautaListHeaderComponent {
  @Output()
  createPautaClick = new EventEmitter<void>()

  @Output()
  searchPauta = new EventEmitter<string>()

  value = ''

  cleanSearch() {
    this.value = ''
    this.searchPauta.emit(this.value)
  }
}
