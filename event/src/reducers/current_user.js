const UPDATE_USER = 'UPDATE_USER'

let initialStateDemo = {
  userinfo: null
}

export default function (state = initialStateDemo, action) {
  switch (action.type) {
    case UPDATE_USER:
      return {
        userinfo: action.data
      }
    default:
      return state
  }
}