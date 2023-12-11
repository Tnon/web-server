import request from '@/utils/http';

/**
 * @description 统一导出功能
 */
export function exportMessage(url: string, params: any) {
  return request({
    url,
    method: 'POST',
    params,
  });
}
