const { MessageEmbed } = require("discord.js")

module.exports = {
    config: {
      nome: 'configvip',                                                   // NOTA: Coloque o nome do comando SEMPRE em letras minúsculas!
      aliases: ['vipconfig'],                               // Alternativas para o comando, para você poder usar o comando com vários nomes diferentes.
      descricao: 'Comando que cumprimenta o usuário de volta.',     // Descrição do comando (OPCIONAL, porém é útil para organização ou para um comando de ver a informação de outros comandos).
      utilizacao: '',                                               // Modo de utilização do comando. Deixe em branco, ou seja, apenas com '', caso o comando não precise de argumentos para ser usado (OPCIONAL, porém é útil para organização ou para um comando de ver a informação de outros comandos).
      cooldown: 3                                                   // 3 segundos de tempo de espera até o usuário poder executar o comando de novo. Caso o comando não tenha tempo de espera, pode remover esta linha ou colocar     cooldown: 0
    },
    run: async (client, message, args,db) => {
        if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send('Você não tem permissão para executar esse comando!')
        var membro = message.mentions.users.first()
        if(!membro) return message.reply('mensione alguêm!')
        var cargo = message.mentions.roles.first()
        if(!cargo) return message.reply('mensione um cargo!')
        message.guild.members.cache.get(membro.id).roles.add(cargo.id)
        db.ref(`Banco/servers/${message.guild.id}/vips/${message.author.id}`)
        .set({
            vip:cargo.id
        })
        message.channel.send(new MessageEmbed()
        .setDescription(`Dono:
        <@${membro.id}>
        Cargo:
        ${cargo}`)
        .setColor("#ca00ed")
        .setThumbnail(message.author.displayAvatarURL())
        .setAuthor("Vip configurado")
        )
    }
}