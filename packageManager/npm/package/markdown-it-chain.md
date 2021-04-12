# markdown-it-chain

链式调用`markdown-it`

## Installation

```
npm i markdown-it-chain --save
```

## Usage

```
// Require the markdown-it-chain module. This module exports a single
// constructor function for creating a configuration API.
const Config = require('markdown-it-chain')
 
// Instantiate the configuration with a new API
const config = new Config()
 
// Make configuration changes using the chain API.
// Every API call tracks a change to the stored configuration.
config
  // Interact with 'options' in new MarkdownIt
  // 使用markdonw-it时的要配置项
  // Ref: https://markdown-it.github.io/markdown-it/#MarkdownIt.new
  .options
    .html(true) // equal to .set('html', true)
    .linkify(true)
    .end()
 
  // Interact with 'plugins'
  .plugin('toc')
    // The first parameter is the plugin module, which may be a function
    // while the second parameter is an array of parameters accepted by the plugin.
    .use(require('markdown-it-table-of-contents'), [{
      includeLevel: [2, 3]
    }])
    // Move up one level, like .end() in jQuery.
    .end()
 
  .plugin('anchor')
    .use(require('markdown-it-anchor'), [{
      permalink: true,
      permalinkBefore: true,
      permalinkSymbol: '$'
    }])
    // Apply this plugin before toc.
    .before('toc')
 
// Create a markdown-it instance using the above configuration
const md = config.toMd()
md.render('[[TOC]] \n # h1 \n ## h2 \n ## h3 ')
```

## API

[](https://github.com/neutrinojs/webpack-chain)
