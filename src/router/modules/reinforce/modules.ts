/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-07-19 19:52:37
 * @LastEditTime: 2023-07-24 15:32:39
 */
//基线检查
import baseline from './baseline';
//文件保护
import file from './file';
//诱饵文件
import bait from './bait';
//安全补丁
import secpatch from './secpatch';
//虚拟补丁
// import virpatch from './virpatch';

export default [...baseline, ...file, ...bait, ...secpatch];
