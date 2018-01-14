``` javascript
collection.delete(_id);
```

Deletes a single document in a {{collection}}.

### Arguments
{{ arg _id string }}

The {{ _id }} of the document to delete.

### Returns
A `writeResult` object with the following properties:

- `took <int>`

  Time in milliseconds that the database operation took to complete. This does not include network time between client -> server.

- `ok <int>`
