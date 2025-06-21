import { getNumber } from '@utils/getbody'
import {
  groupMiddleware,
  participantsUpdateMiddleware,
} from '@utils/middleware'
import { BaileysEventMap, WASocket } from '@whiskeysockets/baileys'

export class addController {
  static async main(event: BaileysEventMap['messages.upsert'], sock: WASocket) {
    for (const m of event.messages) {
      await groupMiddleware('add', m, sock)

      const body = getNumber(m)

      await participantsUpdateMiddleware(m, sock, '!add')

      const phoneNumber = `${body}@s.whatsapp.net`

      await sock.groupParticipantsUpdate(
        m.key.remoteJid as string,
        [phoneNumber],
        'add',
      )
    }
  }
}
