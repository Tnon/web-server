/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-11-29 19:08:00
 * @LastEditTime: 2022-12-22 22:29:33
 */
import SparkMD5 from 'spark-md5';

/**
 * 分段计算MD5
 * @param file {File}
 * @param options {Object} - onProgress | onSuccess | onError
 */
export function generateMD5(file, options) {
  const fileReader = new FileReader();
  const blobSlice =
    File.prototype.slice || (File.prototype as any).mozSlice || (File.prototype as any).webkitSlice;
  const chunkSize = 10 * 1024 * 1000;
  const chunks = Math.ceil(file.size / chunkSize);
  let currentChunk = 0;
  const spark = new SparkMD5.ArrayBuffer();
  const loadNext = () => {
    const start = currentChunk * chunkSize;
    const end = start + chunkSize >= file.size ? file.size : start + chunkSize;

    fileReader.readAsArrayBuffer(blobSlice.call(file.file, start, end));
  };

  loadNext();

  fileReader.onload = (e) => {
    spark.append(e.target?.result);
    if (currentChunk < chunks) {
      currentChunk++;
      loadNext();
      if (options.onProgress && typeof options.onProgress == 'function') {
        options.onProgress(currentChunk, chunks);
      }
    } else {
      const md5 = spark.end();

      // md5计算完毕
      if (options.onSuccess && typeof options.onSuccess == 'function') {
        options.onSuccess(md5);
      }
    }
  };

  fileReader.onerror = function () {
    if (options.onError && typeof options.onError == 'function') {
      options.onError();
    }
  };
}
