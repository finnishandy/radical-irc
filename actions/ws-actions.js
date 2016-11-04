export const CONNECTED = 'CONNECTED'
export const REGISTER = 'REGISTER'

export function connected() {
  return {
    type: CONNECTED
  }
}

export function register() {
  return {
    type: REGISTER
  }
}