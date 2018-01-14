``` javascript
collection.createIndex(
  fields,
  options
);
```

Adds an index to a {{collection}} using the provided fields.

### Arguments

{{arg fields object}}

An object of fields to create an index on.

{{arg options object}}

[Mongodb index options](https://docs.mongodb.com/manual/reference/method/db.collection.createIndex/index.html#ensureindex-options)

<div class="message is-info">
  <div class="message-header">Differences with Mongodb</div>
  <div class="message-body">
    By default, Mongodb creates indexes in the foreground, which is faster, but locks the database. Therefore, in order to keep things running smoothly for everyone, options will always be fixed to <code>{background: true}</code>.
  </div>
</div>


### Returns
An object with the following properties:

- `ok <int>`
