import { WAMessageStubType } from '@whiskeysockets/baileys';

export async function before(m, { conn, groupMetadata }) {
  if (!m.messageStubType || !m.isGroup) return !0;

  // Detectar si el bot se unió al grupo
  if (m.messageStubType == WAMessageStubType.add && m.messageStubParameters.includes(conn.user.jid)) {
    const reglasYPoliticas = `┌───「 *Normas y Políticas del Bot* 」───┐
├ ✨ *1. Uso Responsable:*
│ - El bot no debe usarse para actividades ilegales, ofensivas o prohibidas.
│ - No se permite saturar el bot con comandos innecesarios.
├ ✨ *2. Respeto:*
│ - Está prohibido insultar o usar lenguaje inapropiado hacia el bot.
│ - Respeta a los administradores y miembros del grupo.
├ ✨ *3. Privacidad:*
│ - El bot no recopila ni comparte información personal.
│ - Los datos del grupo se usan únicamente para responder a comandos.
├ ✨ *4. Soporte:*
│ - Si encuentras un error, informa a los desarrolladores.
│ - El mal uso del bot puede provocar su eliminación del grupo.
├ ✨ *5. Términos Generales:*
│ - Al usar el bot, aceptas estas condiciones.
│ - El incumplimiento puede llevar al bloqueo del servicio.
└────────────────────────────────────┈ ⳹
*Bot administrado por Barboza Bot 🤖*
© Código creado por Deyin`;

    await conn.sendMessage(m.chat, { text: reglasYPoliticas }, { quoted: m });
  }
}