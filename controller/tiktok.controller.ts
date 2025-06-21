import { BaileysEventMap, WASocket } from '@whiskeysockets/baileys'
import { downloadVideo } from '@utils/tiktok'
import { getBody } from '@utils/getbody'

import axios from 'axios'
import { readJson } from '@utils/files'
import { reply } from '@utils/reply'

export class tiktokController {
  static async main(c: BaileysEventMap['messages.upsert'], sock: WASocket) {
    const url =
      'https://tiktok-download-without-watermark.p.rapidapi.com/analysis'

    for (const m of c.messages) {
      const status = await readJson('status.json')
      if (status.antilink) {
        return await reply(m, sock, '⚠️ silahkan matikan antilink dulu')
      }
      const body = getBody(m)

      if (!body) {
        return await reply(m, sock, '⚠️ link tidak boleh kosong!')
      }

      await sock.sendMessage(m.key.remoteJid as string, {
        react: {
          text: '🕛',
          key: m.key,
        },
      })

      const res = await axios.get(url, {
        params: {
          url: body,
        },
        headers: {
          'x-rapidapi-host': 'tiktok-download-without-watermark.p.rapidapi.com',
          'x-rapidapi-key':
            'f2b7c2c7b0msh665b784ea72a3d9p10c62fjsneed998c5e205',
        },
      })

      const result: any = await res.data

      if (!result.data.play)
        return await sock.sendMessage(
          m.key.remoteJid as string,
          {
            text: 'maaf gagal mendownload vt🙏',
            mentions: [m.key.participant!], // Mentions pengirim
          },
          { quoted: m },
        ) // Membalas pesan pengirim

      const videoBuffer = await downloadVideo(result.data.play)

      await sock.sendMessage(m.key.remoteJid as string, {
        video: videoBuffer,
        caption: 'downloaded✅',
      })
    }
  }
}
