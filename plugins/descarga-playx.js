import axios from 'axios'

const handler = async (m, { conn, command, args, text, usedPrefix }) => {
  if (!text) return conn.reply(m.chat, `🧑‍💻INGRESE EL NOMBRE DE ALGUNA CANCIÓN *Soundcloud.*`, m, rcanal)

  await m.react('🕒');
  
  try {
    let searchUrl = `https://api.example.com/soundcloud/search?query=${encodeURIComponent(text)}` // Reemplaza 'example' por la API adecuada
    let searchResponse = await axios.get(searchUrl)
    let searchData = searchResponse.data

    if (!searchData || searchData.length === 0) {
      throw new Error('No se encontró información de la música.')
    }

    let { url, title, quality, image } = searchData[0]

    let downloadUrl = `https://api.example.com/soundcloud/download?url=${url}` // Reemplaza 'example' por la API adecuada
    let downloadResponse = await axios.get(downloadUrl)
    let downloadData = downloadResponse.data

    let audioBuffer = await getBuffer(downloadData.link)

    let txt = `*\`- S O U N C L O U D - M U S I C -\`*\n\n`
    txt += `        ✩  *Título* : ${title}\n`
    txt += `        ✩  *Calidad* : ${quality}\n`
    txt += `        ✩  *Url* : ${url}\n\n`
    txt += `> 🚩 *${textbot}*`

    await conn.sendFile(m.chat, image, 'thumbnail.jpg', txt, m, null, rcanal)
    await conn.sendMessage(m.chat, { audio: audioBuffer, fileName: `${title}.mp3`, mimetype: 'audio/mpeg' }, { quoted: m })

    await m.react('✅');
  } catch (error) {
    console.error('Error:', error)
    await conn.react('❎');
    conn.reply(m.chat, `🚩 Error al descargar la canción. Por favor, intente de nuevo.`, m)
  }
}

const getBuffer = async (url, options) => {
  try {
    const res = await axios({
      method: 'get',
      url,
      headers: {
        'DNT': 1,
        'Upgrade-Insecure-Request': 1,
      },
      ...options,
      responseType: 'arraybuffer',
    });
    return res.data;
  } catch (e) {
    console.log(`Error : ${e}`);
  }
};

handler.help = ['soundcloud *<búsqueda>*']
handler.tags = ['downloader']
handler.command = ['soundcloud', 'sound', 'playx']
handler.register = true

export default handler