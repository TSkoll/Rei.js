const Command = require('../../Types/command.js');
const Discord = require('discord.js');

class E3 extends Command {
    constructor() {
        super({
            ownerOnly: true,
            args: 0
        })
    }

    async run(bot, msg, args) {
        const data = {
            Microsoft: {
                name: "Microsoft",
                date: Date.UTC(2019, 6, 9, 20, 0, 0, 0),
                dateString: "2019-06-09T20:00:00Z",
                desc: "The folks behind Xbox have been making fascinating moves with Game Pass and xCloud, but they still have a lot to prove when it comes to first-party games. It’s safe to expect Gears 5 and Halo Infinite, but what else does Phil Spencer have hiding under his video game t-shirts? With Sony out of the picture, this will be the one remaining place for big third-party gameplay trailers. Some safe guesses include Borderlands 3 and Cyberpunk 2077. And is it too much to hope for a Rocksteady reveal?",
                links: {
                    Official: "https://www.xbox.com/en-GB/e3",
                    Twitch: "https://www.twitch.tv/xbox"
                },
                banner: "https://www.e3countdown.com/assets/img/logos/microsoft.jpg"
            },

            Bethesda: {
                name: "Bethesda",
                date: Date.UTC(2019, 6, 10, 0, 30, 0, 0),
                dateString: "2019-06-10T00:30:00Z",
                desc: "After the disastrous launch of Fallout 76, it’ll be interesting to see how Bethesda handles this one. Will they address their online game’s issues? Ignore it in favor of Doom Eternal and whatever new announcements they’ve got coming? Or just spend the whole time talking about Quake Champions?",
                links: {
                    YouTube: "https://www.youtube.com/user/BethesdaSoftworks",
                    Twitch: "https://www.twitch.tv/bethesda"
                },
                banner: "https://www.e3countdown.com/assets/img/logos/bethesda.jpg"
            },

            PCGaming: {
                name: "PC Gaming Show",
                date: Date.UTC(2019, 6, 10, 17, 0, 0, 0),
                dateString: "2019-06-10T17:00:00Z",
                desc: "No description available.",
                links: {
                    Official: "https://www.pcgamingshow.com/",
                    Twitch: "https://www.twitch.tv/pcgamer"
                },
                banner: "https://www.e3countdown.com/assets/img/logos/pcgamingshow.jpg"
            },

            Ubisoft: {
                name: "Ubisoft",
                date: Date.UTC(2019, 6, 10, 20, 0, 0, 0),
                dateString: "2019-06-10T20:00:00Z",
                desc: "Ubisoft’s always good for a surprise or two, and this year should be no exception. Assassin’s Creed is skipping this year, so don’t expect to see Vikings just yet, but perhaps it’s time for Watch Dogs 3? We should get a new look at Beyond Good & Evil 2. Maybe we’ll see Pioneer, the game that was teased a few years ago and now [looks very different than it once did.](https://kotaku.com/the-real-story-behind-pioneer-the-troubled-sci-fi-game-1832137013)",
                links: {
                    YouTube: "https://www.youtube.com/channel/UC0KU8F9jJqSLS11LRXvFWmg",
                    Twitch: "https://www.twitch.tv/ubisoft"
                },
                banner: "https://www.e3countdown.com/assets/img/logos/ubisoft.jpg"
            },

            SquareEnix: {
                name: "Square Enix",
                date: Date.UTC(2019, 6, 11, 1, 0, 0, 0),
                dateString: "2019-06-11T01:00:00Z",
                desc: "Last year’s Square Enix show was one of the most disappointing E3 presentations in recent memory, in large part because the publisher failed to even mention two of its biggest announced games, The Avengers and Final Fantasy VII: Remake. This year, that should change. We hope.",
                links: {
                    Official: "https://e3.square-enix-games.com/en-us/"
                },
                banner: "https://www.e3countdown.com/assets/img/logos/squeenix.jpg"
            },

            Nintendo: {
                name: "Nintendo",
                date: Date.UTC(2019, 6, 11, 16, 0, 0, 0),
                dateString: "2019-06-11T16:00:00Z",
                desc: "As usual, Nintendo will be holding a digital presentation to talk about all things Switch, likely highlighted by Animal Crossing and this year’s Pokémon games. We probably won’t see Metroid Prime 4, but we’ll definitely see the new Fire Emblem and Super Mario Maker 2. One game we won’t see: Reggie Fils-Aime. :(",
                links: {
                    Official: "https://e3.nintendo.com/",
                    Twitch: "https://www.twitch.tv/nintendo"
                },
                banner: "https://www.e3countdown.com/assets/img/logos/nintendo.jpg"
            },

            E3: {
                name: "E3",
                date: Date.UTC(2019, 6, 11, 19, 0, 0, 0),
                dateString: "2019-06-11T19:00:00Z",
                desc: "No description Available.",
                banner: "https://www.e3countdown.com/assets/img/logos/e3.jpg"
            }
        }

        let embeds = [];

        const keys = Object.keys(data);
        for (let key of keys) {
            const d = data[key];

            const embed = {
                author: {
                    name: d.name,
                    url: "https://www.twitch.tv/twitch"
                },

                description: d.desc,
                image: {
                    url: d.banner
                },

                footer: {
                    text: "Starting"
                },

                timestamp: d.dateString,
                color: Math.random()*(1<<24)|0
            }

            if (d.links) {
                embed.fields = [];

                let linksKeys = Object.keys(d.links);
                for (let l of linksKeys) {
                    let link = d.links[l];
                    
                    embed.fields.push({
                        name: l,
                        value: `[${link}](${link})`,
                        inline: true
                    });
                }
            }

            embeds.push(embed);
        }

        const announcementEmbed = new Discord.RichEmbed()
        .setTitle("It's E3 time!")
        .setDescription(
            `
            This is the annual The Order of Spoon E3 discussion zone. We'll see again what the biggest game studios have been crafting for us to enjoy.

            Below you can find small descriptions for each show (if available) and official links for their respective streams and sites (also if available).

            All of the timestamps in the info fields are automatically converted to your timezone.

            **Important Links**

            https://live.e3expo.com/
            https://www.twitch.tv/twitch
            https://www.twitch.tv/itmejp/
            `)
        .setColor('RANDOM');

        await super.sendEmbed(msg, announcementEmbed);

        for (let em of embeds) {
            await msg.channel.send("", { embed: em });
        }
    }
}
module.exports = E3;