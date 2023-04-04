// 类型判断
// 输出为Object,Array,String,Number,Undefined,Null等。
export const isType = (val: unknown) => Object.prototype.toString.call(val).replace('[', '').replace(']', '').split(' ')[1];