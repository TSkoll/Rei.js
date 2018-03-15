const db = require("../../../../utils/dbUtil.js");

module.exports = async function(msg, args) {
    if (args.length < 2) throw "Not enough arguments!";

    const rows = await db.getRows("quotes", {
        guildid: msg.guild.id,
        name: args.slice(1).join(" ")
    });

    if (rows.length < 1) throw "That quote doesn't seem to exist!";

    if (
        rows[0].userid != msg.author.id &&
        !msg.member.hasPermission("MANAGE_MESSAGES")
    )
        throw "You can't remove this quote!";

    await db.deleteRows("quotes", rows[0]);
};
