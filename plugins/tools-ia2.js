const API_URL = "https://apis-starlights-team.koyeb.app/starlight/gemini?text=";

async function obtenerRespuestaIA(mensaje) {
    try {
        const mensajeLower = mensaje.toLowerCase();

        // Respuestas personalizadas
        if (mensajeLower.includes("cómo te llamas") || mensajeLower.includes("tu nombre")) {
            return "Me llamo Kirito-Bot, fui creado por Deylin y solo hablo español.";
        }

        if (mensajeLower.includes("quién te creó") || mensajeLower.includes("quién es tu creador")) {
            return "Fui creado por Deylin.";
        }

        if (mensajeLower.includes("qué idiomas hablas") || mensajeLower.includes("hablas otro idioma")) {
            return "Solo hablo español.";
        }

        // Agregamos un prompt base para que la IA tenga una personalidad fija
        const promptBase = `Tu nombre es Kirito-Bot, fuiste creado por Deylin y solo hablas español. Te gusta ser amigable, divertido y ayudar a los demás. `;
        const consultaIA = promptBase + mensaje;

        const respuesta = await fetch(API_URL + encodeURIComponent(consultaIA));
        const data = await respuesta.json();
        
        return data.result || "Lo siento, no entendí eso.";
    } catch (error) {
        console.error("Error en la IA:", error);
        return "Hubo un error al contactar a la IA.";
    }
}

export { obtenerRespuestaIA };