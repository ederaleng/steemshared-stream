'use strict'

const createGuts = require('../helpers/model_guts')

const name = 'Tokens'
const tableName = 'tokens'

const selectableProps = [
  'token_private',
  'token_public',
  'username',
  'trx_id',
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