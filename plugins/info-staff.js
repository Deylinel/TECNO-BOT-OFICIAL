let handler = async (m, { conn, command }) => {
  // Información del staff
  const staff = `
✨ *EQUIPO DE AYUDANTES*
🤖 *Bot:* ${global.botname || "Bot Desconocido"}
🌟 *Versión:* ${global.vs || "1.0"}

👑 *Propietario:*
• *Nombre:* Deylin
• *Rol:* Propietario
• *Número:* wa.me/50433222264
• *GitHub:* [Repositorio](https://github.com/Deylinel/TECNO-BOT-OFICIAL)

🚀 *Colaboradores:*
• *Nombre:* Diego
• *Rol:* Soporte
• *Número:* wa.me/525539585733

• *Nombre:* Niño Piña
• *Rol:* Moderador
• *Número:* wa.me/50557865603
`.trim();

  try {
    // Enviar el mensaje con información del staff
    await conn.sendFile(
      m.chat,
      global.icons || null, // Ruta del ícono (asegúrate de definir 'icons' en tus variables globales)
      "staff.jpg",
      staff,
      null,
      true,
      {
        contextInfo: {
          forwardingScore: 200,
          isForwarded: false,
          externalAdReply: {
            showAdAttribution: true,
            renderLargerThumbnail: false,
            title: `🥷 Developers 👑`,
            body: `✨ Staff Oficial`,
            mediaType: 1,
            sourceUrl: global.redes || "https://github.com/Deylinel/TECNO-BOT-OFICIAL", // Asegúrate de definir 'redes' en las globales
            thumbnailUrl: global.icono || null, // Miniatura (asegúrate de definir 'icono' en las globales)
          },
        },
      }
    );

    // Reacción al comando (opcional)
    if (global.emoji) {
      await m.react(global.emoji);
    }
  } catch (error) {
    // Manejo de errores
    console.error(error);
    await m.reply("Ocurrió un error al ejecutar el comando. Por favor, verifica la configuración del bot.");
  }
};

// Configuración del comando
handler.help = ["staff"];
handler.command = ["colaboradores", "staff"];
handler.register = true;
handler.tags = ["main"];

export default handler;