# Prismic RichText

A helper to build generic tree from rich text raw json

## Get a generic tree from a richtext

```javascript
import { asTree } from 'prismic-richtext';
asTree(doc.data.myRichText);
```

### Get a serialized tree from a richtext

You can find an example here: [https://github.com/prismicio/prismic-dom/blob/master/src/index.js](https://github.com/prismicio/prismic-dom/blob/master/src/index.js)

```javascript
  import {serialize} from 'prismic-richtext';

  // define a serialize function to manage your fragment
  // you can use the 'Element' Helper from PrismicRichText to match the different fragments
  function customSerializer() {...}

  serialize(doc.data.myRichText, customSerializer, htmlSerializer)
```
