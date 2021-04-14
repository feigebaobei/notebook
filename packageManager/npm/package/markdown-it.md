# markdown-it

很好地解析markdown（md => html），方便扩展。需要运行在commonjs规范环境下。 
1. 基于`CommonMark spec`开发，扩展了语法、添加了语法糖。
2. 可配置语法。可使用新添加的规则，也可取代现有的规则。
3. 高速。
4. 安全。
5. 有广泛的社区插件。

## Installation

```
npm i markdown-it --save
```

## Usage

```
var MarkdownIt = require('markdown-it')
var md = new MarkdownIt()
var result = md.render('# title') // <h1>title</h1>

// node.js, the same, but with sugar:
var md = require('markdown-it')();
var result = md.render('# markdown-it rulezz!');

// browser without AMD, added to "window" on script load
// Note, there is no dash in "markdownit".
var md = window.markdownit();
var result = md.render('# markdown-it rulezz!');
```

### options

设置模式选项。
options: 'default' | 'commonmark' | 'zero'
"commonmark" - configures parser to strict CommonMark mode.
default - similar to GFM, used when no preset name given. Enables all available rules, but still without html, typographer & autolinker.
"zero" - all rules disabled. Useful to quickly setup your config via .enable(). For example, when you need only bold and italic markup and nothing else.
也可以设计更具体的每一项
options:{ // default
    html: false              // 是否使用html标签
    xhtmlOut: false          // 是否使用自关闭标签
    breaks: false            // 是否把`/n`转化为`<br>`
    langPrefix: 'language-'  // 隔离代码块的前缀，有助于扩展高度
    linkify: false           // 自动把url链接转化为link链接。
    typographer: false,      // Enable some language-neutral replacement + quotes beautification
    quotes: '“”’‘'           // 引用
    highlight: function(/*str, lang*/) {return '';}           // 高亮方法，返回逃溢html。
}

### plugins load

```
var md = require('markdown-it')
            .use(plugin0)
            .use(plugin1, opts, ...)
            .use(plugin2)
```

### syntan lighlighting

对隔离代码块使用`highlight`选项设置高亮语法。
```
var hljs = require('highlight.js')
var md = require('markdown-it')({
    highlight: function (str, lang) {
        if (lang && hljs.getLanguage(lang)) {
            try {
                return hljs.highlight(lang, str).value
            } catch (__) {}
        }
        return '';
        // or
        // return `<pre class="hljs"><code>${md.utils.escapeHtml(str)}</code></pre>`
    }
})
```

### linkify

当`linkify: true`时使用`linkify-it`插件。可以使用`md.linkify`访问linkify的实例。
`md.linkify.set({fuzzyEmail: false})`


## API

[官网api](https://markdown-it.github.io/markdown-it/#MarkdownIt.new)

### syntax extensions

默念内置：
- tables
- strikethrough

可选插件
- subscript
- superscript
- footnote
- definition list
- abbreviation
- emoji
- custom container
- insert
- mark
- ... and others

### manage rules

默认情况下，所有规则都是启用的，但可以通过选项进行限制。在插件加载时，所有的规则都会自动启用。
```
// Activate/deactivate rules, with curring
var md = require('markdown-it')()
            .disable([ 'link', 'image' ])
            .enable([ 'link' ])
            .enable('image');

// Enable everything
md = require('markdown-it')({
  html: true,
  linkify: true,
  typographer: true,
});
```

### benchmark
### title
### title
### title
```
new MarkdownIt([presetName][, options])
MarkdownIt.configure(presets)
MarkdownIt.disable(list, ignoreInvalid)
MarkdownIt.enable(list, ignoreInvalid)
MarkdownIt.parse(src, env)
MarkdownIt.render(src[, env]) // => html
MarkdownIt.renderInline(src[, env])
MarkdownIt.set(options)
MarkdownIt.use(plugin, params) // => plugin(md, params)
MarkdownIt.normalizeLink(url)
MarkdownIt.normalizeLinkText(url)
MarkdownIt.validateLink(url)
MarkdownIt.block -> ParserBlock
MarkdownIt.core -> Core
MarkdownIt.helpers -> helpers
MarkdownIt.inline -> ParserInline
MarkdownIt.linkify -> LinkifyIt
MarkdownIt.renderer -> Renderer
MarkdownIt.utils -> utils
ParseBlock.new // new ParseBlock()
ParseBlock.parse(str, md, env, outTokens)
ParseBlock.ruler
ParseInline.new // new ParseInline()
ParseInline.parse
ParseInline.ruler
ParseInline.ruler2
renderer.new // new Renderer()
renderer.render(tokens, options, env) -> string
renderer.renderAttrs
renderer.renderInline
renderer.renderInlineAsText(tokens, options, env) -> string
renderer.renderToken(tokens, idx, options) -> string
renderer.rules -> object
Ruler.new // new Ruler()
Ruler.after(afterName, ruleName, fn[, options])
Ruler.at(name, fn[, options])
Ruler.before
Ruler.disable(list[, ignoreInvalid])
Ruler.enable(list[, ignoreInvalid])
Ruler.enableOnly(list[, ignoreInvalid])
Ruler.getRules(chainName)
Ruler.push(ruleName, fn[, options])
Token.new // new Token(type, tag, nesting)
Token.attrGet(name)
Token.attrIndex(name)
Token.attrJoin(name, value)
Token.attrPush(attrData)
Token.attrSet(name, value)
Token.attrs
Token.block
Token.children
Token.content
Token.hidden
Token.info
Token.level
Token.map
Token.markup
Token.meta
Token.nesting
Token.tag
Token.type
```

