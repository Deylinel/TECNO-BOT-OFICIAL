let handler = async (m, { conn, command, usedPrefix }) => {
let staff = `✨ *EQUIPO DE AYUDANTES*
🤖 *Bot:* ${global.botname}
🌟 *Versión:* ${global.vs}

👑 *Propietario:*

• Deylin
🤴 *Rol:* Propietario
📱 *Número:* wa.me/50433222264
✨️ *GitHub:* https://github.com/Deylinel/TECNO-BOT-OFICIAL

🚀  *Colaboradores:*

• Diego 
🦁 *Rol:* Soporte
📱 *Número:* Wa.me/525539585733

• Niño Piña
🐯 *Rol:* Moderador
📱 *Número:* Wa.me/50557865603
`
await conn.sendFile(m.chat, icons, 'yaemori.jpg', staff.trim(), fkontak, true, {
contextInfo: {
'forwardingScore': 200,
'isForwarded': false,
externalAdReply: {
showAdAttribution: true,
renderLargerThumbnail: false,
title: `🥷 Developers 👑`,
body: `✨ Staff Oficial`,
mediaType: 1,
sourceUrl: redes,
thumbnailUrl: icono
}}
}, { mentions: m.sender })
m.react(emoji)

}
handler.help = ['staff']
handler.command = ['colaboradores', 'staff']
handler.register = true
handler.tags = ['main']

export default handler