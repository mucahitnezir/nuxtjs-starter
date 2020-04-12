export const state = () => ({
  posts: [],
  post: null
})

export const mutations = {
  SET_POSTS(state, posts) {
    state.posts = posts
  },
  SET_POST(state, post) {
    state.post = post
  }
}

export const actions = {
  fetchPosts({ commit, state }) {
    if (state.posts.length > 0) {
      return state.posts
    }
    return this.$axios.$get('/posts').then((posts) => {
      commit('SET_POSTS', posts)
      return posts
    })
  },
  fetchPost({ commit, getters }, postId) {
    const post = getters.getPostById(postId)
    if (post) {
      commit('SET_POST', post)
      return post
    } else {
      return this.$axios.$get(`/posts/${postId}`).then((post) => {
        commit('SET_POST', post)
      })
    }
  }
}

export const getters = {
  getPostById: (state) => (id) => state.posts.find((post) => post.id === id)
}
