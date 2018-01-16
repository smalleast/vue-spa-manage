/**
 * Created by banlan002 on 2018/1/12.
 */
import {$api} from "../../components/vue/index";

export default {
    state: {
        identityTypes: [],
        projectTypes: [],
        styleTypes: [],
        projectStatusList:[],
        customerStatusList:[],
    },

    mutations: {
        ['SET_IDENTITY_TYPES'] (state, data) {
            state.identityTypes = data;
        },
        ['SET_PROJECT_TYPES'] (state, data) {
            state.projectTypes = data;
        },
        ['SET_STYLE_TYPES'] (state, data) {
            state.styleTypes = data;
        },
        ['SET_PROJECT_STATUS'] (state, data) {
            state.projectStatusList = data;
        },
        ['SET_CUSTOMER_STATUS'] (state, data) {
            state.customerStatusList = data;
        },
    },
    actions: {
        getIdentityTypes({commit}) {
            $api.dictionaries('get', '', 'identity_type')
                .then(res => {
                    commit('SET_IDENTITY_TYPES', res?res.data:[])
                })
        },
        getProjectTypes({commit}) {
            $api.dictionaries('get', '', 'project_type')
                .then(res => {
                    commit('SET_PROJECT_TYPES', res?res.data:[])
                })
        },
        getStyleTypes({commit}) {
            $api.dictionaries('get', '', 'style_type')
                .then(res => {
                    commit('SET_STYLE_TYPES', res?res.data:[])
                })
        },
        getProjectStatusList({commit}) {
            $api.dictionaries('get', '', 'project_status')
                .then(res => {
                    commit('SET_PROJECT_STATUS', res?res.data:[])
                })
        },
        getCustomerStatusList({commit}) {
            $api.dictionaries('get', '', 'customer_status')
                .then(res => {
                    commit('SET_CUSTOMER_STATUS', res?res.data:[])
                })
        },
    }
};

