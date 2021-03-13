module.exports = async (client, member) => {
    client.channels.cache.get("819749664768524288").send(
        new MessageEmbed()
        .setDescription(`
        <a:Eva_Lotus:809249735374274660> Bem vindo ${member.user.username}
    <a:bug_Neonplaneta:809249289275703296> Ganhe novas tegs em <#819749660297003028>!
    <a:VDL_azul_insta:820021324101451806> Poste suas fotinhas em <#819749653574713374>!
        `)
        .setColor("#4B0082")
        ).then(m=>{
          m.delete({ timeout: 1000*60*5 })
        })
}