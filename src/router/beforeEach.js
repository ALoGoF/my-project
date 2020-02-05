import router from './index';
import store from '../store';

// handles
const requireContext = require.context('./handles', false, /\.js$/);

router.beforeEach((to, from, next) => {
  const context = { store, router, to, from, next };

  requireContext.keys().forEach(fileName => {
    const handleConfig = requireContext(fileName);
    const handle = handleConfig.default || handleConfig;
    handle(context);
  });
  
  next();
});