
exports.up = async function(knex, Promise) {
    await knex.schema.createTable('hentaitags', table => {
        table.increments('id'),
        table.string('tagname').index('tagindex').notNullable(),
        table.integer('serviceid')
    });
};

exports.down = async function(knex, Promise) {
    await knex.schema.dropTable('hentaitags');
};
