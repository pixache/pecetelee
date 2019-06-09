const Discord = require('discord.js');
const config = require('../config.json');

exports.run = async(client, message, args) => {
    message.delete();
    let msg = await message.channel.send('Rastgele video linki oluşturuluyor...');
    let random = Math.floor(Math.random() * 310000 + 1);
    let embed = new Discord.RichEmbed()
        .setColor(config.mavi)
        .setTitle('<:corringasm:587248570193936384> Link Oluşturuldu')
        .setDescription('Rastgele link: https://faproulette.org/video/' + random + '\n\nVideo iyi veya kötü çıkabilir, sizin şansınıza!')
        .setFooter('Mesaj 10 saniye sonra silinecektir.')
    msg.edit(embed).then(msg.delete(10000));
}

exports.help = {
    name: 'link'
}