import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {AuthFacade} from '@auth/auth.facade';
import {HttpClient} from '@angular/common/http';
import {ApiService} from '@core/http/api.service';
import {filter} from 'rxjs';

export interface UserActivity {
  id: number;
  user_id: number;
  date: string;
  steps: number;
  distance: number;
  calories: number;
  heartRateAvg: number;
  heartRateMax: number;
  stressLevel: number;
  sleepQuality: number;
  activeMinutes: number;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit{
  private readonly authFacade = inject(AuthFacade);
  http = inject(HttpClient);
  apiService = inject(ApiService);

  ngOnInit() {
    this.apiService.get<UserActivity[]>('/activity?_relations=users&user_id=1').pipe(

    ).subscribe((v) => {

      console.log(v)
    });

    this.authFacade.getUser();
  }
}
