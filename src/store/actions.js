/**
 * Created by banlan002 on 2017/7/21.
 */

import * as types from './mutation_types'
import {$api} from '../components/common/index'

export const setUser = ({commit},user) => {
    commit(types.SET_USER,user)
};
export const clearUser = ({commit}) => {
    commit(types.CLEAR_USER)
};
// 总消息通知的数量
export const setMsgNoteNum = ({commit}) => {
    $api.message('get', 'count').then( (res) => {
        let num = 0;
        res.map( (item) => {
            num += item.qtr;
        });
        commit(types.SET_NUM,{res, num});
    })
};

