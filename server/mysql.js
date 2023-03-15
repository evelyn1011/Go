const mysql = require('mysql')

const client = mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'123456',
  database: 'go'
})

function sqlFn(sql, arr, cb) {
  client.query(sql, arr,function (error, result) {
    if(error) {
      console.log('数据库语句错误');
      console.log(error)
      return;
    }
    cb(result)
  })
}


module.exports=sqlFn