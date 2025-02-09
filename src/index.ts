import { routeRules } from '@/routes'
import makeWASocket, { useMultiFileAuthState, DisconnectReason } from '@whiskeysockets/baileys';
import { addProcessedMessage, getProcessedMessages } from '@utils/processing';

import pino from 'pino';
import { antilinkMiddleware } from '@utils/middleware';

async function connectToWhatsApp() {
    const { state, saveCreds } = await useMultiFileAuthState('auth_info_baileys');

    const sock = makeWASocket({
        auth: state,
        printQRInTerminal: true,
        logger: pino({ level: "error" })
    });

    sock.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect } = update
        if (connection === 'close') {
            const shouldReconnect = (lastDisconnect?.error as any)?.output?.statusCode !== DisconnectReason.loggedOut
            console.log('connection closed due to ', lastDisconnect?.error, ', reconnecting ', shouldReconnect)
            // reconnect if not logged out
            if (shouldReconnect) {
                connectToWhatsApp()
            }
        } else if (connection === 'open') {
            console.log('opened connection')
        }
    })


    sock.ev.on('messages.upsert', async (messageUpdate) => {
        for (const m of messageUpdate.messages) {
            await antilinkMiddleware(m, sock)

            const command = m.message?.conversation
                ? m.message.conversation.split(" ")[0] as string
                : m.message?.extendedTextMessage?.text?.split(" ")[0] as string

            if (command && routeRules[command]) {
                const { key } = m
                const { id } = key; // ID pesan unik

                try {
                    // Cek apakah pesan sudah diproses
                    const processedMessages = getProcessedMessages();
                    if (processedMessages.includes(id as string)) {
                        console.log(`Pesan dengan ID ${id} sudah diproses.`);
                        continue; // Abaikan pesan jika sudah diproses
                    }

                    // Simpan ID pesan ke file JSON
                    addProcessedMessage(id as string);

                    // Jalankan fungsi yang sesuai dengan perintah
                    await routeRules[command](messageUpdate, sock);
                } catch (error) {
                    console.error(`Terjadi kesalahan saat memproses pesan ID ${id}:`, error);
                }
            } else if (!routeRules[command] && command?.startsWith("!")) {
                // Perintah tidak dikenal
                console.log(`Perintah "${command}" tidak dikenal.`);
                return await sock.sendMessage(m.key.remoteJid as string, {
                    text: `error: command \`${command}\` tidak di kenal`,
                }, { quoted: m }); // Membalas pesan pengirim
            }
        }
    });

    sock.ev.on("creds.update", saveCreds)
}
// run in main file
connectToWhatsApp()
