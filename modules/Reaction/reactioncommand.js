const Command = require("../../Types/command.js");
const Discord = require("discord.js");

class ReactionCommand extends Command {
  constructor(imageUrls, info) {
    super(info);

    this.imgUrls = imageUrls;
  }

  async sendReaction(msg, reactMessage, query) {
    const reaction = this.imgUrls[Math.floor(Math.random() * this.imgUrls.length)];

    if (msg.mentions.members && msg.mentions.members.size > 1 && reactMessage) {
      let mentionUserString = "";
      const keys = msg.mentions.members.array().slice(0, msg.mentions.members.size - 2);
      const rest = msg.mentions.members.array().slice(msg.mentions.members.size - 2);

      for (let i = 0; i < keys.length; i++) {
        const val = keys[i];

        mentionUserString += val.user.username + "**,** ";
      }

      mentionUserString += `${rest[0].user.username} **and** ${rest[1].user.username}`;

      await super.sendEmbed(
        msg,
        new Discord.MessageEmbed()
          .setColor("RANDOM")
          .setDescription(reactMessage.replace("%target%", mentionUserString))
          .setImage(reaction)
      );
    } else {
      const mentionedUser = super.searchUser(msg, query);

      if (mentionedUser && reactMessage) {
        await super.sendEmbed(
          msg,
          new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setDescription(reactMessage.replace("%target%", mentionedUser.user.username))
            .setImage(reaction)
        );
      } else {
        await super.sendEmbed(msg, new Discord.MessageEmbed().setColor("RANDOM").setImage(reaction));
      }
    }
  }
}
module.exports = ReactionCommand;
