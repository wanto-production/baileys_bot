import fs from "fs";
import path from "path";

// Path ke file processed.json
const processedMessagesFile = path.join(__dirname, "..", "system", "data.json");

// Fungsi untuk membaca data dari file JSON
export const getProcessedMessages = (): string[] => {
    try {
        // Cek apakah file processed.json ada
        if (!fs.existsSync(processedMessagesFile)) {
            // Jika tidak ada, buat file dengan format awal
            fs.writeFileSync(processedMessagesFile, JSON.stringify({ chats: [] }, null, 2));
            return [];
        }

        // Baca file JSON
        const data = fs.readFileSync(processedMessagesFile, "utf8");
        const json = JSON.parse(data);

        // Pastikan properti chats adalah array
        if (!Array.isArray(json.chats)) {
            throw new Error("Format file processed.json tidak valid");
        }

        return json.chats;
    } catch (error) {
        console.error("Gagal membaca file processed.json:", error);
        return [];
    }
};

// Fungsi untuk menambahkan ID pesan ke chats
export const addProcessedMessage = (messageId: string): void => {
    try {
        // Ambil data JSON saat ini
        const data = fs.existsSync(processedMessagesFile)
            ? JSON.parse(fs.readFileSync(processedMessagesFile, "utf8"))
            : { chats: [] };

        // Pastikan chats ada dan berupa array
        if (!Array.isArray(data.chats)) {
            data.chats = [];
        }

        // Cek apakah ID sudah ada
        if (data.chats.includes(messageId)) {
            return;
        }

        // Tambahkan ID baru ke chats
        data.chats.push(messageId);

        // Simpan data kembali ke file tanpa mengubah properti lainnya
        fs.writeFileSync(processedMessagesFile, JSON.stringify(data, null, 2), "utf8");

    } catch (error) {
        console.error("Gagal menambahkan ID pesan ke file processed.json:", error);
    }
};


