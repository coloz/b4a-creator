import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CreatorModule } from './creator/creator.module';
import { IconDefinition } from '@ant-design/icons-angular';
import {
  CheckOutline, DownloadOutline, CodeOutline, FileAddOutline,
  SaveOutline, FolderOpenOutline, MonitorOutline, SettingOutline,
  RightOutline, RightCircleOutline, LoadingOutline, CloudOutline,
  SearchOutline, EnterOutline, AppstoreAddOutline, CloudDownloadOutline,
  LeftCircleOutline, GlobalOutline, GithubOutline, DeleteOutline
} from '@ant-design/icons-angular/icons';
import { NzIconModule } from 'ng-zorro-antd/icon';

const icons: IconDefinition[] = [CheckOutline, DownloadOutline, CodeOutline, FileAddOutline,
  SaveOutline, FolderOpenOutline, MonitorOutline, SettingOutline, RightOutline, RightCircleOutline,
  LoadingOutline, CloudOutline, SearchOutline, EnterOutline, AppstoreAddOutline, CloudDownloadOutline,
  LeftCircleOutline, GlobalOutline, GithubOutline, DeleteOutline
];

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzIconModule.forRoot(icons)
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent]
})
export class AppModule { }
