import fastify from 'fastify'
import { knex } from './database'
import crypto from 'node:crypto'
import { env } from './env'
const app = fastify()

app.get('/create', async () => {
  const transactions = await knex('transactions')
    .insert({
      id: crypto.randomUUID(),
      title: 'Transação de Teste',
      amount: 1000,
    })
    .returning('*')

  return transactions
})

app.get('/search', async () => {
  const transactions = await knex('transactions').select('*')

  return transactions
})

app
  .listen({
    port: env.PORT,
  })
  .then(function () {
    console.log('HTTP Server running')
  })
