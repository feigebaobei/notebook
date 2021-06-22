vue3的优化
1. 使用monorepo
2. 分包更准确。
3. 使用ts。（不使用flow）
4. 源码代码变小。使用了解构，支持tree-shaking。
5. 使用proxy/reflect代替Object.defineProperty.
6. 编译优化：把编译阶段优化改为patch过程优化。编译阶段对静态模板分析，生成block tree.
7. option api => composition api
8. 引入rfc(request for comments)
9. 