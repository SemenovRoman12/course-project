import {ChangeDetectionStrategy, Component, ElementRef, Input, OnDestroy, OnInit} from '@angular/core';
import {BarChartModule, Color, ScaleType} from "@swimlane/ngx-charts";
import {
    MatExpansionPanel,
    MatExpansionPanelContent,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle
} from "@angular/material/expansion";
import {debounceTime, fromEvent, Subscription} from 'rxjs';
import {JsonPipe} from '@angular/common';
import {UserActivitiesVM} from '@features/profile/models/user-activities.model';
import {ChartMainConfig} from '@features/profile/models/charts.model';

@Component({
  selector: 'profile-charts',
  standalone: true,
  imports: [
    BarChartModule,
    MatExpansionPanel,
    MatExpansionPanelContent,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle,
    JsonPipe
  ],
  templateUrl: './profile-charts.component.html',
  styleUrl: './profile-charts.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileChartsComponent implements OnDestroy {

  @Input() chartData!: UserActivitiesVM[];

  public readonly stepsConfig = {
    stepsData: this.chartData[0].steps
  }

  stepsData = [
    { name: 'Пн', value: 8000 },
    { name: 'Вт', value: 12000 },
    { name: 'Ср', value: 9500 },
    { name: 'Чт', value: 11000 },
    { name: 'Пт', value: 7500 },
    { name: 'Сб', value: 15000 },
    { name: 'Вс', value: 13000 }
  ];

  public readonly mainConfig: ChartMainConfig = {
    view: [520, 312],
    colorScheme: {
      name: 'custom',
      selectable: true,
      group: ScaleType.Ordinal,
      domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
    },
    showXAxis: true,
    showYAxis: false,
    gradient: false,
    showLegend: false,
    showXAxisLabel: true,
    xAxisLabel: '',
    showYAxisLabel: false,
    yAxisLabel: '',
  }

  private resizeSubscription?: Subscription;

  constructor() {
    this.resizeSubscription = fromEvent(window, 'resize')
      .pipe(debounceTime(300))
      .subscribe(() => {
      });
  }

  getResponsiveView(): [number, number] {
    const width = window.innerWidth;

    if (width < 576) { // xs
      return [300, 200];
    } else if (width < 768) { // sm
      return [400, 250];
    } else if (width < 992) { // md
      return [350, 280];
    } else if (width < 1200) { // lg
      return [400, 300];
    } else { // xl
      return [450, 350];
    }
  }

  ngOnDestroy() {
    this.resizeSubscription?.unsubscribe();
  }
}
