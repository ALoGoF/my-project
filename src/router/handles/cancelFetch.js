import axios from 'axios';

export default ({ store, to }) => {
  store.state.fetchSource && store.state.fetchSource.cancel();
  store.commit('setFetchSource', axios.CancelToken.source());
}