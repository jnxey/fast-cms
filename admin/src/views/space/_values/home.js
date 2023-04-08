import { ref } from 'vue'
import { Http, HttpApis } from '@/tools/http'
import { SystemValues } from '@/tools/values'

export const homeId = ref(null)

/// 加载当前首页文档内容
export const loadHome = () => {
  Http.get(HttpApis.getDocContentHome).then((response) => {
    const res = response.data
    if (res.code === SystemValues.responseMap.success.code) {
      homeId.value = res.result?.id
    }
  })
}
