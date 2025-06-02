import {ChangeDetectionStrategy, Component, ElementRef, HostListener, OnInit} from '@angular/core';
import {BarChartModule, Color, ScaleType} from "@swimlane/ngx-charts";
import {
    MatExpansionPanel,
    MatExpansionPanelContent,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle
} from "@angular/material/expansion";

@Component({
  selector: 'profile-charts',
  standalone: true,
    imports: [
        BarChartModule,
        MatExpansionPanel,
        MatExpansionPanelContent,
        MatExpansionPanelHeader,
        MatExpansionPanelTitle
    ],
  templateUrl: './profile-charts.component.html',
  styleUrl: './profile-charts.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileChartsComponent implements OnInit {
  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    this.updateChartSize();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.updateChartSize();
  }

  updateChartSize(): void {
    const container = this.el.nativeElement.querySelector('.chart');
    if (container) {
      const containerWidth = container.clientWidth;
      const newWidth = Math.min(Math.max(containerWidth, 320), 520);
      const newHeight = Math.round(newWidth * 0.6);
      this.view = [newWidth, newHeight];
    }
  }

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
}
