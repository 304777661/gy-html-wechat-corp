import Vue from 'vue'
import App from './App'
import router from './router'
import Axios from 'axios'
import 'lib-flexible'
import 'normalize.css'
import Navigation from 'vue-navigation'
import './assets/sass/main.sass'
import enums from './utils/enums'
import teacherApi from './api/teacher'
import parentApi from './api/parent'
import filters from './utils/filters'
import config from './config'
import './utils/date'
import SelectPicker from './components/SelectPicker.vue'
import DivideDatePicker from './components/DivideDatePicker.vue'
import Card from './components/Card.vue'
import WeekPicker from './components/WeekPicker.vue'
import NoData from './components/NoData.vue'
import PictureMap from './components/PictureMap'
import MyLoading from './components/Loading'
import SurveyInfoCard from './components/SurveyInfoCard'
import Search from './components/Search'
import SectionPicker from './components/SectionPicker'
import MyTabs from './components/MyTabs'
import NoticeDetail from './components/NoticeDetail'
import MyButton from './components/MyButton'
import SelectMember from './components/SelectMember'
// import Radio from './components/Radio'
import {
  Icon,
  Tag,
  Button,
  Toast,
  Cell,
  CellGroup,
  Popup,
  Picker,
  Collapse,
  CollapseItem,
  Tabbar,
  TabbarItem,
  Field,
  List,
  Actionsheet,
  SwitchCell,
  DatetimePicker,
  Checkbox,
  CheckboxGroup,
  Loading,
  Dialog,
  Tab,
  Tabs,
  RadioGroup,
  Radio,
  SwipeCell,
} from 'vant'

Vue.use(Icon)
Vue.use(Tag)
Vue.use(Button)
Vue.use(Cell).use(CellGroup)
Vue.use(Popup)
Vue.use(Picker)
Vue.use(Collapse).use(CollapseItem)
Vue.use(Tabbar).use(TabbarItem)
Vue.use(Field)
Vue.use(List)
Vue.use(Actionsheet)
Vue.use(SwitchCell)
Vue.use(DatetimePicker)
Vue.use(Checkbox).use(CheckboxGroup)
Vue.use(Loading)
Vue.use(Dialog)
Vue.use(Tab)
Vue.use(Tabs)
Vue.use(RadioGroup)
Vue.use(Radio)
Vue.use(SwipeCell)

Vue.component(SelectPicker.name, SelectPicker)
Vue.component(DivideDatePicker.name, DivideDatePicker)
Vue.component(Card.name, Card)
Vue.component(WeekPicker.name, WeekPicker)
Vue.component(NoData.name, NoData)
Vue.component(PictureMap.name, PictureMap)
Vue.component(MyLoading.name, MyLoading)
Vue.component(SurveyInfoCard.name, SurveyInfoCard)
Vue.component(Search.name, Search)
Vue.component(SectionPicker.name, SectionPicker)
Vue.component(MyTabs.name, MyTabs)
Vue.component(MyButton.name, MyButton)
Vue.component(SelectMember.name, SelectMember)
Vue.component(NoticeDetail.name, NoticeDetail)
// Vue.component(Radio.name, Radio)

Vue.prototype.$eventBus = new Vue()
Vue.prototype.$toast = Toast
Vue.prototype.$enums = enums
Vue.prototype.$config = config
Vue.prototype.$api = {
  teacher: teacherApi,
  parent: parentApi
}

// 全局注册过滤器
Object.keys(filters).forEach(filterName => {
  Vue.filter(`${filterName}`, filters[filterName])
})

Axios.defaults.baseURL = config.apiPrefix

// Axios响应拦截器 对返回码进行处理处理
Axios.interceptors.response.use(res => {
  if (res.status === 200 && res.data.rspCd === '00000') {
    return res.data.data || res.data
  }
  Toast(res.data.rspInf)
  return Promise.reject(res.data.rspInf)
}, err => {
  if (err.response) {
    switch (err.response.status) {
      case 502:
        Toast('服务器内部错误')
        break
      case 404:
        Toast('请求地址错误')
        break
      case 405:
        Toast('请求方式错误')
        break
      default:
        Toast('服务器繁忙')
        break
    }
  } else {
    Toast('网络错误')
  }
})

Vue.use(Navigation, {router})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
