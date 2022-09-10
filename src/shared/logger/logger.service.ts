import { Logger, LoggerService } from '@nestjs/common';
import { DatetimeService } from '../helpers/datetime.service';
const fs = require('fs');
const logDir = 'logs';

export class MyLogger implements LoggerService {
  private dt = new DatetimeService;
  /**
   * Write a 'log' level log.
   */
  log(message: any, ...optionalParams: any[]) {
    if (!fs.existsSync(`${logDir}/log`)) {
      fs.mkdirSync(`${logDir}/log`);
    }

    fs.appendFile(`${logDir}/log/${this.dt.dateFormat("YYYY-MM-DD")}.log`, `[${this.dt.dateFormat("DD/MM/YYYY H:i:s")}] [${optionalParams[0]}: ${message}]\n`, function (err) {
      if (err) throw err;
    });
  }

  /**
   * Write an 'error' level log.
   */
  error(message: any, ...optionalParams: any[]) {
    if (!fs.existsSync(`${logDir}/error`)) {
      fs.mkdirSync(`${logDir}/error`);
    }

    fs.appendFile(`${logDir}/error/${this.dt.dateFormat("YYYY-MM-DD")}.log`, `[${this.dt.dateFormat("DD/MM/YYYY H:i:s")}] [${optionalParams[0]}: ${message}]\n`, function (err) {
      if (err) throw err;
    });
  }

  /**
   * Write a 'warn' level log.
   */
  warn(message: any, ...optionalParams: any[]) {
    if (!fs.existsSync(`${logDir}/warn`)) {
      fs.mkdirSync(`${logDir}/warn`);
    }

    fs.appendFile(`${logDir}/warn/${this.dt.dateFormat("YYYY-MM-DD")}.log`, `[${this.dt.dateFormat("DD/MM/YYYY H:i:s")}] [${optionalParams[0]}: ${message}]\n`, function (err) {
      if (err) throw err;
    });
  }

  /**
   * Write a 'debug' level log.
   */
  debug?(message: any, ...optionalParams: any[]) {
    if (!fs.existsSync(`${logDir}/debug`)) {
      fs.mkdirSync(`${logDir}/debug`);
    }

    fs.appendFile(`${logDir}/debug/${this.dt.dateFormat("YYYY-MM-DD")}.log`, `[${this.dt.dateFormat("DD/MM/YYYY H:i:s")}] [${optionalParams[0]}: ${message}]\n`, function (err) {
      if (err) throw err;
    });
  }

  /**
   * Write a 'verbose' level log.
   */
  verbose?(message: any, ...optionalParams: any[]) {
    if (!fs.existsSync(`${logDir}/verbose`)) {
      fs.mkdirSync(`${logDir}/verbose`);
    }

    fs.appendFile(`${logDir}/verbose/${this.dt.dateFormat("YYYY-MM-DD")}.log`, `[${this.dt.dateFormat("DD/MM/YYYY H:i:s")}] [${optionalParams[0]}: ${message}]\n`, function (err) {
      if (err) throw err;
    });
  }
}