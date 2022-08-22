import {reqGetSearchInfo} from '@/api'
const state = {
    searchList: {},
};
const mutations = {
    GETSEARCCHLIST(state,searchList) {
        state.searchList = searchList
    }
};
const actions = {
    async getSearchList({commit},params={}) {
        let result = await reqGetSearchInfo(params)
        if(result.code === 200) {
            commit('GETSEARCCHLIST',result.data)
        }
    }
};
//项目当中getters主要作用是：简化仓库中的数据
const getters = {
    attrsList(state) {
        return state.searchList.attrsList || []
    },
    goodsList(state) {
        return state.searchList.goodsList || []
    },
    trademarkList(state) {
        return state.searchList.trademarkList || []
    },
};

export default {
    state,
    mutations,
    actions,
    getters
}