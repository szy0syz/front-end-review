// 一个简单的reducer计算流程

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

console.log(resState)