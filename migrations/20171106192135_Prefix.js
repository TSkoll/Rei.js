
exports.up = function(knex, Promise) {
    Promise.all([
        knex.schema.createTable('prefixes', table => {
            table.string('guildid').notNullable(),
            table.string('prefix').notNullable()
        })
    ]);
};

exports.down = function(knex, Promise) {
    Promise.all([
        knex.schema.dropTable('prefixes')
    ]);
};
