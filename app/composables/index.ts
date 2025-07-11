import { useDayjs } from '#dayjs'
import { useStorage as _useStorage } from '@vueuse/core'

export const phonenumber = '1234567'
export const sitename = '网站名称'
// 处理HTML实体字符的函数
export function decodeHtmlEntities(text: string) {
  if (import.meta.client) {
    // 客户端使用DOM API解码
    const textarea = document.createElement('textarea')
    textarea.innerHTML = text
    return textarea.value
  }
  else {
    // 服务端使用正则表达式解码常见HTML实体
    return text
      .replace(/&quot;/g, '"')
      .replace(/&ldquo;/g, '"')
      .replace(/&rdquo;/g, '"')
      .replace(/&lsquo;/g, '\'')
      .replace(/&rsquo;/g, '\'')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&nbsp;/g, ' ')
      .replace(/&mdash;/g, '—')
      .replace(/&ndash;/g, '–')
      .replace(/&hellip;/g, '…')
      .replace(/&#(\d+);/g, (match, dec) => {
        return String.fromCharCode(dec)
      })
  }
}

export const user = useUserStore
export const delHtmlTag = (html: string) => decodeHtmlEntities(html.replace(/<[^>]+>/g, ''))
export const dayjs = useDayjs()
export const parseDate = (date: string) => dayjs(date).format('YYYY-MM-DD')

export const useStorage = _useStorage

