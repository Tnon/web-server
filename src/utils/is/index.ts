/*
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-06-10 16:33:33
 * @LastEditTime: 2021-09-09 21:22:32
 */
const toString = Object.prototype.toString;

/**
 * @description: 判断值是否未某个类型
 */
export function is(val: unknown, type: string) {
  return toString.call(val) === `[object ${type}]`;
}

/**
 * @description:  是否png
 */
export function isPng(val: string): boolean {
  const reg = /\.(png|jpg|gif|jpeg|webp)$/;
  return reg.test(val);
}
/**
 * @description:  是否为函数
 */
export function isFunction<T = Function>(val: unknown): val is T {
  return is(val, 'Function');
}

/**
 * @description: 是否已定义
 */
export const isDef = <T = unknown>(val?: T): val is T => {
  return typeof val !== 'undefined';
};

export const isUnDef = <T = unknown>(val?: T): val is T => {
  return !isDef(val);
};
/**
 * @description: 是否为对象
 */
export const isObject = (val: any): val is Record<any, any> => {
  return val !== null && is(val, 'Object');
};

/**
 * @description:  是否为时间
 */
export function isDate(val: unknown): val is Date {
  return is(val, 'Date');
}

/**
 * @description:  是否为数值
 */
export function isNumber(val: unknown): val is number {
  return is(val, 'Number');
}
/**
 * @description:  是否为AsyncFunction
 */
export function isAsyncFunction<T = any>(val: unknown): val is Promise<T> {
  return is(val, 'AsyncFunction');
}
/**
 * @description:  是否为promise
 */
export function isPromise<T = any>(val: unknown): val is Promise<T> {
  return is(val, 'Promise') && isObject(val) && isFunction(val.then) && isFunction(val.catch);
}

/**
 * @description:  是否为字符串
 */
export function isString(val: unknown): val is string {
  return is(val, 'String');
}

/**
 * @description:  是否为boolean类型
 */
export function isBoolean(val: unknown): val is boolean {
  return is(val, 'Boolean');
}

/**
 * @description:  是否为数组
 */
export function isArray(val: any): val is Array<any> {
  return val && Array.isArray(val);
}

// interface ItemNode {
//   parentName?: string
//   name: string
// }
// const dataList: ItemNode[] = [
//   {
//     name: '中国'
//   },
//   {
//     name: '外国'
//   },
//   {
//     parentName: '中国',
//     name: '北京'
//   },
//   {
//     parentName: '中国',
//     name: '上海'
//   },
//   {
//     parentName: '北京',
//     name: '海淀'
//   },
//   {
//     parentName: '海淀',
//     name: '清河'
//   },

// ]

// const format = (data, name?) => {
//   let obj = {}
//   data.forEach(ele => {
//     if (ele.parentName === name) {
//       obj[ele.name] = {}
//     }
//   })
//   for (let k in obj) {
//     let sub = format(data, k)
//     if (sub) {
//       obj[k] = sub
//     }
//   }
//   return obj
// }

// const a = format(dataList)
// console.log(a)
