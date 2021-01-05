import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ProsemirrorEditorModule } from './prosemirror-editor/prosemirror-editor.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ProsemirrorEditorModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
