export const GET_USER_SUCCESS = 'GET_USER_SUCCESS'
export const GET_USER__FAILED = 'GET_USER_FAILED'
export const CREATE_LIST = 'CREATE_LIST'
export const CREATE_LIST_FAILED = 'CREATE_LIST_FAILED'


export const setUserData = (email) => {
  return async dispatch => {
    try {
      // if API is down, pull data locally to test
      let userResponse = await fetch(`https:/keeptheglow.herokuapp.com/api/users/${email}`)

      let userData = await userResponse.json()

      console.log("userData from actions.user.js", userData)

      let id = userData.user[0].id

      console.log(id, "id from actions.user.js")

      let scoresResponse = await fetch(`https:/keeptheglow.herokuapp.com/api/users/${id}/scores`)

      let scores = await scoresResponse.json()
      // console.log("scores", scores)

      let staticFeelingsResponse = await fetch('https://keeptheglow.herokuapp.com/api/static')

      let staticFeelings = await staticFeelingsResponse.json()
      // console.log('staticFeelings from actions', staticFeelings )

      dispatch({
        type: GET_USER_SUCCESS,
        user: userData,
        scores: scores,
        staticFeelings: staticFeelings,
      })
    }
    catch (err) {
      dispatch({
        type: GET_USER_FAILED,
        value: err
      })
    }
  }
}

export const createListItem = list_item => {
  return dispatch => {
    dispatch({
        type: CREATE_LIST,
        list_item: list_item,
      })
  }
}
