```javascript
client.query(filter, options);

const filter = { ... }; // mongodb filter operators
const options = {
  sort: { ... } // mongodb sort options
  page: Number,
  hitsPerPage: Number
  projection: { ... } // key:value pairs of fields to return.
};
```

Returns items from a [`collection`](#/docs/API/client/collection).

### Arguments

{{arg filter object}}

Filters documents in a collection. Supports all [mongoDB query selectors](https://docs.mongodb.com/manual/reference/operator/query/index.html#query-selectors).

### Example

Given this dataset:

```json
[
  {
    "_id": "item_1",
    "done": false
  },
  {
    "_id": "item_2",
    "done": true
  },
  {
    "_id": "item_3",
    "done": true
  }
]
```

The following filter reduces the dataset to all items that have the property `done` equal to `true`:
```javascript
const result = await collection
  .query({ done: true });
console.log(result);
/* logs
[
  {
    "_id": "item_2",
    "done": true
  }
  {
    "_id": "item_3",
    "done": true
  }
]
 */
```

{{arg options object}}

{{arg options.sort object}}

Mongodb [sort options](https://docs.mongodb.com/manual/reference/method/cursor.sort/index.html)

{{arg options.limit number}}

Number of results per page

{{arg options.page number}}

Zero-based index of pages to skip multiplied by `options.hitsPerPage`

{{arg options.projection object}}

An object of `key:value` pairs to include / exclude fields, where a value of `1` includes the field and `0` excludes the field. Supports all [mongodb projection operators](https://docs.mongodb.com/manual/reference/operator/query/index.html#projection-operators).

#### Example - return only the `done` and `timestamp` fields

```javascript
ref.query(null, {
  projection: {
    done: 1,
    timestamp: 1
  }
})
```
