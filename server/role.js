const express = require("express");
const router = express.Router();
const parser = require('body-parser')
router.use(parser.json())

const sqlFn = require("./mysql");

router.get("/list", (req, res) => {
  const page = req.query.page || 1;
  const sql = "select * from userinfo where id";
  sqlFn(sql, null, (data) => {
    let len = data.length;
    const sql =
      "select * from userinfo order by id desc limit 10 offset " +
      (page - 1) * 10;
    sqlFn(sql, null, (result) => {
      if (data.length > 0) {
        res.send({
          status: 200,
          data: result,
          pageSize: 10,
          total: len,
        })
      } else {
        res.send({
          status: 500,
          msg: '暂无数据'
        })
      }
    })


  })
})

router.delete("/list/delete", (req, res) => {

  let ids = req.query.id;
  const sql = `delete from userinfo where id in (${ids})`;
  sqlFn(sql, null, result => {
    if (result.affectedRows > 0) {
      res.send({
        status: 200,
        msg: "删除成功"
      })
    } else {
      res.send({
        status: 500,
        msg: "删除失败"
      })
    }
  })
})

router.get("/list/search", (req, res) => {
  const page = req.query.page || 1;
  var search = req.query.search;
  const sql =
    "select * from userinfo where concat(`username`,`apartment`,`status`) like '%" +
    search +
    "%'";

  sqlFn(sql, null, (data) => {
    let len = data.length;
    const sql =
      "select * from userinfo  where concat(`username`,`apartment`,`status`) like '%" +
      search +
      "%' order by id desc limit 10 offset " +
      (page - 1) * 10;

    sqlFn(sql, null, (data) => {
      if (data.length > 0) {
        res.send({
          status: 200,
          result: data,
          pageSize: 10,
          total: len,
        })
      } else {
        res.send({
          status: 500,
          msg: '暂无数据'
        })
      }
    })
    // if (result.length > 0) {
    //   res.send({
    //     status: 200,
    //     result,
    //   });
    // } else {
    //   res.send({
    //     status: 500,
    //     msg: "暂无数据",
    //   });
    // }
  });

})

router.put("/list/updateItem",(req, res) => {
  console.log(req.body.params);
  
  var id = req.body.params.id;
  var username = req.body.params.username;
  var email = req.body.params.email;
  var apartment = req.body.params.apartment;
  var status = req.body.params.status;
  var create_time = req.body.params.create_time;
  var sql = "update userinfo set username=?, email=?, apartment=?, create_time=?,status=? where id=?";
  var arr = [username, email, apartment, create_time, status, id];
  
  sqlFn(sql, arr, result => {
    if(result.affectedRows > 0) {
      res.send({
        status:200,
        msg:'修改成功'
      })
    } else {
      res.send({
        status:500,
        msg:'修改失败'
      })
    }
  })

})

module.exports = router;
