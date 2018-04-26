# redux复习之路

## reducer计算流程

```js
const defaultState = {
  total: 0
}

const reducer = (state = defaultState, action) => {
  switch(action.type) {
    case 'ADD':
      return Object.assign({}, state, { total: state.total + action.payload })
    case 'SUB': 
      return { ...state, ...{ total: state.total - action.payload } }
    default:
      return { ...state }
  }
}

const resState = reducer({ total: 3 }, {
  type: 'SUB',
  payload: 3
})
```

reducer流程

1. 定义reducer为一个纯函数，其有两个参数state和action。函数体内根据action.type判断如何新创建state；
2. 调用reducer，传入action.type为'SUB'，case到'SUB'，使用扩展运算符生成新对象；

## redux.createState()方法实现

```js
// 创建仓库
const createStore = (reducer) => {
  // 状态
  let state;
  // 监听函数数组
  let listeners = [];
  // 获取最新的实时状态
  let getState = () => state;
  // 向仓库发送action
  let dispatch = (action) => {
    // 两个参数分别是：原state状态和传进来的指令。相当于用传来的执行action修改原state后返回新state
    // reducer最后返回新的state
    state = reducer(state, action);
    // 依次循环所有监听者们执行一次
    listeners.forEach(listener => listener())
  };
  // 订阅仓库内的状态事件，当状态发生变化后会调用对应的监听函数
  // 订阅方法执行后会返回一个取消订阅的函数，调用它可以取消订阅
  let subscribe = (listener) => {
    listeners.push(listener);
    return () => {
      // 在现有监听者们中过滤掉传进来的这个监听者
      listeners = listeners.filter(l=>listener !== l);
    }
  };
  // 为了没action时初始化state
  dispatch();
  return { 
    getState,
    subscribe,
    dispatch
  }
}
export { createStore }
```

* 比阮一峰大侠版的多了源码