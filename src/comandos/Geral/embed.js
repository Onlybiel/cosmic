const { MessageEmbed } = require("discord.js")

module.exports = {
    config: {
      nome: 'embed',                                                   // NOTA: Coloque o nome do comando SEMPRE em letras minúsculas!
      aliases: [],                               // Alternativas para o comando, para você poder usar o comando com vários nomes diferentes.
      descricao: 'Comando que cumprimenta o usuário de volta.',     // Descrição do comando (OPCIONAL, porém é útil para organização ou para um comando de ver a informação de outros comandos).
      utilizacao: '',                                               // Modo de utilização do comando. Deixe em branco, ou seja, apenas com '', caso o comando não precise de argumentos para ser usado (OPCIONAL, porém é útil para organização ou para um comando de ver a informação de outros comandos).
      cooldown: 3                                                   // 3 segundos de tempo de espera até o usuário poder executar o comando de novo. Caso o comando não tenha tempo de espera, pode remover esta linha ou colocar     cooldown: 0
    },
    run: async (client, message, args,db) => {
        if (!message.member.hasPermission("ADMINISTRATOR"))
        return message.channel.send('Você não tem permissão para executar esse comando!')
       var msg = args.join(" ")
       message.delete()
       if(!msg) return message.reply("qual a messagem noia?") 
       let embed =new MessageEmbed()
       .setColor("#4B0082")
       .setAuthor("Universe Worlds",client.user.displayAvatarURL())
       .setFooter("Universe Worlds no topo")
       .setDescription(msg)
       .setThumbnail(client.user.displayAvatarURL())
       message.channel.send(embed)
    }
}