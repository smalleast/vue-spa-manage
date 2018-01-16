import Cookies from 'js-cookie'
import defaultImg from '../../assets/images/default.png';

const app = {
    state: {
        sidebar: {
            opened: !+Cookies.get('sidebarStatus')
        },
        defaultImg: defaultImg,
        pagination: {
            layout: "total,sizes,prev, pager, next",
            pageSizes: [10, 20, 30, 40, 50, 60]
        }
    },
    mutations: {
        TOGGLE_SIDEBAR: state => {
            if (state.sidebar.opened) {
                Cookies.set('sidebarStatus', 1)
            } else {
                Cookies.set('sidebarStatus', 0)
            }
            state.sidebar.opened = !state.sidebar.opened
        }
    },
    actions: {
        ToggleSideBar: ({commit}) => {
            commit('TOGGLE_SIDEBAR')
        }
    }
}

export default app
