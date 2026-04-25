/**
 * Bootstrap the frontend stack.
 *
 * Breeze expects this file to exist; keeping it minimal is enough for now.
 */

import axios from 'axios';

window.axios = axios;

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

