``` javascript
collection.insert(document);
```

Adds a new document to a {{collection}}. Automatically adds a new {{_id}} field to the document.

### Arguments

{{arg document object}}

An object of `{ key: value }` pairs.

### Returns
An object with the following properties:

- `ok <int>`
