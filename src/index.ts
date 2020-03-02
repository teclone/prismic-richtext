import asText from './astext';
import Tree from './tree';
import Serialize from './serialize';
import { NODE_TYPES } from './types';

const asTree = Tree.fromRichText;

export { NODE_TYPES as Elements, asText, asTree, Serialize as serialize };
