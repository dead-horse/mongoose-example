var express = require('express');
var mongoose = require('mongoose');
// 建立 mongo 的连接
mongoose.connect('mongodb://test:test@ds031627.mongolab.com:31627/mongo-test');

var Record = require('./models/record');

var app = express();

/**
 * 获取所有的records记录
 */
app.get('/records', function (req, res, next) {
  // 查询看文档 http://mongoosejs.com/docs/queries.html
  // 第一个参数是查询条件，第二个参数是要查询需要获得的属性
  Record.find({}, 'name score', function (err, data) {
    if (err) {
      return next(err);
    }
    // 得到一个数组
    res.send(data);
  });
});

/**
 * 查询top 3
 */
app.get('/records/top', function (req, res, next) {
  // 查询条件
  // 获取全部
  // query = {}
  // 获取指定用户
  // query = {name: 'dead_horse'}
  var query = {};

  // 要取的字段
  var select = 'name score';

  // 查询的一些选项
  var options = {
    limit: 3, // 只取前三个
    sort: {score: -1},  // 按照分数排序, -1 表示倒序（从大到小）
  };
  Record.find(query, select, options, function (err, data) {
    if (err) {
      return next(err);
    }
    res.send(data);
  });
});

/**
 * 增加一个records
 * http://localhost:7001/records/add?name=dead_horse&score=123
 */
app.get('/records/add', function (req, res, next) {
  // 获得参数
  var query = req.query;
  if (!query.name) {
    return res.send('need name');
  }
  if (!query.score) {
    return res.send('need score');
  }
  // 新建一条record
  var record = new Record();
  record.name = query.name;
  record.score = parseInt(query.score, 10);
  record.save();
  res.send('saved');
});

/**
 * 删除全部记录
 */
app.get('/records/clean', function (req, res, next) {
  // 第一个参数是查询条件，删除满足这个条件的所有record
  // {} 就会删除全部
  Record.remove({}, function (err, data) {
    if (err) {
      return next(err);
    }
    res.send('clean done');
  });
});

app.listen(7001);
