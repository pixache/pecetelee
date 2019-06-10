
const Discord = require('discord.js');
const config = require('./config.json');
const client = new Discord.Client();
const fs = require("fs");
client.commands = new Discord.Collection();

fs.readdir("./commands", (err, files) => {
	if(err) console.log(err);

	let jsfile = files.filter(f => f.split(".").pop() === "js");
	if(jsfile.length <= 0) return console.log("Hiç komut bulamadım.");

	jsfile.forEach((f, i) => {
		let props = require(`./commands/${f}`);
		console.log(`[KOMUT: ${i + 1}] > ${f}`);
		client.commands.set(props.help.name, props);
		i = i+1;
	});
});

client.on('ready', () => {
	console.log(`${client.user.username} olarak giriş yapıldı!`);
	client.user.setActivity('pct!yardım', {type: "WATCHING"})
});

client.on('disconnect', () => {
	console.log('Bağlantım koptu.')
});

client.on('reconnecting', () => {
	console.log('Yeniden bağlanılıyor...')
});

client.on('error', () => {
	console.error;
});

client.on('warn', () => {
	console.warn;
});

client.on('guildMemberAdd', message => {
	let guild = message.guild;
	let ch = guild.channels.find(x => x.name === "kayıtlar");
	if(ch) {
		let embed = new Discord.RichEmbed()
			.setColor(config.yesil)
			.setTitle('<:hosgeldin:587237399000645633> Aramıza Birisi Katıldı')
			.setDescription(`${message.user.username} (` + "`" + message.user.tag + "`" + `) aramıza katıldı!`)
			.setTimestamp()
			.setFooter('Sunucudaki ' + guild.memberCount + ' üyemizsin!', message.user.avatarURL);

		ch.send(embed);
	}else {
		guild.owner.send('Sunucuya bir üye eklendi fakat onu karşılayacak kayıtlar kanalını bulamadım, lütfen oluştur!');
	}
});

client.on('guildMemberRemove',  message => {
	let guild = message.guild;
	let ch = guild.channels.find(x => x.name === "kayıtlar");
	if(ch) {
		let embed = new Discord.RichEmbed()
			.setColor(config.kirmizi)
			.setTitle('<:sad:587239097001836565> Aramızdan Birisi Ayrıldı')
			.setDescription(`${message.user.username} (` + "`" + message.user.tag + "`" + `) aramızdan ayrıldı!`)
			.setTimestamp()
			.setFooter('Şu anda ' + guild.memberCount + ' üyeyiz.', message.user.avatarURL);

		ch.send(embed);
	}else {
		guild.owner.send('Sunucudan birisi ayrıldı ama kayıtlar kanalı olmadığı için duyuramadım, lütfen oluştur!');
	}
});

client.on('messageDelete', message => {
	if(message.author.id === client.user.id) return;
	let guild = message.guild;
	let ch = guild.channels.find(x => x.name === 'kayıtlar');

	if(ch) {
		let embed = new Discord.RichEmbed()
			.setColor(config.mavi)
			.setTitle('Bir Mesaj Silindi')
			.addField('Mesaj Sahibi', message.author.tag)
			.addField('Silinen Mesaj', message)
			.setTimestamp();
		ch.send(embed);
	}else {
		guild.owner.send('Bir mesaj silindi fakat onu gösterecek kayıtlar kanalını bulamadım, lütfen oluştur!');
	}
});

client.on('message', async(message) => {
	if(message.author.bot || message.content.indexOf(config.prefix) !== 0 || message.channel.type === "dm") return;

	let prefix = config.prefix;
	let messageArray = message.content.split(" ");
	let cmd = messageArray[0];
	let args = messageArray.slice(1);

	let commandfile = client.commands.get(cmd.slice(prefix.length));
	if(commandfile) commandfile.run(client, message, args);
});

client.login(config.token);
