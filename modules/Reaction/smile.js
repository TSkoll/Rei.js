const ReactionCommand = require('./reactioncommand');

const smiles = [
    'https://i.imgur.com/mZSuX9D.gif',
    'https://i.imgur.com/gpBPE9a.gif',
    'https://i.imgur.com/MZeBna4.gif',
    'https://i.imgur.com/LpekVEo.gif',
    'https://i.imgur.com/Uue24lZ.gif',
    'https://i.imgur.com/ggjapLh.gif',
    'https://i.imgur.com/81TODKv.gif',
    'https://i.imgur.com/NlyjAAr.gif',
    'https://i.imgur.com/MkEFMRT.gif',
    'https://i.imgur.com/alT2rW1.gif',
    'https://i.imgur.com/ouPafHi.gif',
    'https://i.imgur.com/6F7xsbN.gif',
    'https://i.imgur.com/h0mtyLb.gif'
];

class Smile extends ReactionCommand {
    constructor() {
        super(smiles);
    }

    async run(bot, msg, args) {
        await super.sendReaction(msg, `**${msg.author.username}** smiles at **%target%**!`, args)
    }
}
module.exports = {
    command: Smile,
    help: {
        summary: "Sends a random smile in the chat.",
        args: {
            name: "user",
            summary: "Discord user that the smile is directed to.",
            required: false
        }
    }
};