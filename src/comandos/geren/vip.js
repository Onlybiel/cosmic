const { MessageEmbed } = require("discord.js")

module.exports = {
    config: {
      nome: 'vip',                                                   // NOTA: Coloque o nome do comando SEMPRE em letras minúsculas!
      aliases: [],                               // Alternativas para o comando, para você poder usar o comando com vários nomes diferentes.
      descricao: 'Comando que cumprimenta o usuário de volta.',     // Descrição do comando (OPCIONAL, porém é útil para organização ou para um comando de ver a informação de outros comandos).
      utilizacao: '',                                               // Modo de utilização do comando. Deixe em branco, ou seja, apenas com '', caso o comando não precise de argumentos para ser usado (OPCIONAL, porém é útil para organização ou para um comando de ver a informação de outros comandos).
      cooldown: 3                                                   // 3 segundos de tempo de espera até o usuário poder executar o comando de novo. Caso o comando não tenha tempo de espera, pode remover esta linha ou colocar     cooldown: 0
    },
    run: async (client, message, args,db) => {
      const banco = await db.ref(`Banco/servers/${message.guild.id}/vips/${message.author.id}`).once('value')
      if(!banco.val()) return message.reply("Vc não tem vip '-'")
      var membro = message.guild.members.cache.get(message.mentions.users.first().id)
      var cargoVip = message.guild.roles.cache.get(banco.val().vip)
      if(!cargoVip) return message.reply("não achei seu cargo vip fale com o biel")
      membro.roles.add(cargoVip.id)
      message.channel.send(new MessageEmbed()
      .setDescription(`Cargo:
      ${cargoVip}
      Dono do vip
      ${message.author}
      Membro 
      ${membro}
      `)
      .setColor("#ca00ed")
      .setThumbnail(message.author.displayAvatarURL())
      .setAuthor("Vip adicionado")
      )
    }
}