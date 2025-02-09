import fs from 'fs';
import path from 'path';

/**
 * Mendapatkan path lengkap dari file JSON.
 * @param {string} filename - Nama file JSON.
 * @returns {string} - Path lengkap file JSON.
 */
const getFilePath = (filename: string): string => path.join(__dirname, '..', 'system', filename);

/**
 * Membaca file JSON secara asinkron.
 * @param {string} filename - Nama file JSON.
 * @returns {Promise<any>} - Data JSON yang telah dibaca.
 */
export const readJson = async (filename: string): Promise<any> => {
    try {
        const fullPath = getFilePath(filename);
        if (!fs.existsSync(fullPath)) return {}; // Jika file tidak ada, kembalikan objek kosong
        const data = await fs.promises.readFile(fullPath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error(`Gagal membaca file ${filename}:`, error);
        return null;
    }
};

/**
 * Mengedit file JSON dengan data baru.
 * @param {string} filename - Nama file JSON.
 * @param {object} newData - Data yang akan disimpan.
 * @returns {Promise<boolean>} - Status sukses atau gagal.
 */
export const writeJson = async (filename: string, newData: object): Promise<boolean> => {
    try {
        const fullPath = getFilePath(filename);
        await fs.promises.writeFile(fullPath, JSON.stringify(newData, null, 2), 'utf-8');
        return true;
    } catch (error) {
        console.error(`Gagal menulis file ${filename}:`, error);
        return false;
    }
};

/**
 * Mengupdate properti tertentu dalam file JSON.
 * @param {string} filename - Nama file JSON.
 * @param {string} key - Kunci yang akan diperbarui.
 * @param {any} value - Nilai baru.
 * @returns {Promise<boolean>} - Status sukses atau gagal.
 */
export const updateJson = async (filename: string, key: string, value: any): Promise<boolean> => {
    try {
        const data = await readJson(filename);
        if (data === null) return false;

        data[key] = value; // Update data
        return await writeJson(filename, data);
    } catch (error) {
        console.error(`Gagal mengupdate file ${filename}:`, error);
        return false;
    }
};

