export default {
  clone (item) {
    if (!item) { return item } // null, undefined values check

    let types = [Number, String, Boolean]
    let result = null

    // normalizing primitives if someone did new String('aaa'), or new Number('444');
    // 一些通过new方式建立的东东可能会类型发生变化，我们在这里要做一下正常化处理
    // 比如new String('aaa'), or new Number('444')
    types.forEach(type => {
      if (item instanceof type) {
        result = type(item)
      }
    })

    if (result === null) {
      if (Object.prototype.toString.call(item) === '[object Array]') {
        result = []
        item.forEach((child, index, array) => {
          result[index] = this.clone(child)
        })
      } else if (typeof item === 'object') {
        // testign that this is DOM
        // 如果是dom对象，那么用自带的cloneNode处理
        if (item.nodeType && typeof item.cloneNode === 'function') {
          result = item.cloneNode(true)
        } else if (!item.prototype) { // check that this is a literal
          // it is an object literal
          // 如果是个对象迭代的话，我们可以用for in 迭代来赋值
          result = {}
          for (let i in item) {
            if (item.hasOwnProperty(i)) {
              result[i] = this.clone(item[i])
            }
          }
        } else {
          result = item
        }
      } else {
        result = item
      }
    }
    return result
  }
}