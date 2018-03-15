module.exports = async function(msg) {
    const serverColorRoles = msg.member.guild.roles.filter(
        (x) => x.name[0] == "#"
    );

    await msg.member.removeRoles(serverColorRoles);
};
