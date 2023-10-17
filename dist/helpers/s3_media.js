"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSanitizedFileName = exports.getFileName = exports.getFileUrl = exports.saveFileBuffer = exports.saveFile = void 0;
const logger_1 = __importDefault(require("../logger"));
const path_1 = __importDefault(require("path"));
const client_s3_1 = require("@aws-sdk/client-s3");
const s3_config_1 = require("../Loaders/s3_config");
const nodeUtil = __importStar(require("util"));
const config_1 = require("../Loaders/config");
const uuid_1 = require("uuid");
const TAG = 'helpers.s3_media';
// export async function saveFile(file: any, folderName: string, bucketName: string): Promise<any> {
//     log.info(`${TAG}.saveFile()`)
//     try {
//       if(file == null){
//         throw new Error("File is empty")
//       }
//       const originalname = file[0].originalname;
//       const videoPath = path.join(folderName, originalname);
//       console.log('Original Name:', videoPath);
//       const fileName = getSanitizedFileName(file?.originalname)
//       return await saveFileBuffer(file?.buffer, folderName + '/' + fileName, bucketName, fileName,originalname)
//     } catch (e) {
//       log.error(`ERROR occurred in ${TAG}.saveFile()`, e)
//       throw e
//     }
//   }
function saveFile(file, folderName, bucketName) {
    return __awaiter(this, void 0, void 0, function* () {
        logger_1.default.info(`${TAG}.saveFile()`);
        console.log(file);
        try {
            const savedFilesData = [];
            const fileList = Array.isArray(file) ? file : [file];
            for (const individualFile of fileList) {
                if (individualFile == null) {
                    console.error('File is empty or null');
                    continue;
                }
                const originalname = individualFile.originalname;
                const uniqueIdentifier = (0, uuid_1.v4)(); // Generate a unique identifier for each file
                const filePath = path_1.default.join(folderName, uniqueIdentifier + '-' + originalname);
                console.log('Original Name:', filePath);
                const fileName = getSanitizedFileName(originalname);
                const savedFileData = yield saveFileBuffer(individualFile.buffer, filePath, bucketName, fileName, originalname);
                savedFilesData.push(savedFileData);
            }
            return savedFilesData;
        }
        catch (e) {
            logger_1.default.error(`ERROR occurred in ${TAG}.saveFile()`, e);
            throw e;
        }
    });
}
exports.saveFile = saveFile;
function saveFileBuffer(fileBuffer, filePath, bucketName, fileName, videoPath) {
    return __awaiter(this, void 0, void 0, function* () {
        logger_1.default.info(`${TAG}.saveFileBuffer()`);
        try {
            const params = {
                Bucket: bucketName,
                Key: filePath,
                Body: fileBuffer
            };
            const command = new client_s3_1.PutObjectCommand(params);
            const s3Connection = (0, s3_config_1.s3ConnectionLoader)();
            const data = yield s3Connection.send(command);
            logger_1.default.debug(`${TAG}.saveFileBuffer() s3 upload response::` + nodeUtil.inspect(data));
            data.savedFileKey = filePath;
            data.savedFileName = fileName;
            data.savedLocation = getFileUrl(filePath, bucketName);
            // const duration = await getVideoDurations( data.savedFileKey);
            //   console.log("****************************************")
            //   console.log(duration)
            return data;
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.saveFileBuffer()`, error);
            throw error;
        }
    });
}
exports.saveFileBuffer = saveFileBuffer;
function getFileUrl(fileKey, bucket) {
    return `https://${bucket}.s3.${config_1.AWS_S3.REGION}.amazonaws.com/${fileKey}`;
}
exports.getFileUrl = getFileUrl;
function getFileName(filePath) {
    return path_1.default.basename(filePath);
}
exports.getFileName = getFileName;
function getSanitizedFileName(fileName) {
    fileName = fileName === null || fileName === void 0 ? void 0 : fileName.replace(/ /g, '_');
    return Math.floor(Date.now()) + '-' + (fileName || '');
}
exports.getSanitizedFileName = getSanitizedFileName;
