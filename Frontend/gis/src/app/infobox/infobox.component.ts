import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AggregationLevel} from '../map/options/aggregation-level';
import {
  CovidNumberCaseChange,
  CovidNumberCaseNormalization,
  CovidNumberCaseOptions,
  CovidNumberCaseTimeWindow,
  CovidNumberCaseType
} from '../map/options/covid-number-case-options';
import { ColormapService } from '../services/colormap.service';

@Component({
  selector: 'app-infobox',
  templateUrl: './infobox.component.html',
  styleUrls: ['./infobox.component.less']
})
export class InfoboxComponent implements OnInit {

  constructor(
    private colormapService: ColormapService
  ) { }

  glyphLegend = [
    {name: 'ICU low', description: 'ICU low care = Monitoring, nicht-invasive Beatmung (NIV), keine Organersatztherapie'}, 
    {name: 'ICU high', description: 'ICU high care = Monitoring, invasive Beatmung, Organersatztherapie, vollständige intensivmedizinische Therapiemöglichkeiten'}, 
    {name: 'ECMO', description: 'ECMO = Zusätzlich ECMO'}
  ];
  glyphLegendColors = ['Verfügbar', 'Begrenzt', 'Ausgelastet', 'Nicht verfügbar'];

  infoboxExtended = true;

  @Input()
  aggregationLevel: AggregationLevel;

  @Output()
  aggregationLevelChange: EventEmitter<AggregationLevel> = new EventEmitter();

  @Input()
  showOsmHospitals: boolean;

  @Output()
  showOsmHospitalsChange: EventEmitter<boolean> = new EventEmitter();

  @Input()
  showOsmHeliports: boolean;

  @Output()
  showOsmHeliportsChange: EventEmitter<boolean> = new EventEmitter();

  @Input()
  caseChoroplethOptions: CovidNumberCaseOptions;

  @Output()
  caseChoroplethOptionsChange: EventEmitter<CovidNumberCaseOptions> = new EventEmitter();

  covidNumberCaseTimeWindow = CovidNumberCaseTimeWindow;

  covidNumberCaseChange = CovidNumberCaseChange;

  covidNumberCaseType = CovidNumberCaseType;

  covidNumberCaseNormalization = CovidNumberCaseNormalization;

  ngOnInit(): void {
  }

  emitCaseChoroplethOptions() {
    // console.log('emit', this.caseChoroplethOptions);

    if(this.caseChoroplethOptions.change === CovidNumberCaseChange.relative) {
      this.caseChoroplethOptions.normalization = CovidNumberCaseNormalization.absolut;

      if (this.caseChoroplethOptions.timeWindow === CovidNumberCaseTimeWindow.all) {
        this.caseChoroplethOptions.timeWindow = CovidNumberCaseTimeWindow.twentyFourhours;
      }
    }
    this.caseChoroplethOptionsChange.emit({...this.caseChoroplethOptions});
  }

}
