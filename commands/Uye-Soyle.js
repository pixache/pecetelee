module.exports.run = async(client, message, args) => {
    let sayMessage = args.join(" ");
    if(!sayMessage) return message.channel.send("Söylenecek mesajı girmediniz.");
    message.delete().catch(O_o=>{});
    message.channel.send(sayMessage);
}

module.exports.help = {
  name: 'söyle'
}
