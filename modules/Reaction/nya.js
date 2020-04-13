const ReactionCommand = require("../../Types/reactioncommand");

const nyaas = [
  "https://i.imgur.com/9pbq9GW.gif",
  "https://i.imgur.com/Bd2PgUp.gif",
  "https://i.imgur.com/dGciEpp.gif",
  "https://i.imgur.com/DmEHS4d.gif",
  "https://i.imgur.com/tUgXaMl.gif",
  "https://i.imgur.com/rDyovcO.gif",
  "https://i.imgur.com/I1PDCg3.gif",
  "https://i.imgur.com/XljwKcc.gif",
  "https://i.imgur.com/UsDdkYV.gif",
  "https://i.imgur.com/mKvUQVh.gif",
  "https://i.imgur.com/ovL461q.gif",
  "https://i.imgur.com/AfGTuEr.gif",
  "https://i.imgur.com/mXmt1GZ.gif",
  "https://i.imgur.com/tjhQrZ3.gif",
];

class Nya extends ReactionCommand {
  constructor() {
    super(nyaas);
  }

  async run(bot, msg, args) {
    await super.sendReaction(msg, `**${msg.author.username}** nyaas at **%target%**!`, args);
  }
}
module.exports = {
  command: Nya,
  help: {
    summary: "Sends a random nya in the chat.",
    args: [
      {
        name: "user",
        summary: "Discord user that the nya is directed to.",
        required: false,
      },
    ],
  },
};
