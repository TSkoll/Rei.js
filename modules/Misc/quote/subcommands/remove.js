const db = require('../../../../utils/dbUtil.js');

module.exports = async (msg, args) => {
    if(args.length < 2)
        throw 'Not enough arguments.';

    if(!(await db.ifRowExists('quotes', { 'guildid': msg.guild.id, 'name': args.slice(1).join(' ') })))
        throw 'I can\'t delete a quote that doesn\'t exist.';

    const quoteObj = (await db.getRow('quotes', { 'guildid': msg.guild.id, 'name': args.slice(1).join(' ') }))[0];

    if(quoteObj.userid != msg.author.id)
        throw 'You aren\'t the person that saved this quote!';

    await db.deleteRows('quotes', quoteObj);
}