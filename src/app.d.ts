
declare global {
    type Routes = {
        [key: string]: (event: typeof import('@whiskeysockets/baileys').BaileysEventMap["messages.upsert"], socket: typeof import('@whiskeysockets/baileys').WASocket) => any
    }
}

export { }
