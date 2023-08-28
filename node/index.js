const express = require('express')
const Leite = require('leite')
const leite = new Leite()

const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
};
const mysql = require('mysql')
const connection = mysql.createConnection(config)

app.get('/', (req, res) => {
    const name = leite.pessoa.nome({ nomeDoMeio: true })
  
    connection.query(`INSERT INTO people (name) VALUES ('${name}')`)
  
    connection.query(`SELECT name FROM people`, (error, results, fields) => {
      res.send(`
        <h1>Full Cycle Rocks!</h1>
        <ol>
          ${!!results.length ? results.map(el => `<li>${el.name}</li>`).join('') : ''}
        </ol>
      `)
    })
  })



app.get('/', (req,res) => {
    res.send('<h1>Full Cycle</h1>')
})

app.listen(port, ()=> {
    console.log('Rodando na porta '+port)
})