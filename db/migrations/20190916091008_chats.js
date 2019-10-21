exports.up = knex => {
    return knex.schema.createTable('chats', t => {
      t.string('id').primary()
      t.string("user_1").notNullable()
      t.string("user_2").notNullable()
      t.timestamp('created_at').defaultTo(knex.fn.now())
      t.timestamp('updated_at').defaultTo(knex.fn.now())
    })
  }
  
  exports.down = knex => {
    return knex.schema.dropTable('chats')
  }
  