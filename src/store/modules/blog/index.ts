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
  highlights: any[] = []

  @Mutation
  saveBlogs(payload: any) {
    this.allBlogs = payload
  }
  @Mutation
  saveBlog(payload: BlogType) {
    this.blog = payload
  }
  @Mutation
  saveHighLights(payload: any) {
    this.highlights = payload
  }
  get blogs() {
    return this.allBlogs
  }
  get getHighLightedWords() {
    return this.highlights
  }
  @Mutation
  updateBlog({ payload, state }: { payload: BlogType; state: BlogType[] }) {
    this.blog = payload

    const index = state.findIndex(item => item.id === payload.id)
    if (index !== -1) {
      state[index] = { ...payload }
      this.allBlogs = [...state]
    }
  }

  @Action({ commit: 'saveBlogs', root: true })
  async getAllBlogs() {
    try {
      const response = await baseAxios.get('fakeData.json')

      return response.data.blogPosts
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
  @Action({ commit: 'updateBlog', rawError: true, root: true })
  async updateBlogContent(payload: BlogType) {
    try {
      const state = { ...(this.context.state as any).blog }
      const arrayClone: BlogType[] = this.context.getters['blogs']
      if (state.id === payload.id) {
        return { payload, state: arrayClone }
      } else return null
    } catch (err) {
      console.log(err)
    }
  }
  @Action({ commit: 'saveHighLights', rawError: true, root: true })
  async addHighLightToBlog(payload: any) {
    try {
      const arrayClone: any[] = this.context.getters['getHighLightedWords']
      arrayClone.push(payload)
      // return [...arrayClone, ...payload]
      return arrayClone
    } catch (err) {
      console.log(err)
    }
  }
}
export const BlogModule = getModule(Blog)
