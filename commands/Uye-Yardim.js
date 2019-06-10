const Discord = require('discord.js');
const config = require("../config.json");

module.exports.run = async(client, message, args) => {
	message.author.send({embed: {
	color: 3447003,
	author: {name: 'Peçetelee Yardım'},
			fields: [
				{
				name: ":gear: | Admin Komutları",
				value:"`at`, `ban`, `sil`",
                },
                {
                name: ":file_cabinet: | Sunucu Komutları",
                value: "`sunucubilgi`"
                },
				{
				name: '<:patrick:587548068119838731> | Üye Komutları',
				value: '`avatar`, `bilgi`, `çark`, `link`, `ping`, `söyle`, `yardım`'
				}
			],
			timestamp: new Date(),
			footer: {
				icon_url: client.user.avatarURL,
				text: `Peçetelee v0.1.3`
			}
        }});
    let msg = await message.channel.send(':mailbox: | Mesaj kutunu kontrol et!');
    msg.delete(10000).catch(err => console.log(err));
}

module.exports.help = {
    name: 'yardım'
}