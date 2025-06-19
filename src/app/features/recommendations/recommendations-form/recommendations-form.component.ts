import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatButton, MatFabButton} from '@angular/material/button';

@Component({
  selector: 'recommendations-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatFabButton,
    MatButton,
    MatLabel
  ],
  templateUrl: './recommendations-form.component.html',
  styleUrl: './recommendations-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecommendationsFormComponent {
  private readonly fb = inject(FormBuilder);

  public readonly recommendationsForm = this.fb.group({
    goal: ['', [Validators.required]],
  })

  public onSubmit() {
    console.log(this.recommendationsForm.value)
  }
}
