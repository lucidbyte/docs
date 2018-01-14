``` javascript
client.collection.set(
  _id,
  document,
  options
)
```

Modifies an existing document in a {{collection}}.

### Arguments

{{arg _id string}}

The document's _id.

{{arg document object}}

An object of `{ key: value }` pairs or any combination of mongodb [update operators](https://docs.mongodb.com/manual/reference/operator/update/#id1).

### Returns
An object with the following properties:

- `took <int>`

  Time in milliseconds that the database operation took to complete. This does not include network time between client -> server.

- `ok <int>`

- `changes <object>`

  A list of modifications applied to the collection.

  *note: only shows when `dev` option is enabled*
