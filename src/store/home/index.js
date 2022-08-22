import {reqCategoryList,reqBannerList,reqFloorList} from '@/api'

const state = {
    //三级菜单数据
    categoryList: [],
    //轮播图数据
    bannerList: [],
    floorList: [],
};
const mutations = {
    GETCATEGORYLIST(state,categoryList) {
        state.categoryList = categoryList
    },
    GETBANNERLIST(state,bannerList) {
        state.bannerList = bannerList
    },
    GETFLOORLIST(state,floorList) {
        state.floorList = floorList
    },
};
const actions = {
    //三级联动
    async getCategoryList({commit}) {
        let result = await reqCategoryList()
        if(result.code === 200) {
            commit('GETCATEGORYLIST',result.data)
        }
    },
    //banner模块轮播图
    async getBannerList({commit}) {
        let result = await reqBannerList()
        if(result.code === 200) {
            commit('GETBANNERLIST',result.data)
        }
    },
    //floor模块轮播图
    async getFloorList({commit}) {
        let result = await reqFloorList()
        if(result.code === 200) {
            commit('GETFLOORLIST',result.data)
        }
    },
};
const getters = {};

export default {
    state,
    mutations,
    actions,
    getters
}