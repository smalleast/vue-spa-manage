/**
 * Created by banlan002 on 2017/7/21.
 */
import Vue from 'vue'
import * as types from './mutation_types'
import nxStore from 'next-store';
export default {
    [types.SET_USER] (state, data) {
        state.user = data;
        nxStore.local={
            token:data
        };
    },
    [types.CLEAR_USER] (state) {
        nxStore.clear('token');
        state.user = {};
    },
    [types.SET_NUM] (state, {res, num}) {
        if(num >= 0){
            state.msgNotesNum = num;
            state.magTabLists = res;
        }
    }
}
