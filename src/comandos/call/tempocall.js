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
        let user = message.mentions.users.first() || message.author
        var banco = await db.ref(`Banco/servers/${message.guild.id}/users/${user.id}`).once("value")
        var segundos, minutos, horas,tempo
      if(!banco.val()) return message.reply("Não encontrei'-'")
          tempo = banco.val().tempocall
        segundos = tempo
        minutos = Math.round(tempo / 60)
        horas = Math.round(minutos/60)
        dias = Math.floor(horas/24)
        message.channel.send(new MessageEmbed()
        .setDescription("Aqui você podera ver o tempo em call")
        .addField("Segundos em que ficou em call:",segundos+" segundos em call")
        .addField("Minutos em que ficou em call:",minutos+" minutos em call")
        .setColor("#00FF00")
        .setAuthor("Tempo em call",user.displayAvatarURL())
        .setThumbnail(user.displayAvatarURL())
        .addField("Horas em que ficou em call: ",horas+" horas em call")
        .addField("Dias em que você ficou em call",dias+" dias em que ficou em call")
        .setFooter("Atenciosamente desenvolvedor"))
    }
}