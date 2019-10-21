'use strict'

const createGuts = require('../helpers/model_guts')

const name = 'Chats'
const tableName = 'chats'

const selectableProps = [
  'id',
  'user_1',
  'user_2',
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

  const TwoFilters = (filter1, filter2)=>{
    return knex.select()
            .from(tableName)
            .where(filter1)
            .orWhere(filter2)
            .timeout(guts.timeout)
            .then(result=>{
              if(!result.length) return null;
              return result[0]
            })
  }

  return {
    ...guts,
    TwoFilters
  }
}