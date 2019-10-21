exports.up = knex => {
  return knex.schema.createTable('tokens', t => {
    t.increments('id').primary()
    t.string('token_private')
    t.string('token_public')
    t.string('username')
    t.boolean('active').defaultTo(false)
    t.string('trx_id')

    t.timestamp('created_at').defaultTo(knex.fn.now())
    t.timestamp('updated_at').defaultTo(knex.fn.now())
  })
}

exports.down = knex => {
  return knex.schema.dropTable('tokens')
}
  