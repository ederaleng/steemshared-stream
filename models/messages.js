'use strict'

const createGuts = require('../helpers/model_guts')

const name = 'Messages'
const tableName = 'messages'

const selectableProps = [
  'txid',
  'message',
  'from',
  'to',
  'block',
  'updated_at',
  'created_at'
]

module.exports = knex => {
  const guts = createGuts({
    knex,
    name,
    tableName,
    selectableProps
  })

  return {
    ...guts
  }
}