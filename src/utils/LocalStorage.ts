import { reactLocalStorage } from 'reactjs-localstorage'
import * as CryptoJS from 'crypto-js'
import { ENCRYPTION_KEY } from './ConstantData'

export const saveToken = (token: string) => {
  reactLocalStorage.set('@blinqpay_token', token)
}


export const saveUserData = (data: any) => {
  let encryptData = encryptCrytoJs(data, true)

  reactLocalStorage.set('@blinqpay_user', encryptData)
}

export const getToken = () => {
  const token = reactLocalStorage.get('@blinqpay_token')
  return token ? token : null
}

export const getUserData = () => {
  const storedUser: any = reactLocalStorage.get('@blinqpay_user')
  let deciperData = decipherCryptoJs(storedUser, true)

  const jsonStored = storedUser ? deciperData : null
  return jsonStored
}

export const encryptCrytoJs = (data: any, json = false) => {
  if (json) {
    return CryptoJS.AES.encrypt(JSON.stringify(data), ENCRYPTION_KEY).toString()
  }

  return CryptoJS.AES.encrypt(data, ENCRYPTION_KEY).toString()
}

export const decipherCryptoJs = (data: any, json = false) => {
  if (json) {
    var bytes = CryptoJS.AES.decrypt(data, ENCRYPTION_KEY)
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
  }

  var bytes = CryptoJS.AES.decrypt(data, ENCRYPTION_KEY)
  return bytes.toString(CryptoJS.enc.Utf8)
}

export const logUserOut = () => {
  reactLocalStorage.remove('@blinqpay_user')
  reactLocalStorage.remove('@blinqpay_admin')
  reactLocalStorage.remove('@blinqpay_token')
  reactLocalStorage.remove('@blinqpay_ref')
}
