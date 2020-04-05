async function getUser(msg, content, db) {
    let id;
    if (content)
        id = content.replace('https://scoresaber.com/u/', '');
    else {
        const sc = db.collection('sc');
        const rows = await sc.findOne({ id: msg.author.id });

        if (rows)
            id = rows.sc;
        else
            throw "No profile id/url or the profile hasn't been set!";
    }

    return id;
}
module.exports = getUser;