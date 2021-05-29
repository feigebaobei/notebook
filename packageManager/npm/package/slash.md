# overview
把window环境下路径中`\\`转换为`/`。
`foo\\bar ➔ foo/bar`

# install
`npm i slash`

# usage
```
import path from 'path'// cjs已经支持一部分esm了
import slash from 'slash'
const string = path.join('foo', 'bar')
// unix    => foo/bar
// windows => foo\\bar
slash(string)
// unix    => foo/bar
// windown => foo/bar
```

# principle
`return path.replace(/\\/g, '/');`
