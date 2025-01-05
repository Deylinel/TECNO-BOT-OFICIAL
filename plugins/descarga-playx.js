import axios from 'axios'

const handler = async (m, { conn, command, args, text, usedPrefix }) => {
  if (!text) {
    await m.react('❌');
    return conn.reply(m.chat, `🧑‍💻INGRESE EL NOMBRE DE ALGUNA CANCIÓN *Soundcloud.*`, m, rcanal);
  }

  await m.react('🕒');
  console.log('⏱️ Processing request...');

  try {
    let searchUrl = `https://api.example.com/soundcloud/search?query=${encodeURIComponent(text)}`; // Reemplaza 'example' por la API adecuada
    console.log('📡 Fetching search data from:', searchUrl);
    let searchResponse = await axios.get(searchUrl);
    if (!searchResponse.data || searchResponse.data.length === 0) {
      console.log('❌ No search results found.');
      throw new Error('No se encontró información de la música.');
    }

    let { url, title, quality, image } = searchResponse.data[0];
    console.log('🔍 Search results:', { url, title, quality, image });

    let downloadUrl = `https://api.example.com/soundcloud/download?url=${url}`; // Reemplaza 'example' por la API adecuada
    console.log('📡 Fetching download data from:', downloadUrl);
    let downloadResponse = await axios.get(downloadUrl);
    if (!downloadResponse.data || !downloadResponse.data.link) {
      console.log('❌ Download data not found.');
      throw new Error('Error al obtener el enlace de descarga.');
    }

    let audioBuffer = await getBuffer(downloadResponse.data.link);
    if (!audioBuffer) {
      console.log('❌ Audio buffer not found.');
      throw new Error('Error al descargar la música.');
    }
    console.log('🎵 Audio buffer obtained.');

    let txt = `*\`- S O U N C L O U D - M U S I C -\`*\n\n`
    txt += `        ✩  *Título* : ${title}\n`
    txt += `        ✩  *Calidad* : ${quality}\n`
    txt += `        ✩  *Url* : ${url}\n\n`
    txt += `> 🚩 *${textbot}*`

    await conn.sendFile(m.chat, image, 'thumbnail.jpg', txt, m, null, rcanal);
    await conn.sendMessage(m.chat, { audio: audioBuffer, fileName: `${title}.mp3`, mimetype: 'audio/mpeg' }, { quoted: m });
    console.log('✅ Music sent successfully.');

    await m.react('✅');
  } catch (error) {
    console.error('Error:', error);
    await m.react('❌');
    conn.reply(m.chat, `🚩 Error al descargar la canción. Por favor, intente de nuevo.`, m);
  }
};

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
    return null;
  }
};

handler.help = ['soundcloud *<búsqueda>*']
handler.tags = ['downloader']
handler.command = ['soundcloud', 'sound', 'play']
handler.register = true

export default handler