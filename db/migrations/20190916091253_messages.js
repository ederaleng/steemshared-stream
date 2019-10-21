exports.up = knex => {
    return knex.schema.createTable('messages', t => {
      t.string('txid').notNullable()
      t.string('message')
      t.string('from').notNullable()
      t.string('to').notNullable()
      t.string('block').notNullable()
      t.string('id_chat').references('chats.id')

      t.timestamp('created_at').defaultTo(knex.fn.now())
      t.timestamp('updated_at').defaultTo(knex.fn.now())
    })
  }
  
  exports.down = knex => {
    return knex.schema.dropTable('messages')
  }
  