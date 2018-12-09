import Api from '@/api'

export default { 
  async getAll() {
    return Api().get("stories")
  },
  async add(story) {
    return Api().post("stories", story)
  },
  async remove(id) {
    console.log("service", id)
    return Api().delete("stories", { params: { id: id }} )
  }
}