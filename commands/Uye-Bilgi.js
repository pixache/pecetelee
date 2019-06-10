const Discord = module.require('discord.js');
const moment = require('moment');
let stlist = {
	"online" : "Çevrimiçi",
	"offline" : "Çevrimdışı",
	"dnd" : "Rahatsız Etmeyin",
	"idle" : "Müsait",
	"streaming" : "Yayında"
}

module.exports.run = async (bot, message, args) => {

    let member = message.mentions.members.first() || message.member,
        user = member.user;

    let st = member.presence.status;
	if(st === "dnd" || "online" || "offline" || "idle" || "streaming") {
		st_dr = stlist[st]
	}

    let embed = new Discord.RichEmbed()
        .setAuthor(user.username + '#' + user.discriminator, user.displayAvatarURL)
        .setColor(`RANDOM`)
        .setThumbnail(`${user.displayAvatarURL}`)
        .addField('Kullanıcı Adı', user.username, true)
        .addField('ID', user.id, true)
        .addField('Ayırıcı', user.discriminator, true)
        .addField('Durumu', st_dr, true)
        .addField('Sunucuya Katıldı', moment(message.member.guild.joinedAt).format('DD/MM/YYYY, hh:mm:ss'), true)
        .addField("Discord'a Katıldı", moment(user.createdAt).format('DD/MM/YYYY, hh:mm:ss'), true)
        .addField('Roller:', member.roles.map(r => `${r}`).join(' | '), true)
        .setTimestamp()
        .setFooter('Mesaj 30 saniye sonra silinecektir.')

    let msg = await message.channel.send(embed);
    msg.delete(30000).catch(err => console.log(err));
}

module.exports.help = {
    name: 'bilgi'
}