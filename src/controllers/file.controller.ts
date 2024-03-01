import File from "../db/models/file.model";
import { FileService, FilesDTO, CreateFileDTO, DeleteFileDTO, DownloadFileDTO } from "../services/file.service";

export default class FileController {

  fileService: FileService;

  constructor() {
    this.fileService = new FileService();
  }

  getAllFiles(userId: number): Promise<FilesDTO> {
    return this.fileService.getAllFiles(userId);
  }

  createFile(createFileDto: CreateFileDTO): Promise<File> {
    return this.fileService.createFile(createFileDto);
  }

  deleteFile(deleteFileDto: DeleteFileDTO): Promise<Boolean> {
    return this.fileService.deleteFile(deleteFileDto);
  }

  downloadFile(downloadFileDto: DownloadFileDTO): Promise<File> {
    return this.fileService.downloadFile(downloadFileDto);
  }
}