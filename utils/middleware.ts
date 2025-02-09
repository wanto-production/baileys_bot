import { WASocket } from "@whiskeysockets/baileys";
import { readJson } from "./files";
import { getAllbody, getAlltext } from "./getbody";


export async function groupMiddleware(m: any, sock: WASocket) {
    if (!m.key.remoteJid?.endsWith("g.us")) {
        return await sock.sendMessage(m.key.remoteJid as string, {
            text: "`!tagall` tidak berfungsi jika tidak di grup",
            mentions: [m.key.participant!], // Mentions pengirim
        }, { quoted: m }); // Membalas pesan pengirim
    };
}

export async function antilinkMiddleware(m: any, sock: WASocket) {
    const status = await readJson("status.json")

    const body = getAlltext(m) as string

    if (status.antilink && /(http|https)/g.test(body)) return await sock.sendMessage(m.key.remoteJid as string, {
        delete: m.key
    })

}

export async function participantsUpdateMiddleware(m: any, sock: WASocket, command: string) {
    const body = getAllbody(m)

    if (!body) {
        return await sock.sendMessage(m.key.remoteJid as string, {
            text: `anda harus menyertakan no hp!, contoh:\n\n \`${command} +62xxxxxxxxxxxx\``,
            mentions: [m.key.participant!], // Mentions pengirim
        }, { quoted: m }); // Membalas pesan pengirim
    }

}
