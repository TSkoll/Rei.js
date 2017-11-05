class permissionHandler {
    static async checkAll(command, client, msg) {
        return new Promise(async (resolve, reject) => {
            // Command owner only
            if (command.ownerOnly) {
                
            }

            // Command bot permissions
            if (command.botPerms) {

            }

            // Command user permissions
            if (command.userPerms) {

            }

            // Command guild ownership
            if (command.guildOwner) {

            }

            // DM Channel check
            if (command.disallowDM) {

            }
        });
    }

    static async checkOwnerOnly(command, id) {
        return new Promise((resolve, reject) => {

        });
    }

    static async checkBotPerms(command, client) {
        return new Promise((resolve, reject) => {

        });
    }

    static async checkUserPerms(command, user) {
        return new Promise((resolve, reject) => {

        });
    }

    static async checkGuildOwnership(command, guild, user) {
        return new Promise((resolve, reject) => {

        });
    }

    static async checkDMChannel(command, channel) {
        return new Promise((resolve, reject) {

        });
    }
}
module.exports = permissionHandler;