/**
 * Created by dcpai on 2017/7/3.
 */
export const Home = require('./home.vue');
export const Hamburger = require('./Hamburger.vue');
export const Pagination = require('./pagination.vue');
export const Api = require('./api');

import Api2 from '../services/api';
import App from '../services/app';
import Config from '../services/config';
import Filter from '../services/filter';
import Utils from '../services/utils';


export const $api = Api2;
export const $App = App;
export const $Config = Config;
export const $Filter = Filter;
export const $utils = Utils;

export const MyEditor = require('./myEditor.vue');
export const MyUpload = require('./myUpload.vue');
export const MySearchBox = require('./MySearchBox.vue');
