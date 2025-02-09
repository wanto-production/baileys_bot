import { BaileysEventMap, WASocket } from '@whiskeysockets/baileys';

export class {{ name }}Controller {
    static async main(event: BaileysEventMap["messages.upsert"], sock: WASocket) {
        for (const m of event.messages) {

        }
    }
}

