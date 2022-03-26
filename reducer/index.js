function load(state, action) {
  switch (action.type) {
    case 'loading':
      return {count: state.count + 1};
    case 'loaded':
      return {count: state.count - 1};
    default:
      throw new Error();
  }
}
export const intialUserState = {

}

function userStatus(state, action) {
  const newState = {
    userStatus: action.type,
    isOnboarded: false
  }
  switch (action.type) {
    case 'new':
      newState.isOnboarded = false
      return newState
    case 'dev':
      newState.isOnboarded = true
      return newState
    case 'visitorBare':
      newState.isOnboarded = true
      return newState
    case 'visitorDone':
      newState.isOnboarded = true
      return newState
      case 'guideDone':
        newState.isOnboarded = true
        return newState
    case 'guideDone':
      newState.isOnboarded = true
      return newState
    default:
      throw new Error();
  }
}