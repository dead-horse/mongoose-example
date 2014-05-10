mongoose-example
================

a mongoose example project


## 目录结构

```
.
├── app.js
└── models
    └── record.js
```

## 流程

1. 先要建立 mongo 连接：`app.js` 中的 connect
2. 绑定一个文档结构：`models/record.js`，在 `app.js` 中有引用
3. 然后根据这个结构可以增加、修改、删除、查询文档， `app.js` 中使用

## 访问

```
http://localhost:7001/records : 查看所有的记录
http://localhost:7001/records/top : 查看分数 top 3 的记录
http://localhost:7001/records/add?name=dead_horse&score=100 : 新增一条记录
http://localhost:7001/records/clean : 清除所有的记录
```

## Lincense

MIT
