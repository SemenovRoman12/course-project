import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatButton, MatFabButton} from '@angular/material/button';
import {RecommendationFacadeService} from '@features/recommendations/data-access/recommendation.facade.service';
import {FormType} from '@models/form.type';
import {RecommendationRequestPayload} from '@features/recommendations/data-access/models/recommendation.model';

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
  private readonly recommendationFacade = inject(RecommendationFacadeService);

  public readonly recommendationsForm: FormGroup<FormType<RecommendationRequestPayload>> = this.fb.group({
    goal: ['', [Validators.required, Validators.maxLength(32), Validators.minLength(5)]],
  })

  public onSubmit(): void {
    this.recommendationFacade.requestRecommendation(this.recommendationsForm.value as {goal: string});
  }
}
