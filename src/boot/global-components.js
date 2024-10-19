import { boot } from 'quasar/wrappers'

import Page from 'components/Page/Page.vue'
import PageHeader from 'components/Page/PageHeader.vue'
import PageHeaderBtnBack from 'components/Page/PageHeaderBtnBack.vue'
import PageHeaderBtnRight from 'components/Page/PageHeaderBtnRight.vue'
import PageBody from 'components/Page/PageBody.vue'

const globalComponents = {
  'page': Page,
  'page-header': PageHeader,
  'page-header-btn-back': PageHeaderBtnBack,
  'page-header-btn-right': PageHeaderBtnRight,
  'page-body': PageBody,
  // 'header': Header,
  // 'footer': Footer,
}

export default boot(async ( { app }) => {
  for (const key in globalComponents) {
    app.component(key, await globalComponents[key])
  }
})
