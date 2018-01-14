``` javascript
const { createProject } = require('@lucidbyte/lucidbyte-js');
createProject({
  id,
  name,
  domains
});
```

Creates a new project with the provided options. Only the account owner may access this method, otherwise an error will be thrown.
