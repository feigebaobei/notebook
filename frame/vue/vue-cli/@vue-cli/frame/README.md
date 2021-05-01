这是`@vue/cli`插件的框架。请修改相应部分。

.
├── README.md
├── generator.js  # generator（可选）
					修改指定文件/创建指定文件（夹）
├── index.js      # service 插件
					修改webpack配置
					创建/修改vue-cli-service命令
					为命令指定模式
├── package.json
├── prompts.js    # prompt 文件（可选）
					使用插件时提示信息
└── ui.js         # Vue UI 集成（可选）
					与vue ui命令配合使用的功能