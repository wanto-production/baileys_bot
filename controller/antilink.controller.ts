import { BaileysEventMap, WASocket } from '@whiskeysockets/baileys';
import { getBody } from '@utils/getbody';
import { readJson, writeJson } from '@utils/files';
import { reply } from '@utils/reply';

export class antilinkController {
    static async main(event: BaileysEventMap["messages.upsert"], sock: WASocket) {
        let data: { antilink: boolean; chats?: string[] } = { antilink: false };
        try {
            // Baca file JSON
            const fileData = await readJson("status.json");
            if (fileData) data = fileData;

            let changed = false;

            for (const m of event.messages) {
                const body = getBody(m)?.toLowerCase();

                if (!m.key.remoteJid) continue;

                if (!data.antilink && body === "on") {
                    data.antilink = true;
                    changed = true;
                    await reply(m, sock, "🔗 Antilink *diaktifkan*")

                } else if (data.antilink && body === "off") {
                    data.antilink = false;
                    changed = true;
                    await reply(m, sock, "🔗 Antilink *dinonaktifkan*")
                }
            }

            // Simpan kembali jika ada perubahan
            if (changed) await writeJson("status.json", data);

        } catch (error) {
            console.error(`❌ Terjadi kesalahan: ${error}`);
        }
    }
}

