import { Component, Input, ViewChild } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MapInfoWindow, MapMarker } from '@angular/google-maps';
import { Observable} from 'rxjs';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent {
  @Input() markers: any[] | undefined;
  @Input() center: any| undefined;
  @ViewChild(MapInfoWindow) infoWindow: MapInfoWindow | undefined
  markerContent:string=""
  apiLoaded: Observable<boolean>;
  zoom = 8;
  constructor(public fetchApiData: FetchApiDataService) {
    this.apiLoaded = this.fetchApiData.getMap();
   }
   openInfoWindow(marker: any, textContent: any) {
    this.markerContent = textContent;
    this.infoWindow?.open(marker);
  }
}
