export const state = () => ({
  info: {
    name: 'Elijah',
    token: 'Elijah',
    level: 5
  }
});

export const mutations = {
  setUser (state, payload) {
    state.info.name = payload.name;
    state.info.token = payload.token;
    state.info.level = payload.level;
  }
}