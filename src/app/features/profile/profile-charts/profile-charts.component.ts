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

  @Input() chartData: any = [];

  data = [
    { name: 'Пн', value: 12000 },
    { name: 'Вт', value: 15000 },
    { name: 'Ср', value: 8000 },
    { name: 'Чт', value: 14000 },
    { name: 'Пт', value: 10000 },
    { name: 'Сб', value: 20000 },
    { name: 'Вс', value: 17000 },
  ];

  colorScheme: Color = {
    name: 'custom',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  view: [number, number] = [520, 312];
  showXAxis: boolean = true;
  showYAxis: boolean = false;
  gradient: boolean = false;
  showLegend: boolean = false;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = '';
  showYAxisLabel: boolean = false;
  yAxisLabel: string = '';

  // Существующие переменные...

  private resizeSubscription?: Subscription;

  constructor() {
    // Подписка на изменение размера окна
    this.resizeSubscription = fromEvent(window, 'resize')
      .pipe(debounceTime(300))
      .subscribe(() => {
      });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.resizeSubscription?.unsubscribe();
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

  // Примеры данных для графиков
  stepsData = [
    { name: 'Пн', value: 8000 },
    { name: 'Вт', value: 12000 },
    { name: 'Ср', value: 9500 },
    { name: 'Чт', value: 11000 },
    { name: 'Пт', value: 7500 },
    { name: 'Сб', value: 15000 },
    { name: 'Вс', value: 13000 }
  ];
}
