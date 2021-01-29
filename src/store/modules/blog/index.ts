import {
  Module,
  VuexModule,
  Mutation,
  Action,
  getModule,
} from 'vuex-module-decorators'
import { baseAxios } from '@/api/axios'
import store from '@/store'
import Vue from 'vue'
interface BlogType {
  id?: string
  title?: string
  content?: string
  createdDate?: string
  image?: string
}
@Module({ dynamic: true, store, name: 'blogs' })
class Blog extends VuexModule {
  public allBlogs: BlogType[] = []
  public blog: BlogType = {}

  @Mutation
  saveBlogs(payload: any) {
    this.allBlogs = payload.blogPosts
  }
  @Mutation
  saveBlog(payload: BlogType) {
    this.blog = payload
  }

  @Action({ commit: 'saveBlogs', root: true })
  async getAllBlogs() {
    try {
      const response = await baseAxios.get('fakeData.json')

      return response.data
    } catch (err) {
      console.log(err)
    }
  }
  @Action({ commit: 'saveBlog' })
  async getBlogById(id: string) {
    console.log(id)
    try {
      const arrayClone = [...(this.context.state as any).allBlogs]
      console.log(arrayClone)
      const index = arrayClone.findIndex((item: BlogType) => item.id === id)
      if (index !== -1) return arrayClone[index]
      else return null
    } catch (err) {
      console.log(err)
    }
  }
}
export const BlogModule = getModule(Blog)
