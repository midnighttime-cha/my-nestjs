import { Logger } from "@nestjs/common";
import { ConvertService } from "./convert.service";
const pjson = require('../../../package.json');

export class HelperService extends ConvertService {
  constructor() {
    super();
  }
}