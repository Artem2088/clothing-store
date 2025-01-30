function requireAll(r) {
    r.keys().forEach(r);
}

import '@/styles/index.scss';

requireAll(require.context('@/svg/', true, /\.svg$/));
