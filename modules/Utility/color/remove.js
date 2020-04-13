module.exports = async function (msg) {
  const serverColorRoles = msg.member.guild.roles.cache.filter(x => x.name[0] == "#");

  await msg.member.roles.remove(serverColorRoles);
};
