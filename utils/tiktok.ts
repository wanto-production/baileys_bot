import axios from "axios";

export async function downloadVideo(url: string): Promise<Buffer> {
    const response = await axios.get(url, {
        responseType: 'arraybuffer' // Agar hasilnya dalam bentuk Buffer
    });

    return Buffer.from(response.data, 'binary');
}
