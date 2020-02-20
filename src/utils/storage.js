import { AsyncStorage } from 'react-native'

function clear() {
  return AsyncStorage.clear()
}

let get = async (key) => {
  return await AsyncStorage.getItem(key).then(
    value => {
      return value
    }
  )
}

function set(key, value) {
  return AsyncStorage.setItem(key, value)
}

function remove(key) {
  return AsyncStorage.removeItem(key)
}

function multiGet(...keys) {
  return AsyncStorage.multiGet([...keys]).then(stores => {
    const data = {}
    stores.forEach((result, i, store) => {
      data[store[i][0]] = JSON.parse(store[i][1])
    })
    return data
  })
}

function multiRemove(...keys) {
  return AsyncStorage.multiRemove([...keys])
}

export default {
  clear,
  get,
  set,
  remove,
  multiGet,
  multiRemove,
}
