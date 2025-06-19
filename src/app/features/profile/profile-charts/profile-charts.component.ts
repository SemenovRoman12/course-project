import {ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener, Input, OnDestroy, OnInit} from '@angular/core';
import {BarChartModule, ScaleType} from "@swimlane/ngx-charts";
import {
  MatExpansionPanel,
  MatExpansionPanelContent,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle
} from "@angular/material/expansion";
import {debounceTime, fromEvent, Subscription} from 'rxjs';
import {JsonPipe} from '@angular/common';
import {UserActivitiesVM} from '@features/profile/data-access/models/user-activities.model';
import {ActivitiesData, ChartMainConfig} from '@features/profile/data-access/models/charts.model';

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
export class ProfileChartsComponent implements OnInit, OnDestroy {
  private resizeSubscription?: Subscription;

  @Input({required: true})
  set activitiesData(data: UserActivitiesVM[]) {
    const actualData = data.slice(-7)

    this.chartsDataConfig = {
      steps: [
        { name: actualData[0].date, value: actualData[0].steps },
        { name: actualData[1].date, value: actualData[1].steps },
        { name: actualData[2].date, value: actualData[2].steps },
        { name: actualData[3].date, value: actualData[3].steps },
        { name: actualData[4].date, value: actualData[4].steps },
        { name: actualData[5].date, value: actualData[5].steps },
        { name: actualData[6].date, value: actualData[6].steps }
      ],
      activeMinutes: [
        { name: actualData[0].date, value: actualData[0].activeMinutes },
        { name: actualData[1].date, value: actualData[1].activeMinutes },
        { name: actualData[2].date, value: actualData[2].activeMinutes },
        { name: actualData[3].date, value: actualData[3].activeMinutes },
        { name: actualData[4].date, value: actualData[4].activeMinutes },
        { name: actualData[5].date, value: actualData[5].activeMinutes },
        { name: actualData[6].date, value: actualData[6].activeMinutes }
      ],
      calories: [
        { name: actualData[0].date, value: actualData[0].calories },
        { name: actualData[1].date, value: actualData[1].calories },
        { name: actualData[2].date, value: actualData[2].calories },
        { name: actualData[3].date, value: actualData[3].calories },
        { name: actualData[4].date, value: actualData[4].calories },
        { name: actualData[5].date, value: actualData[5].calories },
        { name: actualData[6].date, value: actualData[6].calories }
      ],
      distance: [
        { name: actualData[0].date, value: actualData[0].distance },
        { name: actualData[1].date, value: actualData[1].distance },
        { name: actualData[2].date, value: actualData[2].distance },
        { name: actualData[3].date, value: actualData[3].distance },
        { name: actualData[4].date, value: actualData[4].distance },
        { name: actualData[5].date, value: actualData[5].distance },
        { name: actualData[6].date, value: actualData[6].distance }
      ],
      heartRateAvg: [
        { name: actualData[0].date, value: actualData[0].heartRateAvg },
        { name: actualData[1].date, value: actualData[1].heartRateAvg },
        { name: actualData[2].date, value: actualData[2].heartRateAvg },
        { name: actualData[3].date, value: actualData[3].heartRateAvg },
        { name: actualData[4].date, value: actualData[4].heartRateAvg },
        { name: actualData[5].date, value: actualData[5].heartRateAvg },
        { name: actualData[6].date, value: actualData[6].heartRateAvg }
      ],
      sleepQuality: [
        { name: actualData[0].date, value: actualData[0].sleepQuality },
        { name: actualData[1].date, value: actualData[1].sleepQuality },
        { name: actualData[2].date, value: actualData[2].sleepQuality },
        { name: actualData[3].date, value: actualData[3].sleepQuality },
        { name: actualData[4].date, value: actualData[4].sleepQuality },
        { name: actualData[5].date, value: actualData[5].sleepQuality },
        { name: actualData[6].date, value: actualData[6].sleepQuality }
      ]
    }
  };

  public chartsDataConfig: ActivitiesData = {
    steps: [
      { name: '', value: 0 },
      { name: '', value: 0 },
      { name: '', value: 0 },
      { name: '', value: 0 },
      { name: '', value: 0 },
      { name: '', value: 0 },
      { name: '', value: 0 }
    ],
    activeMinutes: [
      { name: '', value: 0 },
      { name: '', value: 0 },
      { name: '', value: 0 },
      { name: '', value: 0 },
      { name: '', value: 0 },
      { name: '', value: 0 },
      { name: '', value: 0 }
    ],
    calories: [
      { name: '', value: 0 },
      { name: '', value: 0 },
      { name: '', value: 0 },
      { name: '', value: 0 },
      { name: '', value: 0 },
      { name: '', value: 0 },
      { name: '', value: 0 }
    ],
    distance: [
      { name: '', value: 0 },
      { name: '', value: 0 },
      { name: '', value: 0 },
      { name: '', value: 0 },
      { name: '', value: 0 },
      { name: '', value: 0 },
      { name: '', value: 0 }
    ],
    heartRateAvg: [
      { name: '', value: 0 },
      { name: '', value: 0 },
      { name: '', value: 0 },
      { name: '', value: 0 },
      { name: '', value: 0 },
      { name: '', value: 0 },
      { name: '', value: 0 }
    ],
    sleepQuality: [
      { name: '', value: 0 },
      { name: '', value: 0 },
      { name: '', value: 0 },
      { name: '', value: 0 },
      { name: '', value: 0 },
      { name: '', value: 0 },
      { name: '', value: 0 }
    ]
  }

  public mainConfig: ChartMainConfig = {
    view: [520, 312],
    colorScheme: {
      name: 'custom',
      selectable: true,
      group: ScaleType.Ordinal,
      domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
    },
    showXAxis: true,
    showYAxis: true,
    gradient: false,
    showLegend: false,
    showXAxisLabel: true,
    xAxisLabel: '',
    showYAxisLabel: false,
    yAxisLabel: '',
  }

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.updateChartSize();
    this.setupResizeListener();
  }

  ngOnDestroy() {
    if (this.resizeSubscription) {
      this.resizeSubscription.unsubscribe();
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.updateChartSize();
  }

  private setupResizeListener(): void {
    this.resizeSubscription = fromEvent(window, 'resize')
      .pipe(debounceTime(250))
      .subscribe(() => {
        this.updateChartSize();
      });
  }

  private updateChartSize(): void {
    const windowWidth = window.innerWidth;

    if (windowWidth < 576) {
      this.mainConfig.view = [300, 220];
    } else if (windowWidth < 768) {
      this.mainConfig.view = [400, 280];
    } else if (windowWidth < 992) {

      this.mainConfig.view = [450, 300];
    } else if (windowWidth < 1200) {

      this.mainConfig.view = [480, 312];
    } else {

      this.mainConfig.view = [520, 312];
    }

    this.cdr.detectChanges();
  }
}
