const Command = require('../../Types/command.js');

class Connectfour extends Command {
    constructor() {
        super({
            args: 1,
            aliases: [ 'cf' ]
        });

        this.games = {};
    }

    async run(bot, msg, args) {

    }
}
module.exports = Connectfour;

class Cf {
    constructor(player1, player2) {
        this.playboard = [
            [ 0, 0, 0, 0, 0, 0, 0 ],
            [ 0, 0, 0, 0, 0, 0, 0 ],
            [ 0, 0, 0, 0, 0, 0, 0 ],
            [ 0, 0, 0, 0, 0, 0, 0 ],
            [ 0, 0, 0, 0, 0, 0, 0 ],
            [ 0, 0, 0, 0, 0, 0, 0 ],
        ];

        this.player1 = player1;
        this.player2 = player2;
    }

    toText() {
        let ret = '';
        
        for (let i = 0; i < this.playboard.length; i++) {
            ret += this.playboard.join(' ') + '\n';
        }

        return ret;
    }

    addToken(col, num) {
        if (this.playboard[5][col] == 0) {
            this.playboard[5][col] = num;
            return true
        }
        else {
            for (let i = 5; i >= 0; i--) {
                if (this.playboard[i][col] == 0) {
                    this.playboard[i][col] = num;
                    return true;
                }
            }

            return false;
        }
    }

    checkWinningCondition() {
        // Horizontal line
        for (let i = 0; i < 6; i++) {
            for (let j = 0; j < 3; j++) {
                if (this.playboard[i][j] != 0) {
                    // Contains a token from a player, check if we have four connected
                    if (this.playboard[i][j] == this.playboard[i][j + 1] &&
                        this.playboard[i][j] == this.playboard[i][j + 2] &&
                        this.playboard[i][j] == this.playboard[i][j + 3] &&
                        this.playboard[i][j] == this.playboard[i][j + 4])
                            return this.playboard[i][j];
                }
            }
        }
        
        // Vertical line
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 7; j++) {
                if (this.playboard[i][j] != 0) {
                    // Contains a token from a player, check if we have four connected
                    if (this.playboard[i][j] == this.playboard[i + 1][j] &&
                        this.playboard[i][j] == this.playboard[i + 2][j] &&
                        this.playboard[i][j] == this.playboard[i + 3][j] &&
                        this.playboard[i][j] == this.playboard[i + 4][j])
                            return this.playboard[i][j];                    
                }
            }
        }

        // Diagonal up, 
        for (let i = 3; i < 6; i++) {
            for (let j = 0; i < 4; j++) {
                if (this.playboard[i][j] != 0) {
                    // Contains a token from a player, check if we have four connected
                    if (this.playboard[i][j] == this.playboard[i + 1][j + 1] &&
                        this.playboard[i][j] == this.playboard[i + 2][j + 2] &&
                        this.playboard[i][j] == this.playboard[i + 3][j + 3] &&
                        this.playboard[i][j] == this.playboard[i + 4][j + 4])
                            return this.playboard[i][j];
                }
            }
        }

        // Diagonal down
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 4; j++) {
                if (this.playboard[i][j] == this.playboard[i - 1][j - 1] &&
                    this.playboard[i][j] == this.playboard[i - 2][j - 2] &&
                    this.playboard[i][j] == this.playboard[i - 3][j - 3] &&
                    this.playboard[i][j] == this.playboard[i - 4][j - 4])
                        return this.playboard[i][j];
            }
        }

        return 0
    }
}