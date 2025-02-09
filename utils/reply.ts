import { WASocket } from "@whiskeysockets/baileys";

export async function reply(m: any, sock: WASocket, message: string) {
    return await sock.sendMessage(m.key.remoteJid as string, {
        text: message,
        mentions: [m.key.participant!], // Mentions pengirim
    }, { quoted: m }); // Membalas pesan pengirim
}
