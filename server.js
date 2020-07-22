const express = require('express')
const mysql = require('mysql')
const bodyParser = require("body-parser")

const server = express()

server.set('view engine', 'ejs')
server.use(express.static('public'))

server.use(bodyParser.urlencoded({ extended: false }))
server.use(bodyParser.json())

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '131299',
    database: 'db_eng_esamc'
})

db.connect((err) => {
    if (err)
        throw err.sqlMessage;
    console.log('Conectado ao Banco de Dados MySQL');
});

server.get('/contatos', function (req, res) {
    db.query('SELECT * FROM tb_contato', function (err, rows) {
        res.render('contatos', { contato: rows })
    })
})

server.get('/formContato', function (req, res) {
    res.render('formContato', { contato: {} })
})

server.post('/formContato', function (req, res) {
    //res.send("Nome: " + req.body.nome + " - Email: " + req.body.email)
    //res.send(req.body)

    db.query('INSERT tb_contato SET ?', req.body, function (err, rows, fields) {
        if (!err)
            res.redirect('/contatos')
        else
            res.status(400).json(err);
    })
})

server.get('/excluirContato', function (req, res) {
    db.query('DELETE FROM tb_contato WHERE id = ?', req.query.id, function (err, rows, fields) {
        if (!err)
            res.redirect('/contatos')
        else
            res.status(400).json(err);
    })
})

server.get('/atualizarContato', function (req, res) {
    db.query('SELECT * FROM tb_contato WHERE id = ?', req.query.id, function (err, rows, fields) {
        if (!err)
            res.render('formContato', { contato: rows[0] })
        else
            res.status(400).json(err);
    })
})

server.post('/atualizarContato', function (req, res) {
    var param
    db.query('UPDATE tb_contato SET ? WHERE id = ?', [req.body, req.query.id], function (err, rows, fields) {
        if (!err)
            res.redirect('/contatos')
        else
            res.status(400).json(err);
    })
})

server.listen(3000, function () {
    console.log('Servidor em execução...')
    //localhost:3000/
    //para parar o server CTRL+C
})