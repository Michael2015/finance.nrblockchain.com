import defaultSettings from '@/settings'

const title = defaultSettings.title || 'ALF本地菜运营平台'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
