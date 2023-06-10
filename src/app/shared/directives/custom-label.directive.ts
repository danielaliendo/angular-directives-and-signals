import { Directive, ElementRef, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[customLabel]'
})

export class CustomLabelDirective implements OnInit {

  private htmlElement?: ElementRef<HTMLElement>
  private _color?: string
  private _errors?: ValidationErrors | null

  @Input() set color(value: string) {
    this._color = value
    this.setStyle()
  }

  @Input() set errors(value: ValidationErrors | null) {
    this._errors = value
    this.setErrorMessage();
  }

  constructor(
    private el: ElementRef<HTMLElement>,
  ) {
    this.htmlElement = el
  }

  ngOnInit() {
    this._color = this.color
    this.setStyle()
  }

  setStyle(): void {
    if (!this.htmlElement) return
    if (!this._color) return

    this.htmlElement.nativeElement.style.color = this._color
  }

  setErrorMessage(): void {
    if (!this.htmlElement) return
    if (!this._errors) {
      this.htmlElement.nativeElement.innerText = ''
      return
    }

    const errors = Object.keys(this._errors)

    if (errors.includes('required')) {
      this.htmlElement.nativeElement.innerText = 'This field is required'
      return
    }

    if (errors.includes('email')) {
      this.htmlElement.nativeElement.innerText = 'Invalid email'
      return
    }

    if (errors.includes('minlength')) {
      const min = this._errors['minlength'].requiredLength
      const current = this._errors['minlength'].actualLength

      this.htmlElement.nativeElement.innerText = `Min length is ${min}, current is ${current}`
      return
    }

  }

}
