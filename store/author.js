export const state = () => ({
  authors: [],
  author: null
})

export const mutations = {
  SET_AUTHORS(state, authors) {
    state.authors = authors
  },
  SET_AUTHOR(state, author) {
    state.author = author
  }
}

export const actions = {
  fetchAuthors({ commit, state }) {
    if (state.authors.length > 0) {
      return state.authors
    }
    return this.$axios.$get('/users').then((authors) => {
      commit('SET_AUTHORS', authors)
      return authors
    })
  },
  fetchAuthor({ commit, getters }, authorId) {
    const author = getters.getAuthorById(authorId)
    if (author) {
      commit('SET_AUTHOR', author)
      return author
    } else {
      return this.$axios.$get(`/users/${authorId}`).then((author) => {
        commit('SET_AUTHOR', author)
      })
    }
  }
}

export const getters = {
  getAuthorById: (state) => (id) =>
    state.authors.find((author) => author.id === id)
}
