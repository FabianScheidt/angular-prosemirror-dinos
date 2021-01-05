import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProsemirrorComponent } from './prosemirror.component';


@NgModule({
  declarations: [
    ProsemirrorComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ProsemirrorComponent,
  ]
})
export class ProsemirrorEditorModule { }
