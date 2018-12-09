import Api from '@/api'

export default { 
  async auth(data) {
    return Api().post("auth", data)
  },
}