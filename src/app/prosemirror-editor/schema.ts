import { nodes as basicNodes, marks as basicMarks } from 'prosemirror-schema-basic';
import { MarkSpec, NodeSpec, Schema } from 'prosemirror-model';

export const nodes: { [name in string]: NodeSpec } = {
  doc: basicNodes.doc,
  paragraph: basicNodes.paragraph,
  heading: basicNodes.heading,
  text: basicNodes.text,
};

export const marks: { [name in string]: MarkSpec } = {
  link: basicMarks.link,
  em: basicMarks.em,
  strong: basicMarks.strong
};

export const schema = new Schema({nodes, marks});
