import { Component, EventEmitter, Input, Output } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  @Input()
  title!: string

  @Input()
  showButtons = true

  @Input()
  primaryButtonLabel?: string

  @Output()
  primaryButtonAction = new EventEmitter<void>()

  @Input()
  secondaryButtonLabel?: string

  @Output()
  secondaryButtonAction = new EventEmitter<void>()
}
