import axios from 'axios';

export class CrudService {
    private static descCache: Record<string, Record<number, string>> = {};
    private static root = '/api/admin/';

    public static clearDescCache(): void {
        this.descCache = {};
    }

    public static async getAll<T>(base: string): Promise<T[]> {
        return (await axios.get(`${this.root}${base}/`)).data;
    }

    public static async getDesc(base: string): Promise<Record<number, string>> {
        if (base in this.descCache) {
            return this.descCache[base];
        }
        return this.descCache[base] = (await axios.get(`${this.root}${base}/desc`)).data;
    }

    public static async getDescById(base: string, id: number): Promise<string> {
        return (await this.getDesc(base))[id];
    }

    public static async getById<T>(base: string, id: number): Promise<T> {
        return (await axios.get(`${this.root}${base}/${id}`)).data;
    }

    public static async save<T>(base: string, data: T): Promise<T> {
        return (await axios.post(`${this.root}${base}/`, data)).data;
    }

    public static async deleteById<T>(base: string, id: number): Promise<void> {
        await axios.delete(`${this.root}${base}/${id}`);
    }

}
