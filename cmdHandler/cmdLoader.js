const fsUtils = require("../utils/fsUtil.js");
const fs = require("fs");
const path = require("path");
const async = require("async");

class Loader {
  /* Loads commands and builds the commands and help object */
  /**
   * Loads all commands from disk and gets their help texts.
   * @param {Object} cmdPass Root command information pass object.
   */
  static async load(cmdPass) {
    let commandRet = {
      commands: {},
      help: {},
      uniqueCommands: [],
    };
    try {
      const modules = await fsUtils.getFolders("./modules/");

      for (let i = 0; i < modules.length; i++) {
        const commands = await fsUtils.getFiles(`./modules/${modules[i]}/`);

        for (let j = 0; j < commands.length; j++) {
          const cmdData = require(path.join(process.cwd(), "modules", modules[i], commands[j]));
          const cmdObj = cmdData.command;

          const cmd = new cmdObj(cmdPass);
          const cmdName = cmd.constructor.name.toLowerCase();

          commandRet.uniqueCommands.push(cmdName);
          commandRet.commands[cmdName] = cmd;

          if (cmdData.help) {
            cmdData.help.name = cmdName;
            commandRet.help[cmdName] = cmdData.help;
          }

          if (cmd.aliases) {
            for (let k = 0; k < cmd.aliases.length; k++) {
              commandRet.commands[cmd.aliases[k]] = cmd;
              commandRet.help[cmd.aliases[k]] = cmdData.help || null;
            }
          }
        }
      }

      return commandRet;
    } catch (err) {
      throw err;
    }
  }

  /**
   * Reloads all commands.
   * @todo Implement.
   */
  static reload() {
    return new Promise(resolve => {
      resolve(null);
    });
  }
}
module.exports = Loader;
