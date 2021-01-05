import { nodes as basicNodes, marks as basicMarks } from 'prosemirror-schema-basic';
import { MarkSpec, NodeSpec, Schema } from 'prosemirror-model';

export const dinos = ['brontosaurus', 'stegosaurus', 'triceratops', 'tyrannosaurus', 'pterodactyl'];

const dinoNodeSpec: NodeSpec = {
  attrs: {type: {default: 'brontosaurus'}},
  inline: true,
  group: 'inline',
  draggable: true,
  toDOM: (node) => {
    const dinoType = node.attrs.dinoType;
    const img = document.createElement('img');
    img.setAttribute('data-dino-type', dinoType);
    img.title = dinoType;
    img.src = 'https://prosemirror.net/img/dino/' + node.attrs.type + '.png';
    img.classList.add('dinosaur');
    return img;
  },
  parseDOM: [{
    tag: 'img[data-dino-type]',
    getAttrs: (dom) => {
      if (typeof dom === 'string' || !(dom instanceof Element)) {
        return false;
      }
      const type = dom.getAttribute('data-dino-type');
      return dinos.indexOf(type) > -1 ? { type } : false;
    },
  }]
};

export const nodes: { [name in string]: NodeSpec } = {
  doc: basicNodes.doc,
  paragraph: basicNodes.paragraph,
  heading: basicNodes.heading,
  text: basicNodes.text,
  dino: dinoNodeSpec,
};

export const marks: { [name in string]: MarkSpec } = {
  link: basicMarks.link,
  em: basicMarks.em,
  strong: basicMarks.strong
};

export const schema = new Schema({nodes, marks});
