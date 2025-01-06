import { igdl } from "ruhend-scraper";

let handler = async (m, { args, conn }) => { 
    if (!args[0]) {
        return conn.reply(m.chat, '🔗 *Por favor, proporciona un enlace de Instagram válido.*', m, rcanal);
    }
    try {
        await m.react(rwait);
        conn.reply(m.chat, `🕒 *Procesando tu video, por favor espera...*`, m, {
            contextInfo: { 
                externalAdReply: { 
                    mediaUrl: null, 
                    mediaType: 1, 
                    showAdAttribution: true,
                    title: packname,
                    body: wm,
                    previewType: 0, 
                    thumbnail: icons,
                    sourceUrl: channel 
                }
            }
        });      

        let res = await igdl(args[0]);
        let data = res.data;       
        for (let media of data) {
            await new Promise(resolve => setTimeout(resolve, 2000));           
            await conn.sendFile(
                m.chat, 
                media.url, 
                'instagram.mp4', 
                '🎥 *Aquí está tu video descargado de Instagram.*\n' + textbot, 
                fkontak
            );
        }
    } catch {
        await m.react(error);
        conn.reply(m.chat, '⚙️ *Ocurrió un error al procesar el enlace, intenta nuevamente.*', m, fake);
    }
};

handler.command = ['instagram2', 'ig2'];
handler.tags = ['descargas'];
handler.help = ['instagram2', 'ig2'];
//handler.yenes = 1
handler.group = true;
handler.register = true;

export default handler;