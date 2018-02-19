
exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('quotes', table => {
            table.string('guildid').notNullable(),
            table.string('name').notNullable(),
            table.string('channelid').notNullable(),
            table.string('messageid').notNullable()
        })
    ]);
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTable('quotes')
    ])
};
