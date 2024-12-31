process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '1';
import './config.js';
import { createRequire } from 'module';
import path, { join } from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import { platform } from 'process';
import * as ws from 'ws';
import { readdirSync, statSync, unlinkSync, existsSync, readFileSync, rmSync, watch } from 'fs';
import yargs from 'yargs';
import { spawn } from 'child_process';
import lodash from 'lodash';
import chalk from 'chalk';
import syntaxerror from 'syntax-error';
import { tmpdir } from 'os';
import { format } from 'util';
import boxen from 'boxen';
import P from 'pino';
import pino from 'pino';
import Pino from 'pino';
import { Boom } from '@hapi/boom';
import { makeWASocket, protoType, serialize } from './lib/simple.js';
import { Low, JSONFile } from 'lowdb';
import { mongoDB, mongoDBV2 } from './lib/mongoDB.js';
import store from './lib/store.js';
import readline from 'readline';
import NodeCache from 'node-cache';

const { proto } = (await import('@whiskeysockets/baileys')).default;
const { DisconnectReason, useMultiFileAuthState, MessageRetryMap, fetchLatestBaileysVersion, makeCacheableSignalKeyStore, jidNormalizedUser, PHONENUMBER_MCC } = await import('@whiskeysockets/baileys');

const { CONNECTING } = ws;
const { chain } = lodash;
const PORT = process.env.PORT || process.env.SERVER_PORT || 3000;

protoType();
serialize();

global.__filename = function filename(pathURL = import.meta.url, rmPrefix = platform !== 'win32') {
    return rmPrefix ? /file:\/\/\//.test(pathURL) ? fileURLToPath(pathURL) : pathURL : pathToFileURL(pathURL).toString();
};
global.__dirname = function dirname(pathURL) {
    return path.dirname(global.__filename(pathURL, true));
};
global.__require = function require(dir = import.meta.url) {
    return createRequire(dir);
};

global.API = (name, path = '/', query = {}, apikeyqueryname) => (name in global.APIs ? global.APIs[name] : name) + path + (query || apikeyqueryname ? '?' + new URLSearchParams(Object.entries({ ...query, ...(apikeyqueryname ? { [apikeyqueryname]: global.APIKeys[name in global.APIs ? global.APIs[name] : name] } : {}) })) : '');

global.timestamp = { start: new Date() };

const __dirname = global.__dirname(import.meta.url);

global.opts = new Object(yargs(process.argv.slice(2)).exitProcess(false).parse());
global.prefix = new RegExp('^[/.$#!]');
// global.opts['db'] = process.env['db'];

global.db = new Low(/https?:\/\//.test(opts['db'] || '') ? new cloudDBAdapter(opts['db']) : new JSONFile('src/database/database.json'));

global.DATABASE = global.db;
global.loadDatabase = async function loadDatabase() {
    if (global.db.READ) {
        return new Promise((resolve) => setInterval(async function () {
            if (!global.db.READ) {
                clearInterval(this);
                resolve(global.db.data == null ? global.loadDatabase() : global.db.data);
            }
        }, 1 * 1000));
    }
    if (global.db.data !== null) return;
    global.db.READ = true;
    await global.db.read().catch(console.error);
    global.db.READ = null;
    global.db.data = {
        users: {},
        chats: {},
        stats: {},
        msgs: {},
        sticker: {},
        settings: {},
        ...(global.db.data || {}),
    };
    global.db.chain = chain(global.db.data);
};

async function initialize() {
    try {
        await global.loadDatabase();

        const { state, saveState, saveCreds } = await useMultiFileAuthState(global.sessions);
        const msgRetryCounterMap = (MessageRetryMap) => { };
        const msgRetryCounterCache = new NodeCache();
        const { version } = await fetchLatestBaileysVersion();
        let phoneNumber = global.botNumberCode;

        const methodCodeQR = process.argv.includes("qr");
        const methodCode = !!phoneNumber || process.argv.includes("code");
        const MethodMobile = process.argv.includes("mobile");
        const colores = chalk.bgMagenta.white;
        const opcionQR = chalk.bold.green;
        const opcionTexto = chalk.bold.cyan;
        const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
        const question = (texto) => new Promise((resolver) => rl.question(texto, resolver));

        let opcion;
        if (methodCodeQR) {
            opcion = '1';
        }
        if (!methodCodeQR && !methodCode && !fs.existsSync(`./${sessions}/creds.json`)) {
            do {
                opcion = await question(colores('Seleccione una opción:\n') + opcionQR('1. Con código QR\n') + opcionTexto('2. Con código de texto de 8 dígitos\n--> '));

                if (!/^[1-2]$/.test(opcion)) {
                    console.log(chalk.bold.redBright(`🌸 No se permiten numeros que no sean 1 o 2, tampoco letras o símbolos especiales.`));
                }
            } while (opcion !== '1' && opcion !== '2' || fs.existsSync(`./${sessions}/creds.json`));
        }

        const filterStrings = [
            "Q2xvc2luZyBzdGFsZSBvcGVu", // "Closing stable open"
            "Q2xvc2luZyBvcGVuIHNlc3Npb24=", // "Closing open session"
            "RmFpbGVkIHRvIGRlY3J5cHQ=", // "Failed to decrypt"
            "U2Vzc2lvbiBlcnJvcg==", // "Session error"
            "RXJyb3I6IEJhZCBNQUM=", // "Error: Bad MAC"
            "RGVjcnlwdGVkIG1lc3NhZ2U=" // "Decrypted message"
        ];

        console.info = () => { };
        console.debug = () => { };
        ['log', 'warn', 'error'].forEach(methodName => redefineConsoleMethod(methodName, filterStrings));

        const connectionOptions = {
            logger: pino({ level: 'silent' }),
            printQRInTerminal: opcion == '1' ? true : methodCodeQR ? true : false,
            mobile: MethodMobile,
            browser: opcion == '1' ? [`${nameqr}`, 'Edge', '20.0.04'] : methodCodeQR ? [`${nameqr}`, 'Edge', '20.0.04'] : ['Ubuntu', 'Edge', '110.0.1587.56'],
            auth: {
                creds: state.creds,
                keys: makeCacheableSignalKeyStore(state.keys, Pino({ level: "fatal" }).child({ level: "fatal" })),
            },
            markOnlineOnConnect: true,
            generateHighQualityLinkPreview: true,
            getMessage: async (clave) => {
                let jid = jidNormalizedUser(clave.remoteJid);
                let msg = await store.loadMessage(jid, clave.id);
                return msg?.message || "";
            },
            msgRetryCounterCache, // Resolver mensajes en espera
            msgRetryCounterMap, // Determinar si se debe volver a intentar enviar un mensaje o no
            defaultQueryTimeoutMs: undefined,
            version: [2, 3000, 1015901307],
        };

        global.conn = makeWASocket(connectionOptions);

        if (!fs.existsSync(`./${sessions}/creds.json`)) {
            if (opcion === '2' || methodCode) {

                opcion = '2';
                if (!conn.authState.creds.registered) {
                    if (MethodMobile) throw new Error('No se puede usar un código de emparejamiento con la API móvil');

                    let numeroTelefono;
                    if (!!phoneNumber) {
                        numeroTelefono = phoneNumber.replace(/[^0-9]/g, '');
                        if (!Object.keys(PHONENUMBER_MCC).some(v => numeroTelefono.startsWith(v))) {
                            console.log(chalk.bgBlack(chalk.bold.greenBright(`🌸 Por favor, Ingrese el número de WhatsApp.\n${chalk.bold.yellowBright(`🌷  Ejemplo: 57321×××××××`)}\n${chalk.bold.magentaBright('---> ')}`)));
                            process.exit(0);
                        }
                    } else {
                        while (true) {
                            numeroTelefono = await question(chalk.bgBlack(chalk.bold.greenBright(`🌸 Por favor, escriba su número de WhatsApp.\n🌷  Ejemplo: 57321×××××××\n`)));
                            numeroTelefono = numeroTelefono.replace(/[^0-9]/g, '');

                            if (numeroTelefono.match(/^\d+$/) && Object.keys(PHONENUMBER_MCC).some(v => numeroTelefono.startsWith(v))) {
                                break;
                            } else {
                                console.log(chalk.bgBlack(chalk.bold.greenBright(`🌸 Por favor, escriba su número de WhatsApp.\n🌷  Ejemplo: 57321×××××××\n`)));
                            }
                        }
                        rl.close();
                    }

                    setTimeout(async () => {
                        let codigo = await conn.requestPairingCode(numeroTelefono);
                        codigo = codigo?.match(/.{1,4}/g)?.join("-") || codigo;
                        console.log(chalk.bold.white(chalk.bgMagenta(`👑 CÓDIGO DE VINCULACIÓN 👑`)), chalk.bold.white(chalk.white(codigo)));
                    }, 3000);
                }
            }
        }

        conn.isInit = false;
        conn.well = false;
        //conn.logger.info(`🔵  H E C H O\n`);

        if (!opts['test']) {
            if (global.db) setInterval(async () => {
                if (global.db.data) await global.db.write();
                if (opts['autocleartmp'] && (global.support || {}).find) (tmp = [os.tmpdir(), 'tmp', `${jadi}`], tmp.forEach((filename) => cp.spawn('find', [filename, '-amin', '3', '-type', 'f', '-delete'])));
            }, 30 * 1000);
        }

        if (opts['server']) (await import('./server.js')).default(global.conn, PORT);

        async function connectionUpdate(update) {
            const { connection, lastDisconnect, isNewLogin } = update;
            global.stopped = connection;
            if (isNewLogin) conn.isInit = true;
            const code = lastDisconnect?.error?.output?.statusCode || lastDisconnect?.error?.output?.payload?.statusCode;
            if (code && code !== DisconnectReason.loggedOut && conn?.ws.socket == null) {
                await global.reloadHandler(true).catch(console.error);
                global.timestamp.connect = new Date();
            }
            if (global.db.data == null) loadDatabase();
            if (update.qr != 0 && update.qr != undefined || methodCodeQR) {
                if (opcion == '1' || methodCodeQR) {
                    console.log(chalk.bold.yellow(`\n✅ ESCANEA EL CÓDIGO QR EXPIRA EN 45 SEGUNDOS`));
                }
            }
            if (connection == 'open') {
                console.log(boxen(chalk.bold(' ¡CONECTADO CON WHATSAPP! '), { borderStyle: 'round', borderColor: 'green', title: chalk.green.bold('● CONEXIÓN ●'), titleAlignment: '', float: '' }));
                await joinChannels(conn);
            }
            let reason = new Boom(lastDisconnect?.error)?.output?.statusCode;
            if (connection === 'close') {
                if (reason === DisconnectReason.badSession) {
                    console.log(chalk.bold.cyanBright(`\n⚠️ SIN CONEXIÓN, BORRE LA CARPETA ${global.sessions} Y ESCANEA EL CÓDIGO QR ⚠️`));
                } else if (reason === DisconnectReason.connectionClosed) {
                    console.log(chalk.bold.magentaBright(`\n╭┄┄┄┄┄┄┄┄┄┄┄┄┄┄ • • • ┄┄┄┄┄┄┄┄┄┄┄┄┄┄ ☹\n┆ ⚠️ CONEXION CERRADA, RECONECTANDO....\n╰┄┄┄┄┄┄┄┄┄┄┄┄┄┄ • • • ┄┄┄┄┄┄┄┄┄┄┄┄┄┄ ☹`));
                    await global.reloadHandler(true).catch(console.error);
                } else if (reason === DisconnectReason.connectionLost) {
                    console.log(chalk.bold.blueBright(`\n╭┄┄┄┄┄┄┄┄┄┄┄┄┄┄ • • • ┄┄┄┄┄┄┄┄┄┄┄┄┄┄ ☂\n┆ ⚠️ CONEXIÓN PERDIDA CON EL SERVIDOR, RECONECTANDO....\n╰┄┄┄┄┄┄┄┄┄┄┄┄┄┄ • • • ┄┄┄┄┄┄┄┄┄┄┄┄┄┄ ☂`));
                    await global.reloadHandler(true).catch(console.error);
                } else if (reason === DisconnectReason.connectionReplaced) {
                    console.log(chalk.bold.yellowBright(`\n╭┄┄┄┄┄┄┄┄┄┄┄┄┄┄ • • • ┄┄┄┄┄┄┄┄┄┄┄┄┄┄ ✗\n┆ ⚠️ CONEXIÓN REEMPLAZADA, SE HA ABIERTO OTRA NUEVA SESION, POR FAVOR, CIERRA LA SESIÓN ACTUAL PRIMERO.\n╰┄┄┄┄┄┄┄┄┄┄┄┄┄┄ • • • ┄┄┄┄┄┄┄┄┄┄┄┄┄┄ ✗`));
                } else if (reason === DisconnectReason.loggedOut) {
                    console.log(chalk.bold.redBright(`\n⚠️ SIN CONEXIÓN, BORRE LA CARPETA ${global.sessions} Y ESCANEA EL CÓDIGO QR ⚠️`));
                    await global.reloadHandler(true).catch(console.error);
                } else if (reason === DisconnectReason.restartRequired) {
                    console.log(chalk.bold.cyanBright(`\n╭┄┄┄┄┄┄┄┄┄┄┄┄┄┄ • • • ┄┄┄┄┄┄┄┄┄┄┄┄┄┄ ✓\n┆ 🌸 CONECTANDO AL SERVIDOR...\n╰┄┄┄┄┄┄┄┄┄┄┄┄┄┄ • • • ┄┄┄┄┄┄┄┄┄┄┄┄┄┄ ✓`));
                    await global.reloadHandler(true).catch(console.error);
                } else if (reason === DisconnectReason.timedOut) {
                    console.log(chalk.bold.yellowBright(`\n╭┄┄┄┄┄┄┄┄┄┄┄┄┄┄ • • • ┄┄┄┄┄┄┄┄┄┄┄┄┄┄ ▸\n┆ ⌛ TIEMPO DE CONEXIÓN AGOTADO, RECONECTANDO....\n╰┄┄┄┄┄┄┄┄┄┄┄┄┄┄ • • • ┄┄┄┄┄┄┄┄┄┄┄┄┄┄ ▸`));
                    await global.reloadHandler(true).catch(console.error); //process.send('reset')
                } else {
                    console.log(chalk.bold.redBright(`\n⚠️❗ RAZON DE DESCONEXIÓN DESCONOCIDA: ${reason || 'No encontrado'} >> ${connection || 'No encontrado'}`));
                }
            }
        }

        process.on('uncaughtException', console.error);

        let isInit = true;
        let handler = await import('./handler.js');
        global.reloadHandler = async function (restatConn) {
            try {
                const Handler = await import(`./handler.js?update=${Date.now()}`).catch(console.error);
                if (Object.keys(Handler || {}).length) handler = Handler;
            } catch (e) {
                console.error(e);
            }
            if (restatConn) {
                const oldChats = global.conn.chats;
                try {
                    global.conn.ws.close();
                } catch { }
                conn.ev.removeAllListeners();
                global.conn = makeWASocket(connectionOptions, { chats: oldChats });
                isInit = true;
            }
            if (!isInit) {
                conn.ev.off('messages.upsert', conn.handler);
                conn.ev.off('connection.update', conn.connectionUpdate);
                conn.ev.off('creds.update', conn.credsUpdate);
            }

            conn.handler = handler.handler.bind(global.conn);
            conn.connectionUpdate = connectionUpdate.bind(global.conn);
            conn.credsUpdate = saveCreds.bind(global.conn, true);

            const currentDateTime = new Date();
            const messageconst currentDateTime = new Date();
        const message = "Initialization completed"; // Example initialization