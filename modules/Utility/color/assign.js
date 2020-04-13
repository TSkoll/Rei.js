const Discord = require("discord.js");
const validator = require("validator");

module.exports = async function (msg, cr, db) {
  // Server
  const serverColorRoles = msg.member.guild.roles.cache.filter(x => x.name[0] == "#");

  // User
  const user = msg.guild.members.cache.get(msg.author.id);
  const assignedUserColors = user.roles.cache.filter(x => x.name[0] == "#");
  let userColor = assignedUserColors.first();

  // Check if the guild is about to hit the max role count
  if (msg.member.guild.roles.cache.size > 225 && !serverColorRole.some(role => role.name == cr))
    throw "Due to a Discord limitation of 250 roles you may not pick a color of your own.\nYou can still assign a color some other user has by copying the hex.";

  if (assignedUserColors.find(role => role.name == cr)) {
    msg.channel.send(new Discord.MessageEmbed().setColor("RED").setDescription("You already have this color!"));

    return;
  }

  try {
    if (serverColorRoles.some(role => role.name == cr)) {
      // Color role exists on server, use old one
      const r = serverColorRoles.find(role => role.name == cr);

      await assignColorToUser(msg, r);
    } else {
      // Color doesn't exist on server, create a new one!
      const r = await msg.guild.roles.create({
        data: {
          name: cr,
          color: cr,
          permissions: 0,
        },
        reason: "Color command through Rei",
      });

      await assignColorToUser(msg, r);
    }
  } catch (err) {
    throw err;
  }

  await msg.channel.send(new Discord.MessageEmbed().setColor("GREEN").setDescription("Color set!"));

  if (userColor != null) await handleOldColor(msg, userColor, db);
};

async function assignColorToUser(msg, r = null) {
  // Build a role list by removing every role starting with '#'
  let tempRoles = msg.member.roles.cache.filter(x => x.name[0] != "#").array();
  tempRoles.push(r);

  try {
    await msg.member.roles.set(tempRoles);
  } catch (err) {
    throw err;
  }
}

async function handleOldColor(msg, r, db) {
  await addColorToHistory(msg.author.id, r.name, db);

  /*  Check if we want to remove the role after a second to make sure everything is synced up.
        Will not delete the role if a user assigns the same color to themselves. */
  await setTimeout(async () => {
    if (r.members.size < 1) {
      await r.delete();
    }
  }, 1000);
}

async function addColorToHistory(userid, cr, db) {
  const historyCol = db.collection("colorHistory");
  await historyCol.insertOne({ userid, color: cr });
}
