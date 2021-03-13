const { MessageEmbed } = require("discord.js")

module.exports = {
    config: {
      nome: 'registros',                                                   // NOTA: Coloque o nome do comando SEMPRE em letras minúsculas!
      aliases: ['rankcall'],                               // Alternativas para o comando, para você poder usar o comando com vários nomes diferentes.
      descricao: 'Comando que cumprimenta o usuário de volta.',     // Descrição do comando (OPCIONAL, porém é útil para organização ou para um comando de ver a informação de outros comandos).
      utilizacao: '',                                               // Modo de utilização do comando. Deixe em branco, ou seja, apenas com '', caso o comando não precise de argumentos para ser usado (OPCIONAL, porém é útil para organização ou para um comando de ver a informação de outros comandos).
      cooldown: 3                                                   // 3 segundos de tempo de espera até o usuário poder executar o comando de novo. Caso o comando não tenha tempo de espera, pode remover esta linha ou colocar     cooldown: 0
    },
    run: async (client, message, args) => {
        const ref = await db.ref(`Banco/servers/${message.guild.id}/registro/`).once('value');

const allValues = Object.entries(ref.val()).map(v => ({ userID: v[0], ...v[1] }));

const sort = allValues.sort((a, b) => b.registros - a.registros);

message.channel.send(new MessageEmbed().setColor("#00FF00").setThumbnail(message.guild.iconURL()).setAuthor("Rank tempo em call").setFooter("Bora ver quero competição").setDescription(sort.splice(0, 10).map((v, indice) => `${indice + 1} | <@${v.userID}> ${v.registros} Registros`)
))
    }
}