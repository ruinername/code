export const GET_IP_INFO = '/ip/GET';
export const GET_IP_INFO_SUCCESS = '/ip/GET_SUCCESS';
export const GET_IP_INFO_FAIL = '/ip/GET_FAIL';

export default function reducer(state = { response: {} }, action) {
  switch (action.type) {
    case GET_IP_INFO:
      return { ...state, loaded: false };
    case GET_IP_INFO_SUCCESS:
      return { ...state, loaded: true, response: action.payload.data };
    case GET_IP_INFO_FAIL:
      return {
        ...state,
        loaded: true,
        error: 'Во время запроса возникла ошибка'
      };
    default:
      return state;
  }
}

export function getIP(ip) {
  return{
    type: GET_IP_INFO,
    payload: {
      request: {
        url: `/getInfo/${ip}`
      }
    }
  };
}
