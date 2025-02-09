import { getNumber } from '@utils/getbody';
import { groupMiddleware } from '@utils/middleware';
import { reply } from '@utils/reply';
import { BaileysEventMap, WASocket } from '@whiskeysockets/baileys';

export class demoteController {
    static async main(event: BaileysEventMap["messages.upsert"], sock: WASocket) {
        for (const m of event.messages) {
            await groupMiddleware(m, sock)

            const body = getNumber(m)

            const phoneNumber = `${body}@s.whatsapp.net`

            await sock.groupParticipantsUpdate(m.key.remoteJid as string, [phoneNumber], "demote")
            await reply(m, sock, `berhasil demote ${body}✅`)
        }
    }
}

