import { OverlayModule } from '@angular/cdk/overlay';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { APP_BASE_HREF, DatePipe, DecimalPipe, PlatformLocation, registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import localeDe from '@angular/common/locales/de';
import { ErrorHandler, LOCALE_ID, NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatStepperModule } from "@angular/material/stepper";
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NouisliderModule } from "ng2-nouislider";
import { NgxWebstorageModule } from 'ngx-webstorage';
import { AboutComponent } from './about/about.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BedTooltipComponent } from './bed-tooltip/bed-tooltip.component';
import { ButtonPanelComponent } from './button-panel/button-panel.component';
import { CaseDialogComponent } from './case-dialog/case-dialog.component';
import { CaseInfoComponent } from './case-info/case-info.component';
import { CaseTooltipComponent } from './case-tooltip/case-tooltip.component';
import { GlyphTooltipComponent } from './glyph-tooltip/glyph-tooltip.component';
import { HelpDialogBedsComponent } from './help-dialog-beds/help-dialog-beds.component';
import { HelpDialogCasesComponent } from './help-dialog-cases/help-dialog-cases.component';
import { HelpDialogTheprojectComponent } from './help-dialog-theproject/help-dialog-theproject.component';
import { HelpDialogComponent } from './help-dialog/help-dialog.component';
import { HospitalInfoDialogComponent } from './hospital-info-dialog/hospital-info-dialog.component';
import { HospitalInfoComponent } from './hospital-info/hospital-info.component';
import { HospitalSearchComponent } from './hospital-search/hospital-search.component';
import { ImpressumComponent } from './impressum/impressum.component';
import { InfoboxComponent } from './infobox/infobox.component';
import { LegendComponent } from './legend/legend.component';
import { MapRootComponent } from './map-root/map-root.component';
import { MapComponent } from './map/map.component';
import { OsmTooltipComponent } from './osm-tooltip/osm-tooltip.component';
import { OverlayBrandComponent } from './overlay-brand/overlay-brand.component';
import { PlusminusPipe } from './plusminus.pipe';
import { SentryErrorHandler } from './sentry-config';
import { SupportedLocales } from './services/i18n.service';
import { ShareDialogComponent } from './share-dialog/share-dialog.component';
import { TimesliderComponent } from './timeslider/timeslider.component';
import { TranslatePipe } from './translate.pipe';
import localeEn from './util/locales/en';
import { VegaComponent } from './vega/vega.component';








// the second parameter 'fr-FR' is optional
registerLocaleData(localeDe, 'de-DE');
registerLocaleData(localeEn, 'en-US');

const localeProvider = {
  provide: LOCALE_ID,
  useFactory: (s: PlatformLocation) => {

    let locale: SupportedLocales = null;

    // get from localStorage
    // if(storedLocale) {
    //   locale = storedLocale;
    // }

    // get form base url e.g. /en/ /de/
    if(locale === null) {
      const strippedBase = s.getBaseHrefFromDOM().replace(/\//g, '');
      if(strippedBase.length === 2) {
        for(const l of Object.values(SupportedLocales)) {
          if(l.startsWith(strippedBase)) {
            locale = l;
            break;
          }
        }
      }
    }

    // get from browser settings
    if(locale === null) {
      const navL = navigator.language.slice(0, 2);
      for(const l of Object.values(SupportedLocales)) {
        if(l.slice(0, 2) === navL) {
          locale = l;
          break;
        }
      }
    }

    // if it still null use en-US as default
    if(locale === null) {
      locale = SupportedLocales.EN_US;
    }

    return locale;
  },
  deps: [PlatformLocation]
}


@NgModule({
  entryComponents: [
    GlyphTooltipComponent,
    OsmTooltipComponent
  ],
  declarations: [
    AppComponent,
    MapComponent,
    GlyphTooltipComponent,
    CaseTooltipComponent,
    OverlayBrandComponent,
    InfoboxComponent,
    HospitalInfoComponent,
    HospitalInfoDialogComponent,
    LegendComponent,
    PlusminusPipe,
    AboutComponent,
    ImpressumComponent,
    VegaComponent,
    HelpDialogComponent,
    TranslatePipe,
    OsmTooltipComponent,
    CaseInfoComponent,
    CaseDialogComponent,
    MapRootComponent,
    ShareDialogComponent,
    ButtonPanelComponent,
    BedTooltipComponent,
    HospitalSearchComponent,
    TimesliderComponent,
    HelpDialogBedsComponent,
    HelpDialogCasesComponent,
    HelpDialogTheprojectComponent
  ],
  imports: [
    BrowserModule,
    NgxWebstorageModule.forRoot(),
    HttpClientModule,
    FormsModule,
    OverlayModule,
    BrowserAnimationsModule,
    MatButtonToggleModule,
    MatCardModule,
    MatSlideToggleModule,
    MatListModule,
    MatDividerModule,
    ScrollingModule,
    MatExpansionModule,
    MatTooltipModule,
    MatIconModule,
    MatRadioModule,
    MatButtonModule,
    MatFormFieldModule,
    MatDialogModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatDialogModule,
    MatSelectModule,
    MatSnackBarModule,
    MatStepperModule,
    AppRoutingModule,
    MatInputModule,
    MatCheckboxModule,
    MatTabsModule,
    MatToolbarModule,
    FlexLayoutModule,
    NouisliderModule,
    MatSliderModule,
    MatAutocompleteModule,
    ReactiveFormsModule
  ],
  providers: [
    localeProvider, 
    {
      provide: APP_BASE_HREF,
      useFactory: (s: PlatformLocation) => s.getBaseHrefFromDOM(),
      deps: [PlatformLocation]
    },
    PlusminusPipe, 
    DecimalPipe, 
    DatePipe,
    TranslatePipe,
    { 
      provide: ErrorHandler, 
      useClass: SentryErrorHandler 
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
