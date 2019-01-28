const express = require('express');
const app = express();
const mysql = require('mysql')
const bodyParser = require('body-parser')
const cors = require('cors')

const db = mysql.createConnection({
    host: 'localhost',
    user: 'Irvan',
    password: 'Numpit27',
    database: 'sekolahku'
});
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

app.get('/', (req, res) => {
    res.send('halo')
})

app.post('/signup', (req, res) => {
    console.log(req.body)
    let dataUser = req.body
    let sql = 'insert into users set ?'
    db.query(sql, dataUser, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send({
            "username": req.body.username,
            "email": req.body.email,
            "status": "Signup Sukses"
        });
    });
});

app.post('/login', (req, res)=>{
    var sql = 'select * from users where email = ?'
    var email = req.body.email
    var password = req.body.password
    db.query(sql, [email], (error, result)=>{
        if(error){
            res.send(error)
        }
        else{
            if(result.length>0){
                if(result[0].password == password){
                    res.send({
                        "login": "ok",
                        "status": "Login sukses"
                    })
                }else{
                    res.send({
                        "login": "failed",
                        "status": "Password salah"
                    })
                }
            }else{
                res.send({
                    "login": "failed",
                    "status": "Akun tidak terdaftar"
                })
            }
        }
    })
})

app.get('/users', (req, res)=>{
    var dbstat = 'select * from users'
    db.query(dbstat, (error, result)=>{
        if(error) throw error
        console.log(result)
        res.send(result)
    })
})


db.connect();
app.listen(3320, () => {
    console.log('server jalan di 3320')
})