import asText from './astext';
import Tree from './tree';
import Serialize from './serialize';
import { NODE_TYPES } from './types';

export const Elements = NODE_TYPES;

export { asText };

export const asTree = Tree.fromRichText;

export const serialize = Serialize;
