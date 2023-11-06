const express = require('express')
const fs = require('fs')
const { v4: uuidv4 } = require('uuid')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(cors({ origin: ['http://localhost:3000'] }))

const arquivoJson = 'src/db/dados.json'
let dados = []

if (fs.existsSync(arquivoJson)) {
  const dadosRaw = fs.readFileSync(arquivoJson)
  dados = JSON.parse(dadosRaw)
} else {
  fs.writeFileSync(arquivoJson, '[]')
}

app.get('/', (req, res) => {
  res.status(200).send('Notas de Aula - IFPI')
})

app.get('/agendamentos', (req, res) => {
  res.status(200).json(dados)
})

app.post('/agendamentos', (req, res) => {
  data = req.body
  dados.push(data)
  fs.writeFileSync(arquivoJson, JSON.stringify(dados))
  res.status(201).json(data)
})

app.get('/agendamentos/:id', (req, res) => {
  const estudante = dados.find(p => p.id === req.params.id)
  if (estudante) {
    res.status(200).json(estudante)
  } else {
    res.status(404).send('Estudante não encontrado')
  }
})

app.delete('/agendamentos/:id', (req, res) => {
  const index = dados.findIndex(p => parseInt(p.id) === parseInt(req.params.id))
  console.log(index)
  if (index !== -1) {
    dados.splice(index, 1)
    fs.writeFileSync(arquivoJson, JSON.stringify(dados))
    res.status(200).send(`Estudante ${req.params.id} removido com
  sucesso`)
  } else {
    res.status(404).send('Estudante não encontrado')
  }
})

app.put('/agendamentos/:id', (req, res) => {
  let estudante = dados.find(p => parseInt(p.id) === parseInt(req.params.id))
  console.log(estudante)
  if (estudante) {
    estudante.start = req.body.start
    estudante.end = req.body.end
    estudante.allDay = req.body.allDay
    
    fs.writeFileSync(arquivoJson, JSON.stringify(dados),)
    res.status(200).send('Estudante alterado com sucesso')
  } else {
    res.status(404).send('Estudante não encontrado')
  }
})

module.exports = app
