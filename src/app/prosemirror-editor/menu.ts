import { Plugin } from 'prosemirror-state';
import { toggleMark, setBlockType, wrapIn } from 'prosemirror-commands';
import { schema } from './schema';

class MenuView {
  items;
  editorView;
  dom;

  constructor(items, editorView) {
    this.items = items;
    this.editorView = editorView;

    this.dom = document.createElement('div');
    this.dom.className = 'menubar';
    items.forEach(({dom}) => this.dom.appendChild(dom));
    this.update();

    this.dom.addEventListener('mousedown', e => {
      e.preventDefault();
      editorView.focus();
      items.forEach(({command, dom}) => {
        if (dom.contains(e.target)) {
          command(editorView.state, editorView.dispatch, editorView);
        }
      });
    });
  }

  public update(): void {
    this.items.forEach(({command, dom}) => {
      const active = command(this.editorView.state, null, this.editorView);
      dom.style.display = active ? '' : 'none';
    });
  }

  public destroy(): void {
    this.dom.remove();
  }
}

export const makeMenu = () => {
  function menuPlugin(items) {
    return new Plugin({
      view(editorView) {
        const menuView = new MenuView(items, editorView);
        editorView.dom.parentNode.insertBefore(menuView.dom, editorView.dom);
        return menuView;
      }
    });
  }

  // Helper function to create menu icons
  function icon(text, name) {
    const span = document.createElement('span');
    span.className = 'menuicon ' + name;
    span.title = name;
    span.textContent = text;
    return span;
  }

  // Create an icon for a heading at the given level
  function heading(level) {
    return {
      command: setBlockType(schema.nodes.heading, {level}),
      dom: icon('H' + level, 'heading')
    };
  }


  return menuPlugin([
    {command: toggleMark(schema.marks.strong), dom: icon('B', 'strong')},
    {command: toggleMark(schema.marks.em), dom: icon('i', 'em')},
    {command: setBlockType(schema.nodes.paragraph), dom: icon('p', 'paragraph')},
    heading(1), heading(2), heading(3),
    {command: wrapIn(schema.nodes.blockquote), dom: icon('>', 'blockquote')},
  ]);
};
