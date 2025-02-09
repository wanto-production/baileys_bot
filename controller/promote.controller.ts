import { getNumber } from '@utils/getbody';
import { groupMiddleware } from '@utils/middleware';
import { BaileysEventMap, WASocket } from '@whiskeysockets/baileys';
import { reply } from '@utils/reply';

export class promoteController {
    static async main(event: BaileysEventMap["messages.upsert"], sock: WASocket) {
        for (const m of event.messages) {
            await groupMiddleware(m, sock)

            const body = getNumber(m)

            const phoneNumber = `${body}@s.whatsapp.net`

            await sock.groupParticipantsUpdate(m.key.remoteJid as string, [phoneNumber], "promote")
            await reply(m, sock, `berhasil promote ${body}✅`)
        }
    }
}

