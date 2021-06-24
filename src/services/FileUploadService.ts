import axios, {AxiosPromise} from 'axios';
import {FileInfo} from "@/models/FileInfo.ts";

export class FileStorageService {

    public static removeFileFromUrl(url: string) {
        return axios.delete(url);
    }

    public static getFilesFromUrl(url: string): AxiosPromise<FileInfo[]> {
        return axios.get<FileInfo[]>(url);
    }

    public static fileUploadToUrl(url: string, fileForUpload: string | Blob) {
        const formData = new FormData();
        formData.append("file", fileForUpload);
        return axios.post(url, formData)
    }

    public static importDataInfoToUrl(url: string, fileName: string, importerName: string) {
        const formData = new FormData();
        formData.append("file", fileName);
        formData.append("importerName", importerName);
        return axios.post(url, formData)
    }
}
