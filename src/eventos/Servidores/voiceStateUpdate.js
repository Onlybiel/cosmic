const voiceLogs = new Map()
const firebase = require('firebase')
const db = firebase.database()
module.exports = async (client, oldState, newState) => {
    if(!newState.member.roles.cache.has("819749558451568670")) return
    var banco = await db.ref(`Banco/servers/${newState.guild.id}/users/${newState.member.id}`).once("value")
    var muteTotal
    if (!oldState.selfMute){
      voiceLogs.set(`${newState.member.id}_mute`,Date.now())
    }
      if (oldState.selfMute){
        var tempoMute = Date.now() - voiceLogs.get(`${newState.member.id}_mute`)
        var valor = voiceLogs.get(`${newState.member.id}_tempomute`)
        voiceLogs.set(`${newState.member.id}_tempomute`,valor+tempoMute)
        voiceLogs.delete(`${newState.member.id}_mute`)
    }
    if (!oldState.channel && newState.channel) {// entrou
  db.ref(`Banco/servers/${newState.guild.id}/users/${newState.member.id}`).once("value").then(async database =>{
    if(!database.val()){
      db.ref(`Banco/servers/${newState.guild.id}/users/${newState.member.id}`)
      .set({
        tempocall:0
      })
    }
  })
  voiceLogs.set(`${newState.member.id}_tempomute`,0)
  if(newState.selfMute){
    voiceLogs.set(`${newState.member.id}_mute`,Date.now())
  }
        voiceLogs.set(newState.member.id, Date.now())
    }
  
    if (oldState.channel && !newState.channel) { // saiu
        const tempoConectado = Date.now() - voiceLogs.get(oldState.member.id)
        voiceLogs.delete(oldState.member.id)
        
        
        if(voiceLogs.get(`${newState.member.id}_mute`)){
          tempoMute = Date.now() - voiceLogs.get(`${newState.member.id}_mute`)
          valor = voiceLogs.get(`${newState.member.id}_tempomute`)
          voiceLogs.set(`${newState.member.id}_tempomute`,valor + tempoMute)
  voiceLogs.delete(`${newState.member.id}_mute`)
        }
        var tempoEmSegundos = Math.round(tempoConectado / 1000)
        var tempoMuteEmSegundos = Math.round(voiceLogs.get(`${newState.member.id}_tempomute`) / 1000)
        
        var contabilizado = tempoEmSegundos - tempoMuteEmSegundos
        
        var tempopraadd = banco.val().tempocall
        db.ref(`Banco/servers/${newState.guild.id}/users/${newState.member.id}`)
        .update({
          tempocall:contabilizado + tempopraadd
        })
        voiceLogs.delete(`${newState.member.id}_mute`)
          var canal = await db.ref(`Banco/servers/${newState.guild.id}/config/`).once("value")
          if(!canal.val()) return
           var canallogs = canal.val().canallogs
        if(canallogs){
          let embed = new Discord.MessageEmbed()
        .setAuthor("Tempo em call",newState.guild.iconURL())
        .setFooter("Atenciosamente equipe de devs")
        .setColor("#00FF00")
        .setTimestamp()
        .setThumbnail(newState.member.user.displayAvatarURL())
        .addField("Tempo em call: ",tempoEmSegundos)
        .addField("Tempo mutado: ",tempoMuteEmSegundos)
        .addField("Tempo contabilizado: ",contabilizado)
        client.channels.cache.get(canallogs).send(embed).catch((err)=>{
          
        })
        }
      
    }
}