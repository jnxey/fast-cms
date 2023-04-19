import { ref } from 'vue'
import { Http, HttpApis } from '../http'
import { SystemValues } from '../values'

export const userInfo = ref(null)

export const getUserInfo = () => {
  Http.get(HttpApis.getAdminInfo).then(function (response) {
    var res = response.data
    if (res.code === SystemValues.responseMap.success.code) {
      userInfo.value = res.result
    }
  })
}
