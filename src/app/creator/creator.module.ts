import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreatorComponent } from './creator.component';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FormsModule } from '@angular/forms';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { MonacoEditorModule } from '@materia-ui/ngx-monaco-editor';
import { BlockPreviewComponent } from './block-preview/block-preview.component';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NgxColorsModule } from 'ngx-colors';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';

@NgModule({
  declarations: [
    CreatorComponent,
    BlockPreviewComponent
  ],
  imports: [
    CommonModule,
    NzInputModule,
    NzButtonModule,
    FormsModule,
    NzModalModule,
    NzIconModule,
    MonacoEditorModule,
    NzRadioModule,
    NgxColorsModule, 
    NzSelectModule,
    NzCheckboxModule,
    NzDividerModule,
    NzToolTipModule,
    NzMessageModule,
    NzInputNumberModule
  ],
  exports: [
    CreatorComponent
  ]
})
export class CreatorModule { }
