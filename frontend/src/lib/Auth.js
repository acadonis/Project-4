import jwt from  'jsonwebtoken'

class Auth {
  static setToken(token) {
    localStorage.setItem('token', token)
  }

  static getToken() {
    return localStorage.getItem('token')
  }

  static removeToken() {
    localStorage.removeItem('token')
  }

  static getPayload() {
    return jwt.decode(this.getToken())
  }

  static isAuthenticated() {
    const payload = this.getPayload()
    return payload
  }

  static getCurrentUserId() {
    const payload = this.getPayload()
    return payload && payload.sub
  }

  static isCurrentUser(user) {
    return this.getCurrentUserId() === user
  }


}

export default Auth
