# {{pkgName}}

> {{pkgDesc}}

## Install

```bash
$ {{pkgManager.cmd}} {{#ifEq pkgManager.cmd 'npm'}}install{{else}}add{{/ifEq}} {{pkgName}}
```

## Usage

```js
const {{camelLibName}} = require('{{pkgName}}')

// or

import {{camelLibName}} from '{{pkgName}}'
```

## License

{{license}} © [{{authorFullName}}](https://github.com/{{authorGithubHandle}})