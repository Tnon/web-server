/*
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-08-09 21:05:31
 * @LastEditTime: 2021-08-25 10:14:42
 */
import uploadFile from './index.vue';
export interface FileItem {
  uid: string;
  name?: string;
  status?: string;
  response?: any;
  url?: string;
  preview?: string;
  originFileObj?: any;
  file: string | Blob;
  percent?: number;
}
export interface FileInfo {
  file: FileItem;
  fileList: FileItem[];
}
export default uploadFile;
