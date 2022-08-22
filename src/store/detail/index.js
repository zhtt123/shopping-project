import {reqGoodsInfo,reqAddOrUpdateShopCart} from '@/api'
import {getUUID} from '@/utils/uuid_token'
const state = {
    goodInfo: {},
    uuid_token: getUUID()
};
const mutations = {
    GETGOODINFO(state,goodInfo) {
        state.goodInfo = goodInfo
    }
};
const actions = {
    async getGoodInfo({commit},skuId) {
        let result = await reqGoodsInfo(skuId)
        if(result.code === 200) {
            commit('GETGOODINFO',result.data)
        }
    },
    async addOrUpdateShopCart({commit},{skuId,skuNum}) {
        //发请求:前端带一些参数给服务器【需要存储这些数据】,存储成功了,没有给返回数据,不需要再仓库存储数据了
        let result = await reqAddOrUpdateShopCart(skuId,skuNum)
        if(result.code === 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error("fail"))
        }
    }
};
//项目当中getters主要作用是：简化仓库中的数据
const getters = {
    categoryView(state) {
        //比如:state.goodInfo初始状态空对象，空对象的categoryView属性值undefined
        //当前计算出的 categoryView属性值至少是一个空对象，假的报错不会有了。
        return state.goodInfo.categoryView || {};
      },
      //简化产品信息的数据
      skuInfo(state) {
        return state.goodInfo.skuInfo || {};
      },
      //产品售卖属性的简化
      spuSaleAttrList(state) {
        return state.goodInfo.spuSaleAttrList || [];
      },
};

export default {
    state,
    mutations,
    actions,
    getters
}