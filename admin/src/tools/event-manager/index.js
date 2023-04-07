/// 定义一个事件管理类
class EventManager {
  /// 缓存监听的事件
  _callbacks = {}

  /// 监听事件
  on(name, callback) {
    if (this._callbacks[name]) {
      this._callbacks[name].push(callback)
    } else {
      this._callbacks[name] = [callback]
    }
  }

  /// 监听事件，只执行一次
  once(name, callback) {
    const _this = this

    function fn() {
      const attrs = Array.prototype.slice.apply(arguments)
      callback.apply(null, attrs)
      _this.off(name, fn)
    }

    if (this._callbacks[name]) {
      this._callbacks[name].push(fn)
    } else {
      this._callbacks[name] = [fn]
    }
  }

  /// 卸载事件
  off(name, callback) {
    const callbacks = this._callbacks[name]
    const callkey = callbacks?.indexOf(callback)
    if (callkey !== undefined && callkey > -1) {
      this._callbacks[name].splice(callkey, 1)
    }
  }

  /// 触发事件
  emit(name, data) {
    if (this._callbacks[name]) {
      this._callbacks[name].forEach((callback) => {
        callback(data)
      })
    }
  }
}

const eventManager = new EventManager()

export default eventManager
