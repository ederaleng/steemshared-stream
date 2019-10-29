exports.up = knex => {
    return knex.schema.createTable('messages', t => {
      t.string('txid').notNullable()
      t.string('message', 10485760)
      t.string('from').notNullable()
      t.string('to').notNullable()
      t.string('block').notNullable()
      t.string('id_chat').references('chats.id').notNullable()

      t.timestamp('created_at').defaultTo(knex.fn.now())
      t.timestamp('updated_at').defaultTo(knex.fn.now())
    })
  }
  
  exports.down = knex => {
    return knex.schema.dropTable('messages')
  }
  