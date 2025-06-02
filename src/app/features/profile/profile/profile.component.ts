import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  signal,
  ViewEncapsulation
} from '@angular/core';
import {UserEntity} from '@models/user.model';
import {Color, NgxChartsModule, ScaleType} from '@swimlane/ngx-charts';
import {
  MatAccordion,
  MatExpansionPanel,
  MatExpansionPanelDescription,
  MatExpansionPanelTitle,
  MatExpansionPanelHeader, MatExpansionPanelContent
} from '@angular/material/expansion';

@Component({
  selector: 'profile',
  standalone: true,
  imports: [
    NgxChartsModule,
    MatExpansionPanel,
    MatExpansionPanelDescription,
    MatExpansionPanelTitle,
    MatAccordion,
    MatExpansionPanelHeader,
    MatExpansionPanelContent
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ProfileComponent {
  @Input({required: true}) user!: UserEntity;


}
