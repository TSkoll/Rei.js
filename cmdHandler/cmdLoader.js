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
    let commandRet = {};
    try {
      const modules = await fsUtils.getFolders("./modules/");

      for (let i = 0; i < modules.length; i++) {
        const commands = await fsUtils.getFiles(`./modules/${modules[i]}/`);

        for (let j = 0; j < commands.length; j++) {
          const cmdObj = require(path.join(process.cwd(), "modules", modules[i], commands[j]));

          const cmd = new cmdObj(cmdPass);
          commandRet[cmd.constructor.name.toLowerCase()] = cmd;

          if (cmd.aliases) {
            for (let k = 0; k < cmd.aliases.length; k++) {
              commandRet[cmd.aliases[k].toLowerCase()] = cmd;
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
