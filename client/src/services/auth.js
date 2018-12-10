import Api from '@/api'

export default { 
  async auth(data) {
    return await Api().post("auth", data)
  },
}