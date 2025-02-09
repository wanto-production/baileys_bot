import exp from "node:constants";

export function getBody(m: any): string | undefined {
    if (!m.message) return undefined; // Jika tidak ada pesan, kembalikan undefined

    let text: string | undefined;

    if (m.message.conversation) {
        text = m.message.conversation;
    } else if (m.message.extendedTextMessage?.text) {
        text = m.message.extendedTextMessage.text;
    } else if (m.message.imageMessage?.caption) {
        text = m.message.imageMessage.caption; // Jika pesan berupa gambar dengan caption
    } else if (m.message.videoMessage?.caption) {
        text = m.message.videoMessage.caption; // Jika pesan berupa video dengan caption
    } else if (m.message.buttonsResponseMessage?.selectedButtonId) {
        text = m.message.buttonsResponseMessage.selectedButtonId; // Jika pesan dari tombol interaktif
    } else if (m.message.listResponseMessage?.singleSelectReply?.selectedRowId) {
        text = m.message.listResponseMessage.singleSelectReply.selectedRowId; // Jika pesan dari list menu
    }

    return text?.split(" ")[1]; // Ambil kata kedua dari pesan
}

export function getAllbody(m: any): string | undefined {
    if (!m.message) return undefined; // Jika tidak ada pesan, kembalikan undefined

    let text: string | undefined;

    if (m.message.conversation) {
        text = m.message.conversation;
    } else if (m.message.extendedTextMessage?.text) {
        text = m.message.extendedTextMessage.text;
    } else if (m.message.imageMessage?.caption) {
        text = m.message.imageMessage.caption; // Jika pesan berupa gambar dengan caption
    } else if (m.message.videoMessage?.caption) {
        text = m.message.videoMessage.caption; // Jika pesan berupa video dengan caption
    } else if (m.message.buttonsResponseMessage?.selectedButtonId) {
        text = m.message.buttonsResponseMessage.selectedButtonId; // Jika pesan dari tombol interaktif
    } else if (m.message.listResponseMessage?.singleSelectReply?.selectedRowId) {
        text = m.message.listResponseMessage.singleSelectReply.selectedRowId; // Jika pesan dari list menu
    }

    return text?.split(" ").slice(1).join(' ');
}

export function getAlltext(m: any): string | undefined {
    if (!m.message) return undefined; // Jika tidak ada pesan, kembalikan undefined

    let text: string | undefined;

    if (m.message.conversation) {
        text = m.message.conversation;
    } else if (m.message.extendedTextMessage?.text) {
        text = m.message.extendedTextMessage.text;
    } else if (m.message.imageMessage?.caption) {
        text = m.message.imageMessage.caption; // Jika pesan berupa gambar dengan caption
    } else if (m.message.videoMessage?.caption) {
        text = m.message.videoMessage.caption; // Jika pesan berupa video dengan caption
    } else if (m.message.buttonsResponseMessage?.selectedButtonId) {
        text = m.message.buttonsResponseMessage.selectedButtonId; // Jika pesan dari tombol interaktif
    } else if (m.message.listResponseMessage?.singleSelectReply?.selectedRowId) {
        text = m.message.listResponseMessage.singleSelectReply.selectedRowId; // Jika pesan dari list menu
    }

    return text;
}

export const getNumber = (m: any) => getAllbody(m)?.replace(/\D/g, "") // Hapus semua non-digit
    .replace(/^0/, "62") // Ubah awalan 0 menjadi 62
    .replace(/^\+62/, "62");

