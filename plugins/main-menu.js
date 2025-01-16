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
const vid = ['https://files.catbox.moe/4wyjr0.mp4', 'https://files.catbox.moe/4wyjr0.mp4', 'https://files.catbox.moe/4wyjr0.mp4']

let menu = `*⌬━━━━━▣━━◤⌬◢━━▣━━━━━━⌬*

Hola *〘〙ッ𝑫𝒆𝒚𝒍𝒊𝒏ッ〘〙* soy *TECNO*

╔════⌬══◤𝑪𝑹𝑬𝑨𝑫𝑶𝑹◢
║  ♛ 𝑫𝒆𝒚𝒍𝒊𝒏
╚════⌬══◤✰✰✰✰✰◢

╔══════⌬『 𝑰𝑵𝑭𝑶-𝑩𝑶𝑻 』
║ ✎ 〘Cliente: 〘〙ッ𝑫𝒆𝒚𝒍𝒊𝒏ッ〘〙
║ ✎ 〘Exp: 9792
║ ✎ 〘Nivel: 0
╚══════ ♢.✰.♢ ══════

╔═══════⌬『 𝑰𝑵𝑭𝑶-𝑼𝑺𝑬𝑹 』
║ ✎ 〘Bot: ©Tecno-Bot-Plus®
║ ✎ 〘Modo Público
║ ✎ 〘Baileys: Multi Device
║ ✎ 〘Tiempo Activo: 00:18:39
║ ✎ 〘Usuarios: 1069 
╚══════ ♢.✰.♢ ══════

*◤━━━━━ ☆. ⌬ .☆ ━━━━━◥*
 ‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎
			⚙_*𝑳𝑰𝑺𝑻𝑨 𝑫𝑬 𝑪𝑶𝑴𝑨𝑵𝑫𝑶𝑺*_ 

*┏━━━━▣━━⌬〘 🧧 ANIME 🎐 〙*
┃✎›〘 .acosar @usuario
┃✎›〘 .abrazar @usuario
┃✎›〘 .llorar @usuario
┃✎›〘 .abrazar @usuario
┃✎›〘 .awoo @usuario
┃✎›〘 .besar @usuario
┃✎›〘 .lamer @usuario
┃✎›〘 .acariciar @usuario
┃✎›〘 .engreído @usuario
┃✎›〘 .golpear @usuario
┃✎›〘 .lanzar @usuario
┃✎›〘 .ruborizarse @usuario
┃✎›〘 .sonreír @usuario
┃✎›〘 .saludar @usuario
┃✎›〘 .chocar @usuario
┃✎›〘 .sostener @usuario
┃✎›〘 .morder @usuario
┃✎›〘 .glomp @usuario
┃✎›〘 .abofetear @usuario
┃✎›〘 .matar @usuario
┃✎›〘 .feliz @usuario
┃✎›〘 .guiñar @usuario
┃✎›〘 .tocar @usuario
┃✎›〘 .bailar @usuario
┃✎›〘 .cringe @usuario
*┗━━━▣━━⌬⌨⌬━━▣━━━━⌬*
*┏━━━━▣━━⌬〘 ❗ INFO ❕ 〙*
┃✎›〘 .comprar
┃✎›〘 .staff
┃✎›〘 .grupos
┃✎›〘 .allmenu
┃✎›〘 .ping
┃✎›〘 .runtime
┃✎›〘 .script
*┗━━━▣━━⌬⌨⌬━━▣━━━━⌬*
*┏━━━━▣━━⌬〘 🔎 SEARCH 🔍 〙*
┃✎›〘 .tiktoksearch <txt>
┃✎›〘 .google <pencarian>
┃✎›〘 .googlef <pencarian>
*┗━━━▣━━⌬⌨⌬━━▣━━━━⌬*
*┏━━━━▣━━⌬〘 🕹️ GAME 🎮 〙*
┃✎›〘 .apostar *<cantidad>*
┃✎›〘 .mates
*┗━━━▣━━⌬⌨⌬━━▣━━━━⌬*
*┏━━━━▣━━⌬〘 ⚙️ SUB BOTS 🤖 〙*
┃✎›〘 .bots
*┗━━━▣━━⌬⌨⌬━━▣━━━━⌬*
*┏━━━━▣━━⌬〘 🌐 RPG 🥇 〙*
┃✎›〘 .addprem [@user] <days>
┃✎›〘 .bank
┃✎›〘 .crimen
┃✎›〘 .dareris *@user <cantidad>*
┃✎›〘 .darxp *@user <cantidad>*
┃✎›〘 .minar
*┗━━━▣━━⌬⌨⌬━━▣━━━━⌬*
*┏━━━━▣━━⌬〘 🎑 REGISTRO 🎟️ 〙*
┃✎›〘 .profile
┃✎›〘 .reg *<nombre.edad>*
┃✎›〘 .mysn
┃✎›〘 .unreg
*┗━━━▣━━⌬⌨⌬━━▣━━━━⌬*
*┏━━━━▣━━⌬〘 💟 STICKER 🏷️ 〙*
┃✎›〘 .emojimix *<emoji+emoji>*
┃✎›〘 .pfp @user
┃✎›〘 .qc
┃✎›〘 .sticker
┃✎›〘 .toimg (reply)
┃✎›〘 .take *<nombre>|<autor>*
┃✎›〘 .tovid *<sticker>*
*┗━━━▣━━⌬⌨⌬━━▣━━━━⌬*
*┏━━━━▣━━⌬〘 🖼️ IMAGE 🎇 〙*
┃✎›〘 .pixiv *<búsqueda>*
┃✎›〘 .pinterest
*┗━━━▣━━⌬⌨⌬━━▣━━━━⌬*
*┏━━━━▣━━⌬〘 👥 GROUPS 📢 〙*
┃✎›〘 .todos <mensaje>
┃✎›〘 .antibot *<on/off>*
┃✎›〘 .delete
┃✎›〘 .despertar
┃✎›〘 .fantasmas
┃✎›〘 .infogp
┃✎›〘 .promote *@user*
┃✎›〘 .resetlink
┃✎›〘 .group *abierto/cerrado*
┃✎›〘 .delete2
┃✎›〘 .otag
*┗━━━▣━━⌬⌨⌬━━▣━━━━⌬*
*┏━━━━▣━━⌬〘 🎛️ ON / OFF 🔌 〙*
┃✎›〘 .enable
┃✎›〘 .disable
*┗━━━▣━━⌬⌨⌬━━▣━━━━⌬*
*┏━━━━▣━━⌬〘 💎 PREMIUM 👑 〙*
*┗━━━▣━━⌬⌨⌬━━▣━━━━⌬*
*┏━━━━▣━━⌬〘 📥 DOWNLOAD 📤 〙*
┃✎›〘 Audio
┃✎›〘 Video
┃✎›〘 .playx *<enlace de YouTube>*
┃✎›〘 .tiktokrandom ◜⭐◞
┃✎›〘 .aptoide *<búsqueda>*
┃✎›〘 .danbooru *<url>*
┃✎›〘 .play
┃✎›〘 .soundcloud *<búsqueda>*
┃✎›〘 .tiktokuser *<usuario>*
┃✎›〘 .tiktokvid *<búsqueda>*
┃✎›〘 .pixiv *<búsqueda>*
┃✎›〘 .xnxxdl *<url>*
┃✎›〘 Video
*┗━━━▣━━⌬⌨⌬━━▣━━━━⌬*
*┏━━━━▣━━⌬〘 🔧 TOOLS 🛠️ 〙*
┃✎›〘 .ssweb
┃✎›〘 .ss
┃✎›〘 .ver
┃✎›〘 .google <pencarian>
┃✎›〘 .googlef <pencarian>
┃✎›〘 .genearimg
┃✎›〘 .chatgpt <texto>
┃✎›〘 .ia2 <texto>
┃✎›〘 .removebg
┃✎›〘 .tovid *<sticker>*
┃✎›〘 .whatmusic <audio/video>
┃✎›〘 .vendo
*┗━━━▣━━⌬⌨⌬━━▣━━━━⌬*
*┏━━━━▣━━⌬〘 🎉 FUN 🎊 〙*
┃✎›〘 .ship
┃✎›〘 .gay2 *@user*
┃✎›〘 .lesbiana *@user*
┃✎›〘 .pajero *@user*
┃✎›〘 .pajera *@user*
┃✎›〘 .puto *@user*
┃✎›〘 .puta *@user*
┃✎›〘 .manco *@user*
┃✎›〘 .manca *@user*
┃✎›〘 .rata *@user*
┃✎›〘 .prostituta *@user*
┃✎›〘 .prostituto *@user*
┃✎›〘 .follar
┃✎›〘 .formartrio
┃✎›〘 .marica
┃✎›〘 .personalidad *<nombre>*
┃✎›〘 .acosar @usuario
┃✎›〘 .abrazar @usuario
┃✎›〘 .llorar @usuario
┃✎›〘 .abrazar @usuario
┃✎›〘 .awoo @usuario
┃✎›〘 .besar @usuario
┃✎›〘 .lamer @usuario
┃✎›〘 .acariciar @usuario
┃✎›〘 .engreído @usuario
┃✎›〘 .golpear @usuario
┃✎›〘 .lanzar @usuario
┃✎›〘 .ruborizarse @usuario
┃✎›〘 .sonreír @usuario
┃✎›〘 .saludar @usuario
┃✎›〘 .chocar @usuario
┃✎›〘 .sostener @usuario
┃✎›〘 .morder @usuario
┃✎›〘 .glomp @usuario
┃✎›〘 .abofetear @usuario
┃✎›〘 .matar @usuario
┃✎›〘 .feliz @usuario
┃✎›〘 .guiñar @usuario
┃✎›〘 .tocar @usuario
┃✎›〘 .bailar @usuario
┃✎›〘 .cringe @usuario
┃✎›〘 .reto
*┗━━━▣━━⌬⌨⌬━━▣━━━━⌬*
*┏━━━━▣━━⌬〘 🔞 NSFW 📛 〙*
┃✎›〘 .hentai
┃✎›〘 .genshin
┃✎›〘 .swimsuit
┃✎›〘 .schoolswimsuit
┃✎›〘 .white
┃✎›〘 .barefoot
┃✎›〘 .touhou
┃✎›〘 .gamecg
┃✎›〘 .hololive
┃✎›〘 .uncensored
┃✎›〘 .sunglasses
┃✎›〘 .glasses
┃✎›〘 .weapon
┃✎›〘 .shirtlift
┃✎›〘 .chain
┃✎›〘 .fingering
┃✎›〘 .flatchest
┃✎›〘 .torncloth
┃✎›〘 .bondage
┃✎›〘 .demon
┃✎›〘 .wet
┃✎›〘 .pantypull
┃✎›〘 .headdress
┃✎›〘 .headphone
┃✎›〘 .tie
┃✎›〘 .anusview
┃✎›〘 .shorts
┃✎›〘 .stokings
┃✎›〘 .topless
┃✎›〘 .beach
┃✎›〘 .bunnygirl
┃✎›〘 .bunnyear
┃✎›〘 .idol
┃✎›〘 .vampire
┃✎›〘 .gun
┃✎›〘 .maid
┃✎›〘 .bra
┃✎›〘 .nobra
┃✎›〘 .bikini
┃✎›〘 .whitehair
┃✎›〘 .blonde
┃✎›〘 .pinkhair
┃✎›〘 .bed
┃✎›〘 .ponytail
┃✎›〘 .nude
┃✎›〘 .dress
┃✎›〘 .underwear
┃✎›〘 .foxgirl
┃✎›〘 .uniform
┃✎›〘 .skirt
┃✎›〘 .sex
┃✎›〘 .sex2
┃✎›〘 .sex3
┃✎›〘 .breast
┃✎›〘 .twintail
┃✎›〘 .spreadpussy
┃✎›〘 .tears
┃✎›〘 .seethrough
┃✎›〘 .breasthold
┃✎›〘 .drunk
┃✎›〘 .fateseries
┃✎›〘 .spreadlegs
┃✎›〘 .openshirt
┃✎›〘 .headband
┃✎›〘 .food
┃✎›〘 .close
┃✎›〘 .tree
┃✎›〘 .nipples
┃✎›〘 .erectnipples
┃✎›〘 .horns
┃✎›〘 .greenhair
┃✎›〘 .wolfgirl
┃✎›〘 .catgirl
┃✎›〘 .r34 <texto>
┃✎›〘 .xnxxdl *<url>*
*┗━━━▣━━⌬⌨⌬━━▣━━━━⌬*
*┏━━━━▣━━⌬〘 🧮 DATABASE 🖥️ 〙*
┃✎›〘 .delcmd *<texto>*
*┗━━━▣━━⌬⌨⌬━━▣━━━━⌬*
*┏━━━━▣━━⌬〘 👤 OWNER 👁️ 〙*
┃✎›〘 .enable
┃✎›〘 .disable
┃✎›〘 .banuser <@tag>
┃✎›〘 .addestrellas *<@user>*
┃✎›〘 .addprem [@user] <days>
┃✎›〘 .autoadmin
┃✎›〘 .dsowner
┃✎›〘 .getsesion
┃✎›〘 .restart
┃✎›〘 .savefile
┃✎›〘 .update
┃✎›〘 .actualizar
*┗━━━▣━━⌬⌨⌬━━▣━━━━⌬*
*┏━━━━▣━━⌬〘 📣 AUDIOS 🔊 〙*
┃✎›〘 .bass *<mp3/vn>*
┃✎›〘 .blown *<mp3/vn>*
┃✎›〘 .deep *<mp3/vn>*
┃✎›〘 .earrape *<mp3/vn>*
┃✎›〘 .fast *<mp3/vn>*
┃✎›〘 .fat *<mp3/vn>*
┃✎›〘 .nightcore *<mp3/vn>*
┃✎›〘 .reverse *<mp3/vn>*
┃✎›〘 .robot *<mp3/vn>*
┃✎›〘 .slow *<mp3/vn>*
┃✎›〘 .smooth *<mp3/vn>*
┃✎›〘 .tupai *<mp3/vn>*
┃✎›〘 .reverb *<mp3/vn>*
┃✎›〘 .chorus *<mp3/vn>*
┃✎›〘 .flanger *<mp3/vn>*
┃✎›〘 .distortion *<mp3/vn>*
┃✎›〘 .pitch *<mp3/vn>*
┃✎›〘 .highpass *<mp3/vn>*
┃✎›〘 .lowpass *<mp3/vn>*
┃✎›〘 .underwater *<mp3/vn>*
*┗━━━▣━━⌬⌨⌬━━▣━━━━⌬*
*┏━━━━▣━━⌬〘 🗝️ ADVANCED 📍 〙*
*┗━━━▣━━⌬⌨⌬━━▣━━━━⌬*
*┏━━━━▣━━⌬〘 enlace2 〙*
┃✎›〘 .link2
*┗━━━▣━━⌬⌨⌬━━▣━━━━⌬*
*┏━━━━▣━━⌬〘 descargas 〙*
┃✎›〘 .spotify
┃✎›〘 .facebook2 ◜⭐◞
┃✎›〘 .fb2 ◜⭐◞
┃✎›〘 .instagram2
┃✎›〘 .ig2
┃✎›〘 .facebook ◜⭐◞
┃✎›〘 .fb ◜⭐◞
┃✎›〘 .mediafire <url>
┃✎›〘 .pinterest
┃✎›〘 .play3
┃✎›〘 .play4
┃✎›〘 .tiktok *<link>* ◜⭐◞
┃✎›〘 .imagen <query>
┃✎›〘 .play2 <formato> <búsqueda>
*┗━━━▣━━⌬⌨⌬━━▣━━━━⌬*
*┏━━━━▣━━⌬〘 mods 〙*
┃✎›〘 .banchat
┃✎›〘 .unbanchat
┃✎›〘 .unbanuser <@tag>
*┗━━━▣━━⌬⌨⌬━━▣━━━━⌬*
*┏━━━━▣━━⌬〘 grupo 〙*
┃✎›〘 .kick
┃✎›〘 .group abrir / cerrar
┃✎›〘 .add
┃✎›〘 .tag <mensaje>
*┗━━━▣━━⌬⌨⌬━━▣━━━━⌬*
*┏━━━━▣━━⌬〘 info 〙*
┃✎›〘 .ds
┃✎›〘 .fixmsgespera
┃✎›〘 .creador
┃✎›〘 .owner
*┗━━━▣━━⌬⌨⌬━━▣━━━━⌬*
*┏━━━━▣━━⌬〘 fix 〙*
┃✎›〘 .dsowner
*┗━━━▣━━⌬⌨⌬━━▣━━━━⌬*
*┏━━━━▣━━⌬〘 buscador 〙*
┃✎›〘 .imagen <query>
*┗━━━▣━━⌬⌨⌬━━▣━━━━⌬*
*┏━━━━▣━━⌬〘 jadibot 〙*
┃✎›〘 .code
*┗━━━▣━━⌬⌨⌬━━▣━━━━⌬*
*┏━━━━▣━━⌬〘 convertir 〙*
┃✎›〘 .toibb
*┗━━━▣━━⌬⌨⌬━━▣━━━━⌬*
*┏━━━━▣━━⌬〘 transformador 〙*
┃✎›〘 .tourl2
*┗━━━▣━━⌬⌨⌬━━▣━━━━⌬*
©  *TECNO BOT - Desarrollado por DEYLIN*`.trim()

await conn.sendMessage(m.chat, { video: { url: vid.getRandom() }, caption: menu, contextInfo: { mentionedJid: [m.sender], isForwarded: true, forwardedNewsletterMessageInfo: { newsletterJid: channelRD.id, newsletterName: channelRD.name, serverMessageId: -1, }, forwardingScore: 999, externalAdReply: { title: '♡⃝🚀𝑻𝒆𝒄𝒏𝒐-𝑩𝒐𝒕ᚐ҉ᚐ', body: dev, thumbnailUrl: perfil, sourceUrl: redes, mediaType: 1, renderLargerThumbnail: false,
}, }, gifPlayback: true, gifAttribution: 0 }, { quoted: null })
await m.react(emojis)    

} catch (e) {
await m.reply(`✘ Ocurrió un error al enviar el menú\n\n${e}`)
await m.react(error)
}}

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
return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')}