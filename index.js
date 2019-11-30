const express = require("express")
const app = express()
const bodyParser = require('body-parser')

const PORT = process.env.APP_PORT || 3000
const database = require('./src/config/database')

/*
    CONFIG bodyParser (CORS)
*/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json' }));

const ContatoRoutes = require('./src/app/routes/contato')

app.get('/', (req, res) => {
    res.send({ message: 'API backend node.js para o projeto do site institucional do asilo de ibitinga' })
})

app.use('/', ContatoRoutes)

app.use('*', (req, res) => res.send({ message: 'API não encontrada' }))

app.listen(PORT, () => console.log(`Aplicação rodando na porta ${PORT}!`))

module.exports = app