const UPDATE_USER = 'UPDATE_USER'

export function updateUser(data) {
    return {
      type: UPDATE_USER,
      data,
    }
}