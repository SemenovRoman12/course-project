import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {UserEntity} from '@models/user.model';

@Component({
  selector: 'profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent {
  @Input({required: true}) user!: UserEntity;


}
