# mvc

model-view-controller
数据保存 业务逻辑 用户界面

```
// 单向通信
           user
            |
    |-------|
    |       V
    |      view <-----------------|
    |        |                    |
    |        |                    |
    |        |                    |
    |        |                    |
    |        V                    |
    |-----> controller ---------> model
```

## backbone.js

# mvp

model - presenter - view

```
// 双向通信

    view
     ^|
     ||
     ||
     ||
     ||
     |V
    presenter <-------------- model
              -------------->

```

# mvvm

```
// 双向绑定（数据驱动）
       view
         ^
         |
         |
         |
         |
         |
         V
      viewModel --------------> model
                <--------------
```
