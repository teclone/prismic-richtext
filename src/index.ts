import asText from './astext';
import Tree from './tree';
import Serialize from './serialize';
import { NODE_TYPES } from './types';

const asTree = Tree.fromRichText;

export default { Elements: NODE_TYPES, asText, asTree, serialize: Serialize };
