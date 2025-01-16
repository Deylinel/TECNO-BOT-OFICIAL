import { promises } from 'fs';
import { join } from 'path';
import fetch from 'node-fetch';
import { xpRange } from '../lib/levelling.js';

const defaultMenu = {
  before: `*⌬━━━━━▣━━◤⌬◢━━▣━━━━━━⌬*

Hola *%name* soy *TECNO*

╔════⌬══◤𝑪𝑹𝑬𝑨𝑫𝑶𝑹◢
║  ♛ 𝑫𝒆𝒚𝒍𝒊𝒏
╚════⌬══◤✰✰✰✰✰◢

╔══════⌬『 𝑰𝑵𝑭𝑶-𝑩𝑶𝑻 』
║ ✎ 〘Cliente: %name
║ ✎ 〘Exp: %exp
║ ✎ 〘Nivel: %level
╚══════ ♢.✰.♢ ══════

╔═══════⌬『 𝑰𝑵𝑭𝑶-𝑼𝑺𝑬𝑹 』
║ ✎ 〘Bot: ©Tecno-Bot-Plus®
║ ✎ 〘Modo Público
║ ✎ 〘Baileys: Multi Device
║ ✎ 〘Tiempo Activo: %muptime
║ ✎ 〘Usuarios: %totalreg 
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
┃✎›〘 .ver
┃✎›〘 .google <pencarian>
┃✎›〘 .googlef <pencarian>
┃✎›〘 .genearimg
┃✎›〘 .chatgpt <texto>
┃✎›〘 .ia2 <texto>
┃✎›〘 .removebg
┃✎›〘 .ssweb
┃✎›〘 .ss
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
*┏━━━━▣━━⌬〘 🗝️ ADVANCED 🎮 〙*
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
*┗━━━▣━━⌬⌨⌬━━▣━━━━⌬*',
  after: `© Tecno-Bot-Plus`,
};

let handler = async (m, { conn, usedPrefix: _p, __dirname }) => {
  try {
    let tag = `@${m.sender.split("@")[0]}`;
    let { exp, level } = global.db.data.users[m.sender];
    let { min, xp, max } = xpRange(level, global.multiplier);
    let name = await conn.getName(m.sender);
    let totalreg = Object.keys(global.db.data.users).length;
    let muptime = process.uptime();

    let help = Object.values(global.plugins)
      .filter(plugin => !plugin.disabled)
      .map(plugin => ({
        help: Array.isArray(plugin.tags) ? plugin.help : [plugin.help],
        tags: Array.isArray(plugin.tags) ? plugin.tags : [plugin.tags],
        prefix: 'customPrefix' in plugin,
        limit: plugin.limit,
        premium: plugin.premium,
        enabled: !plugin.disabled,
      }));

    let before = defaultMenu.before;
    let header = defaultMenu.header;
    let body = defaultMenu.body;
    let footer = defaultMenu.footer;
    let after = defaultMenu.after;

    let text = [
      before,
      ...Object.keys(global.plugins)
        .filter(tag => global.plugins[tag].enabled) // Filtramos por los plugins habilitados
        .map(tag => {
          return header.replace(/%category/g, tag) + '\n' + [
            ...help
              .filter(menu => menu.tags && menu.tags.includes(tag) && menu.help)
              .map(menu =>
                menu.help
                  .map(help =>
                    body
                      .replace(/%cmd/g, menu.prefix ? help : '%p' + help)
                      .replace(/%islimit/g, menu.limit ? '◜⭐◞' : '')
                      .replace(/%isPremium/g, menu.premium ? '◜🪪◞' : '')
                      .trim()
                  )
                  .join('\n')
              ),
            footer,
          ].join('\n');
        }),
      after,
    ].join('\n');

    text = text.replace(
      /%(\w+)/g,
      (_, name) => ({ p: _p, tag, name, exp, level, muptime, totalreg }[name] || `%${name}`)
    );

    let images = [
      'https://i.ibb.co/CPVcnqH/file.jpg',
      'https://i.ibb.co/9WrytGt/file.jpg',
      'https://i.ibb.co/JmcS3kv/Sylph.jpg',
    ];
    let randomImage = images[Math.floor(Math.random() * images.length)];

    await conn.sendFile(m.chat, randomImage, 'thumbnail.jpg', text.trim(), m);
  } catch (e) {
    conn.reply(m.chat, '❎ Lo sentimos, el menú tiene un error.', m);
    console.error(e);
  }
};

handler.help = ['allmenu'];
handler.tags = ['main'];
handler.command = ['allmenu', 'menucompleto', 'menúcompleto', 'menú', 'menu'];
handler.register = true;
export default handler;