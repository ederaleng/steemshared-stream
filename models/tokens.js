'use strict'

const createGuts = require('../helpers/model_guts')

const name = 'Tokens'
const tableName = 'tokens'

const selectableProps = [
  'private_token',
  'public_token',
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

  const UpdateTokens = (token_id, data)=>{
    return knex.update(data)
      .from(tableName)
      .where({ public_token: token_id })
      .timeout(1000)
  }


  return {
    ...guts,
    UpdateTokens
  }
}