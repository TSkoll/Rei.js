# Rei.js
Rei is a [Discord](https://discordapp.com/) chatbot with the focus of adding onto user expression on the service. This is achieved by creating new ways of interacting with original feature in Discord. With Rei, server owners can enable users to have their own favorite username color, or match it with their profile icon.

Rei is currently looking for contributors looking to implement more commands to our existing arsenal!

## Commands

| Name          | Requirements              |
|------         |--------------             |
| prefix        | Manage Server -permission |
| help          | None                      |
| feedback      | None                      |
| ping          | None                      |
| quote         | None                      |
| tag           | None                      |
| urban         | None                      |
| activity      | Bot owner                 |
| close         | Bot owner                 |
| echo          | Bot owner                 |
| leaveserver   | Bot owner                 |
| setavatar     | Bot owner                 |
| setname       | Bot owner                 |
| test          | Bot owner                 |
| testpriority  | Bot owner                 |
| transfertag   | Bot owner                 |
| blush         | None                      |
| confuse       | None                      |
| eskimo        | None                      |
| hug           | None                      |
| lick          | None                      |
| nya           | None                      |
| pat           | None                      |
| skellen       | None                      |
| sleep         | None                      |
| smile         | None                      |
| stare         | None                      |
| color         | None                      |
| removeold     | Bot owner                 |
| source        | None                      |
| stats         | None                      |

## Prequisites

* Node.js 10+
* Npm 6+
* Node-gyp
* MongoDB 4.2.3

## How to run

0. Make sure you have the prequisites installed.
1. Copy the Git repository to your local machine.
2. Run `npm install`.
3. Inside the `data/` -directory rename `config_sample.json` to `config.json`.
4. Fill in the required fields: `token` is the Discord bot token, this is used for logging in. `OwnerID` is the user ID of the account that the bot will consider as their owner. `defaultPrefix` is the set of characters that must be before a command. `saucenaoKey` is not mandatory, but is used for the `source` command. The API key can be gotten from [here](https://saucenao.com/user.php?page=search-api).
5. Type `npm start`. After this point the chatbot should successfully start.

While not necessary, I recommend running the bot through a process manager. In cases of service instability on Discord the bot will close to not continously hammer the login endpoint. Production version of Rei uses [PM2](https://pm2.keymetrics.io/).