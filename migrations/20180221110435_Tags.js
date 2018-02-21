exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('tags', table => {
            table.string('name').notNullable(),
            table.string('userid').notNullable(),
            table.string('content'),
            table.string('imageid')
        })
    ]);
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTable('tags')
    ])
};