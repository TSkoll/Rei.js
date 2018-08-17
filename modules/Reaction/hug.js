const ReactionCommand = require('./reactioncommand');

const hugs = [
    'https://i.imgur.com/16daUkb.gif',
    'https://i.imgur.com/HMJzcgl.gif',
    'https://i.imgur.com/zedvWEs.gif',
    'https://i.imgur.com/8sdAWAH.gif',
    'https://i.imgur.com/EYWqXBA.gif',
    'https://i.imgur.com/nGLkmpK.gif',
    'https://i.imgur.com/4cjMwmf.gif',
    'https://i.imgur.com/eMAJUi1.gif',
    'https://i.imgur.com/5HPYxiY.gif',
    'https://i.imgur.com/gr6HUqR.gif',
    'https://i.imgur.com/6U6hoVw.gif',
    'https://i.imgur.com/XvMMCKF.gif',
    'https://i.imgur.com/TgEs6zr.gif',
    'https://i.imgur.com/hWM3LnJ.gif',
    'https://i.imgur.com/ztCSxjz.gif',
    'https://i.imgur.com/4CTSB2r.gif',
    'https://i.imgur.com/7PlxoIA.gif',
    'https://i.imgur.com/VGy7ofM.gif',
    'https://i.imgur.com/NCjicIB.gif',
    'https://i.imgur.com/8l6uVL3.gif',
    'https://i.imgur.com/jadzjYi.gif',
    'https://i.imgur.com/DJTbjow.gif',
    'https://i.imgur.com/kdy35h7.gif',
    'https://i.imgur.com/IKKGuNK.gif',
    'https://i.imgur.com/mJWEnIE.gif',
    'https://i.imgur.com/MxOD0jJ.gif',
    'https://i.imgur.com/au3y7hV.gif',
    'https://i.imgur.com/j8FCZHt.gif',
    'https://i.imgur.com/nd7xpUQ.gif',
    'https://i.imgur.com/EyRDmrp.gif',
    'https://i.imgur.com/Fww9wDy.gif',
    'https://i.imgur.com/3F9q1zB.gif',
    'https://i.imgur.com/Jku7S9D.gif'
];

class Hug extends ReactionCommand {
    constructor() {
        super(hugs);
    }

    async run(bot, msg, args) {
        await super.sendReaction(msg, `**${msg.author.username}** hugs **%target%**!`, args);
    }
}
module.exports = Hug;