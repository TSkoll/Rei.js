const db = require('../../../utils/dbUtil.js');

module.exports = async function(msg, args) {
    if (args.length < 3)
        throw 'Not enough arguments!';
    if(args[1] === args[2])
        throw 'I can\'t rename a tag with the same name'; 

    // We try to get quotes which have either the same name as the old name or the new one
    const rows = 
        (await db.table('tags')
        .where({ 'userid': msg.author.id })
        .andWhere(builder => {
            builder.where({'name': args[1]}).orWhere({ 'name': args[2] })
        }).select('name')).map(row => row.name);

    // And here we check if user has either
    // If they don't have a tag with the old name that means it doesn't exist
    if (!rows.includes(args[1]))
        throw 'I can\'t rename a tag that doesn\'t exist!';

    // However if they have a tag with the new name we can't duplicate names
    if(rows.includes(args[2]))
        throw 'A tag with that name already exists!';

    // Here we're sure the user has both old tag and the name won't be repeated
    await db.updateRow('tags', { 'userid': msg.author.id, 'name': args[1] }, { 'name': args[2] });
}