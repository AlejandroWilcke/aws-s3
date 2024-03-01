import { UserFileService, CreateSharedDTO, DeleteSharedDTO } from "../services/user-file.service";

export default class UserFileController {

  userFileService: UserFileService;

  constructor() {
    this.userFileService = new UserFileService();
  }

  createShared(createSharedDTO: CreateSharedDTO): Promise<any> {
    return this.userFileService.createShared(createSharedDTO);
  }

  deleteShared(deleteSharedDTO: DeleteSharedDTO): Promise<any> {
    return this.userFileService.deleteShared(deleteSharedDTO);
  }
}