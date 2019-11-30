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
const FaqRoutes = require('./src/app/routes/faq')
const HistoricoRoutes = require('./src/app/routes/historico')
const NoticiaRoutes = require('./src/app/routes/noticia')
const QuemSomosRoutes = require('./src/app/routes/quem_somos')
const TransparenciaRoutes = require('./src/app/routes/transparencia')

app.get('/', (req, res) => {
    res.send({ message: 'API backend node.js para o projeto do site institucional do asilo de Ibitinga' })
})

app.use('/', ContatoRoutes)
app.use('/', FaqRoutes)
app.use('/', HistoricoRoutes)
app.use('/', NoticiaRoutes)
app.use('/', QuemSomosRoutes)
app.use('/', TransparenciaRoutes)

app.use('*', (req, res) => res.send({ message: 'API não encontrada' }))

app.listen(PORT, () => console.log(`Aplicação rodando na porta ${PORT}!`))

module.exports = app