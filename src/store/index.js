/**
 * Created by banlan002 on 2017/7/21.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters'
import * as actions from './actions'
import mutations from './mutations'

Vue.use(Vuex);

const state = {
    alertTexts: [
        {
            id: 100,
            title: '是否确认合同？',
            content: '确认订货单表示同意接受该订单，并签署合同与住逻辑正式达成合作。',
            buttonText: '确认合同'
        },
        {
            id: 200,
            title: '是否确认收到定金 ？',
            content: '确认收到定金后，订单进入工厂生产阶段。',
            buttonText: '确认定金'
        },
        {
            id: 300,
            title: '是否确生产完成 ？',
            content: '确认生产完成，订单进入下一阶段，住逻辑将于发货前7日内支付合同总额的50%尾款。',
            buttonText: '确认完成'
        },
        {
            id: 400,
            title: '是否现在发货？',
            content: '与住逻辑交付部门沟通，保障发货',
            buttonText: '立即发货'
        },
        {
            id: 500,
            title: '是否确认收到尾款 ？',
            content: '确认收到尾款后，订单进入交付阶段',
            buttonText: '确认尾款'
        },
        {
            id: 600,
            title: '是否现在发货？',
            content: '与住逻辑交付部门沟通，保障发货',
            buttonText: '立即发货'
        },
        {
            id: 1000,
            title: '是否确认提交报价 ？',
            content: '提交报价后，如果住逻辑审核通过，将按此报价生成订单，并签订正式订购合同。',
            buttonText: '提交报价'
        },
    ],
    msgNotesNum:0,
    magTabLists:{},
};
export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations
})
