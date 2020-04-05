const request = require('request-promise-native');

async function Set(msg, userProfile) {
    const id = userProfile.replace('https://scoresaber.com/u/', '');

    const resp = request.get(`https://new.scoresaber.com/api/player/${id}/basic`);

    return {
        name: resp.body.name,
        pp: resp.body.pp,
        rank: resp.body.rank,
        cRank: resp.body.countryRank,
        country: resp.body.country
    }
}
module.exports = Set;