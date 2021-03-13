const { MessageEmbed } = require("discord.js")

module.exports = {
    config: {
      nome: 'rankcall',                                                   // NOTA: Coloque o nome do comando SEMPRE em letras minúsculas!
      aliases: [],                               // Alternativas para o comando, para você poder usar o comando com vários nomes diferentes.
      descricao: 'Comando que cumprimenta o usuário de volta.',     // Descrição do comando (OPCIONAL, porém é útil para organização ou para um comando de ver a informação de outros comandos).
      utilizacao: '',                                               // Modo de utilização do comando. Deixe em branco, ou seja, apenas com '', caso o comando não precise de argumentos para ser usado (OPCIONAL, porém é útil para organização ou para um comando de ver a informação de outros comandos).
      cooldown: 3                                                   // 3 segundos de tempo de espera até o usuário poder executar o comando de novo. Caso o comando não tenha tempo de espera, pode remover esta linha ou colocar     cooldown: 0
    },
    run: async (client, message, args,db) => {
      if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send('Você não tem permissão para executar esse comando!')
      var banco = await db.ref(`Banco/servers/${message.guild.id}/config/`).once("value")
       if(banco.val().pro == "sem" || !banco.val().pro) return message.reply("Compre nossa versão Premium")
     db.ref(`Banco/servers/${message.guild.id}/users`).remove()
     let embed = new MessageEmbed()
     .setColor("#00FF00")
     .setAuthor(client.user.username,client.user.displayAvatarURL())
     .setFooter("Atenciosamente desenvolvedor")
     .setThumbnail(client.user.displayAvatarURL())
     .setDescription(`**
   Banco de dados apagado! '-'
     **`)
     message.channel.send(embed)
    }
}