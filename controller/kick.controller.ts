import { getNumber } from '@utils/getbody'
import { BaileysEventMap, WASocket } from '@whiskeysockets/baileys'
import {
  groupMiddleware,
  participantsUpdateMiddleware,
} from '@utils/middleware'

export class kickController {
  static async main(event: BaileysEventMap['messages.upsert'], sock: WASocket) {
    for (const m of event.messages) {
      await groupMiddleware('kick', m, sock)

      const body = getNumber(m)

      await participantsUpdateMiddleware(m, sock, '!kick')

      const participatsJid = `${body}@s.whatsapp.net`

      await sock.groupParticipantsUpdate(
        m.key.remoteJid as string,
        [participatsJid],
        'remove',
      )
    }
  }
}
