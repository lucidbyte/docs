``` javascript
client.update(
  _id, // <string>
  document, // <object>
  options // <object>
)
```

Updates a single document from a {{collection}}.

### Arguments

{{arg _id string}}

The `_id` of the document to update.

{{arg document object}}

An object of `{ key: value }` pairs to update the document with. Updates the document by overwriting the provided fields.

{{arg options object}}

### Returns
An object with the following properties:

- `took <int>`

  Time in milliseconds that the database operation took to complete. This does not include network time between client -> server.

- `ok <int>`
