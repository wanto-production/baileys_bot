import { groupMiddleware } from '@utils/middleware'
import { BaileysEventMap, WASocket } from '@whiskeysockets/baileys'

export class tagallController {
  static async main(event: BaileysEventMap['messages.upsert'], sock: WASocket) {
    for (const m of event.messages) {
      await groupMiddleware('tagall', m, sock)
      try {
        // Ambil metadata grup
        const { participants } = await sock.groupMetadata(
          m.key.remoteJid as string,
        )
        const body = m.message?.conversation?.split(' ').slice(1).join(' ')

        if (!body) {
          await sock.sendMessage(
            m.key.remoteJid as string,
            {
              text: 'Pesan tidak boleh kosong! Gunakan format: `!tagall <pesan>`',
              mentions: [m.key.participant!], // Mentions pengirim
            },
            { quoted: m },
          ) // Membalas pesan pengirim
          continue // Lewati iterasi jika body kosong
        }

        // Buat array ID peserta
        const mentions = participants.map(({ id }) => id)

        // Kirim pesan dengan mention
        await sock.sendMessage(m.key.remoteJid as string, {
          text: `${body} \n\n${participants.map(({ id }) => `@${id.split('@')[0]}`).join(' ')}`,
          mentions: mentions, // Tambahkan mentions di sini
        })

        console.log('Berhasil mengirim tag ke semua anggota grup!')
      } catch (error) {
        console.error('Gagal mengirim tag ke semua anggota grup:', error)
      }
    }
  }
}
