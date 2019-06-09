const Discord = require('discord.js');
const config = require('../config.json');

exports.run = async(client, message, args) => {
    let embed = new Discord.RichEmbed()
        .setColor(config.mavi)
        .setTitle('Peçetelee Yardım')
        .setDescription(
            "Peçetelee, Peçeteliler için yapılmış özel bir bottur.\n" + 
            "Bu sunucu için prefix, `pct!`\n\n" +
            "**Komutlar:**\n\n" +  
            "`pct!link      :: Rastgele video linki atar.`\n" + 
            "`pct!yardım    :: Bu mesajı gönderir.`\n"
        )
        .setTimestamp()
        .setFooter('Peçetelee v0.dahadenemeaşamasında', client.user.avatarURL);
    message.author.send(embed).catch(err => console.log(err));

}

exports.help = {
    name: 'yardım'
}