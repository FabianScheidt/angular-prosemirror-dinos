import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Node } from 'prosemirror-model';
import { EditorState, Plugin } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { undo, redo, history } from 'prosemirror-history';
import { keymap } from 'prosemirror-keymap';
import { baseKeymap, toggleMark } from 'prosemirror-commands';
import { schema } from './schema';
import { makeMenu } from './menu';

@Component({
  selector: 'app-prosemirror',
  templateUrl: './prosemirror.component.html',
  styleUrls: ['./prosemirror.component.scss']
})
export class ProsemirrorComponent implements AfterViewInit {

  @ViewChild('editorWrapper') editorWrapper: ElementRef;

  private menu = makeMenu();
  private savedDocument = JSON.stringify({
    type: 'doc',
    content: [
      {
        type: 'paragraph',
        content: [
          {type: 'text', text: 'Lorem Ipsum '},
          {type: 'text', marks: [{type: 'strong'}], text: 'dolor'},
          {type: 'text', text: ' sit'}
        ]
      },
      {type: 'paragraph', content: [{type: 'text', text: 'Element 1'}]},
      {type: 'paragraph', content: [{type: 'text', text: 'Element 2'}]},
      {type: 'paragraph', content: [{type: 'text', text: 'Element 3'}]},
    ]
  });
  private view: EditorView;

  constructor() {}

  public ngAfterViewInit(): void {
    const state = EditorState.create({
      schema,
      plugins: this.getEditorPlugins(),
    });
    this.view = new EditorView(this.editorWrapper.nativeElement, { state });
    this.loadSavedDocument();
  }

  public storeSavedDocument(): void {
    this.savedDocument = JSON.stringify(this.view.state.doc.toJSON());
  }

  public loadSavedDocument() {
    const doc = Node.fromJSON(schema, JSON.parse(this.savedDocument));
    const state = EditorState.create({
      schema,
      plugins: this.getEditorPlugins(),
      doc,
    });
    this.view.updateState(state);
  }

  protected getEditorPlugins(): Plugin[] {
    return [
      history(),
      keymap({
        'Mod-z': undo,
        'Mod-y': redo,
        'Mod-b': toggleMark(schema.marks.strong),
        'Mod-i': toggleMark(schema.marks.em)
      }),
      keymap(baseKeymap),
      this.menu
    ];
  }
}
