### How data is stored

Each piece of data is stored as a JSON **document** within a **collection**. Here's a visualization of how each collection looks in the database:

```bash
# collectionA
[
  {
    "_id": "<unique document id>",
    <custom_field>: <custom_value>,
    # ... more fields
  },
  # ... more documents
]

# collectionB
[
  # ... documents
]
```

### Reference a project

Every database interaction starts with a reference to a project.

```javascript
// load the library
const lucidbyte = require('@lucidbyte/lucidbyte-js');
// client points to the projectID
const project = lucidbyte.client(projectID);
```

### Reference a collection

Now that we have a project reference, we can create a reference to a collection:

```javascript
const collection = project.collection('todos');
```

### Add a document

Once we have a collection we can start manipulating the database:

```javascript
const writeResult = collection
.insert({
  text: 'buy eggs',
  done: false
});
```

After each mutative operation (set, insert, update, delete) a `writeResult` object is returned.

### Update a document

Using the `writeResult` from the previous example, we can update a document by its {{_id}}:

```javascript
const { _id } = writeResult.changes[0];
$collection
  .set(_id, { done: true })
```

### Delete a document

Similarly, we can delete a document by its {{_id}}:

```javascript
const { _id } = writeResult.changes[0];
$collection
  .delete(_id)
```

### Querying documents

TODO: documentation #mvp
