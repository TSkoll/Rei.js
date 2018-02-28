
exports.up = async function(knex, Promise) {
    await knex.schema.dropTable('prefixes');
    return Promise.all([
        knex.schema.createTable('prefixes', table => {
            table.string('guild').primary(),
            table.string('prefix')
        })
    ]);
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTable('prefixes')
    ]);
};
