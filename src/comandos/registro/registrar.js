const { MessageEmbed } = require("discord.js")

module.exports = {
    config: {
      nome: 'registrar',                                                   // NOTA: Coloque o nome do comando SEMPRE em letras minúsculas!
      aliases: ['r','register'],                               // Alternativas para o comando, para você poder usar o comando com vários nomes diferentes.
      descricao: 'Comando que cumprimenta o usuário de volta.',     // Descrição do comando (OPCIONAL, porém é útil para organização ou para um comando de ver a informação de outros comandos).
      utilizacao: '',                                               // Modo de utilização do comando. Deixe em branco, ou seja, apenas com '', caso o comando não precise de argumentos para ser usado (OPCIONAL, porém é útil para organização ou para um comando de ver a informação de outros comandos).
      cooldown: 3                                                   // 3 segundos de tempo de espera até o usuário poder executar o comando de novo. Caso o comando não tenha tempo de espera, pode remover esta linha ou colocar     cooldown: 0
    },
    run: async (client, message, args) => {

        if(!message.member.roles.cache.has("819749561438437396")) return message.reply('Você não e reistrador, mais pode ser vá em <#819749631147114552>').then(m=>{
            m.delete({Timeout:1000*20})
        })
        var homen = message.guild.roles.cache.get('819749585072685056')
        var mulher = message.guild.roles.cache.get('819749585747836948')
        var naobinario = message.guild.roles.cache.get('819749586263343114')
        var mais18 = message.guild.roles.cache.get('819749588667727944')
        var menos18 = message.guild.roles.cache.get('819749587819823147')
        var casado = message.guild.roles.cache.get('819749593632866346')
        var solteiro = message.guild.roles.cache.get('819749592912494612')
        var enrolado = message.guild.roles.cache.get('819749593632866346')
        var namorando = message.guild.roles.cache.get('819749594530578442')
        var hetero = message.guild.roles.cache.get('819749590164963329')
        var lgbt = message.guild.roles.cache.get('819749591326523412')
        message.delete()
        var usuario = message.mentions.users.first() || client.users.cache.get(args[0])
        if(!usuario || !args[0]) return message.channel.send('Não consegui acha o usuario!').then(m=>{
            m.delete({Timeout:1000*20})
        })
        var sexo,sexualidade,civil,regiao,cargos = [],idade
        sexo = args[1]
        sexualidade = args[2]
        idade = args[3]
        civil =args[4]
        if(sexo == 'h'){
            cargos.push(homen)
        }
        if(sexo == 'm'){
            cargos.push(mulher)
        }
        if(sexo == 'n'){
            cargos.push(naobinario)
        }
        if(sexualidade == 'h'){
            cargos.push(hetero)
        }
        if(sexualidade == 'lgbt'){
            cargos.push(lgbt)
        }
        if(idade == '+18'){
            cargos.push(mais18)
        }
        if(idade == '-18'){
            cargos.push(menos18)
        }
        if(civil == 's'){
            cargos.push(solteiro)
        }
        if(civil == 'n'){
            cargos.push(namorando)
        }
        if(civil == 'e'){
            cargos.push(enrolado)
        }
        if(civil == 'c'){
            cargos.push(casado)
        }
        var membro = message.guild.members.cache.get(usuario.id)
        if(membro.roles.cache.has("819749602978562058")) return message.reply('ja registrado!').then(m=>{
            m.delete({Timeout:1000*20})
        })
        for(var i in cargos){
            membro.roles.add(cargos[i].id)
        }
        var cargo = ''
        for(var i in cargos){
            cargo=cargo+" "+cargos[i].name
        }
        membro.roles.add('819749602978562058')
        membro.roles.remove('819749603376234518')
        message.channel.send('> Resgistrado!').then(m=>{
            m.delete({Timeout:1000*10})
        })
        membro.send(new MessageEmbed()
        .setColor('#ca00ed')
        .setDescription(`Registador:
        ${message.author.username}
        Cargos recebidos:
        ${cargo}
        `)

        )
        var banco = await db.ref(`Banco/servers/${message.guild.id}/registro/${message.author.id}`).once("value")
        client.channels.cache.get('820183632995155978').send(new MessageEmbed()
        .setColor('#ca00ed')
        .setDescription(`Registador:
${message.author.username}
Membro:
${usuario}
Cargos:
${cargo}

Total de registros: ${banco.val().registros}
        `))
          
          if(!banco.val()){
            db.ref(`Banco/servers/${message.guild.id}/registro/${message.author.id}`)
            .set({
              registros:1
            })
          }else{
            db.ref(`Banco/servers/${message.guild.id}/registro/${message.author.id}`)
            .update({
              registros:banco.val().registros + 1
            })
          }
    }
  }