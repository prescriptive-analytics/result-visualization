import * as PapaParse from 'papaparse';
import {ParseResult, ParseError} from "papaparse";

export interface FileInfo {
  name: string;
  size: number;
  type: string;
}

export interface Result {
  info?: FileInfo;
  rows: any[];
}

class CsvLoader {
  public Load(file: File | string, encoding: string = 'UTF-8'): Promise<Result> {
    if (typeof file === "string") {
      return this.LoadFromFile(file, encoding);
    }
    return new Promise<Result>((resolve, reject) => {
      const fileInfo: FileInfo = {
        name: file.name,
        size: file.size,
        type: file.type,
      }

      const parserOptions = {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        encoding: encoding,
        complete: (result: ParseResult) => {
          resolve({
            info: fileInfo,
            rows: result.data
          });
        },
        error: (err: ParseError) => {
          reject(err);
        }
      }
      PapaParse.parse(file, parserOptions);
    });
  }

  public LoadFromFile(file: string, encoding: string = 'UTF-8'): Promise<Result> {
    return new Promise<Result>((resolve, reject) => {
      fetch(file)
          .then((res) => {
            return res.text();
          })
          .then((text) => {
            const parserOptions = {
              header: true,
              dynamicTyping: true,
              skipEmptyLines: true,
              encoding: encoding,
              complete: (result: ParseResult) => {
                resolve({
                  rows: result.data
                });
              },
              error: (err: ParseError) => {
                reject(err);
              }
            }
            PapaParse.parse(text, parserOptions);
          })
          .catch((err) => {
            reject(err);
          });
    });
  }
}

export default CsvLoader;