class statTracker {
  constructor() {
    this.startTime = Date.now();
    this.messages = 0;
    this.commands = 0;
  }

  /* 
        Messages
    */
  messageAdd() {
    this.messages++;
  }

  messageGet() {
    return this.messages;
  }

  /* 
        Commands
    */
  commandsAdd() {
    this.commands++;
  }

  commandsGet() {
    return this.commands;
  }
}
module.exports = statTracker;
