Renders a login form component for your users to login with.

``` html
<html>
  <div id="LoginForm" />
</html>
```

``` javascript
const { LoginForm } = require('@lucidbyte/lucidbyte-js');
const config = {
  projectID, // <string>
  element: document.querySelector('#LoginForm')
};
LoginForm.render(config);
```

### Arguments

{{arg config object}}

{{arg config.projectID string}}

{{arg config.element DOMElement}}

A DOM element to render the component to, ie: `document.querySelector(myElement)`.
