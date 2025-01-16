import fs from 'fs'
import fetch from 'node-fetch'
import { xpRange } from '../lib/levelling.js'
const { levelling } = '../lib/levelling.js'
import { promises } from 'fs'
import { join } from 'path'

let handler = async (m, { conn, usedPrefix, usedPrefix: _p, __dirname, text, command }) => {
    try {
        let _package = JSON.parse(await promises.readFile(join(__dirname, '../package.json')).catch(_ => ({}))) || {}
        let { exp, yenes, level, role } = global.db.data.users[m.sender]
        let { min, xp, max } = xpRange(level, global.multiplier)
        let name = await conn.getName(m.sender)
        let _uptime = process.uptime() * 1000
        let _muptime
        if (process.send) {
            process.send('uptime')
            _muptime = await new Promise(resolve => {
                process.once('message', resolve)
                setTimeout(resolve, 1000)
            }) * 1000
        }
        let user = global.db.data.users[m.sender]
        let muptime = clockString(_muptime)
        let uptime = clockString(_uptime)
        let totalreg = Object.keys(global.db.data.users).length
        let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length
        let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
        let mentionedJid = [who]
        let perfil = await conn.profilePictureUrl(who, 'image').catch(_ => 'https://qu.ax/QGAVS.jpg')
        let taguser = '@' + m.sender.split("@s.whatsapp.net")[0]
        const images = ['https://example.com/image1.jpg', 'https://example.com/image2.jpg', 'https://example.com/image3.jpg']

        let menu = `𔓕꯭  ꯭ ꯭ 𓏲꯭֟፝੭ ꯭⌑𝐌𝐞𝐧𝐮 𝐝𝐞 𝐓𝐞𝐜𝐧𝐨-𝐁𝐨𝐭⌑꯭ 𓏲꯭֟፝੭ ꯭  ꯭ ꯭𔓕

🚀 ¡𝐇𝐨𝐥𝐚! 𝐂𝐨𝐦𝐨 𝐄𝐬𝐭𝐚𝐬 𝐞𝐥 𝐃𝐢𝐚 𝐝𝐞 𝐇𝐨𝐲 *${taguser}* 𝐬𝐨𝐲 *𝐓𝐞𝐜𝐧𝐨-𝐁𝐨𝐭*, ${saludo}. 

┏━━⪩「 ♡⃝𝕴𝖓𝖋𝖔 𝖉𝖊 𝖑𝖆 𝕭𝖔𝐭ᚐ҉ᚐ 」⪨
┃❥ ⧼👑⧽ *Creador:* 𝑫𝒆𝒚𝒍𝒊𝒏
┃❥ ⧼🔱⧽ *Modo:* Publico
┃❥ ⧼🌠⧽ *Baileys:* Multi Device
┃❥ ⧼🤖⧽ *Bot:* ${(conn.user.jid == global.conn.user.jid ? 'Oficial' : 'Sub-Bot')}
┃❥ ⧼⏱️⧽ *Activada:* ${uptime}
┃❥ ⧼👥⧽ *Usuarios:* ${totalreg}
┗━━━━━━━━━━━━━━━━━⪩‎‎
‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎
┏━━⪩「 ♡⃝𝕴𝖓𝖋𝖔 𝖉𝖊 𝖀𝖘𝖚𝖆𝖗𝖎𝖔 」⪨
┃❥ ⧼👤⧽ *Cliente:* ${name}
┃❥ ⧼🌐⧽ *País:* ${global.userNationality}
┃❥ ⧼✨⧽ *Exp:* ${exp}
┃❥ ⧼💴⧽ *Yenes:* ${yenes}
┃❥ ⧼🌟⧽ *Nivel:* ${level}
┃❥ ⧼⚜️⧽ *Rango:* ${role}
┗━━━━━━━━━━━━━━━━━⪩
‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎
*─ׄ─ׄ─⭒─ׄ─ׅ─ׄ⭒─ׄ─ׄ─⭒─ׄ─ׄ─⭒─ׄ─ׅ──ׄ*
*【𝕷 𝖎 𝖘 𝖙 𝖆 - 𝕯𝖊 - 𝕮 𝖔 𝖒 𝖆 𝖓 𝖉 𝖔 𝖘】* 

# Aquí puedes agregar tus comandos manualmente

`.trim()

        for (const image of images) {
            await conn.sendMessage(m.chat, { image: { url: image }, caption: menu, contextInfo: { mentionedJid: [m.sender], isForwarded: true, forwardedNewsletterMessageInfo: { newsletterJid: channelRD.[...] } } }, { quoted: null })
        }
        await m.react(emojis)    

    } catch (e) {
        await m.reply(`✘ Ocurrió un error al enviar el menú\n\n${e}`)
        await m.react(error)
    }
}

handler.help = ['menu']
handler.tags = ['main']
handler.command = ['menu', 'help', 'menú'] 
handler.register = true
export default handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)
function clockString(ms) {
    let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
    let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
    let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
    return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}