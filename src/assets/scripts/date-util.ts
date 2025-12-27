import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'
import calendar from 'dayjs/plugin/calendar'

// 配置插件
dayjs.extend(relativeTime)
dayjs.extend(calendar)

// 设置默认语言
dayjs.locale('zh-cn')

/**
 * 日期工具类
 */
export const dateUtil = {
  /**
   * 格式化日期时间
   * @param date 日期对象或字符串
   * @param format 格式化模板
   */
  format(date?: Date | string | number, format = 'YYYY-MM-DD HH:mm:ss'): string {
    return dayjs(date).format(format)
  },

  /**
   * 格式化日期
   * @param date 日期对象或字符串
   * @param format 格式化模板
   */
  formatDate(date?: Date | string | number, format = 'YYYY-MM-DD'): string {
    return this.format(date, format)
  },

  /**
   * 格式化时间
   * @param date 日期对象或字符串
   * @param format 格式化模板
   */
  formatTime(date?: Date | string | number, format = 'HH:mm:ss'): string {
    return this.format(date, format)
  },

  /**
   * 相对时间（例如：3天前、刚刚）
   * @param date 日期对象或字符串
   */
  fromNow(date?: Date | string | number): string {
    return dayjs(date).fromNow()
  },

  /**
   * 相对时间（例如：3天后、5分钟后）
   * @param date 日期对象或字符串
   */
  toNow(date?: Date | string | number): string {
    return dayjs(date).toNow()
  },

  /**
   * 日历时间（例如：今天 15:30、昨天 15:30）
   * @param date 日期对象或字符串
   */
  calendar(date?: Date | string | number): string {
    return dayjs(date).calendar()
  },

  /**
   * 获取当前日期时间
   */
  now(): string {
    return this.format(new Date())
  },

  /**
   * 获取当前日期
   */
  today(): string {
    return this.formatDate(new Date())
  },

  /**
   * 获取当前时间
   */
  currentTime(): string {
    return this.formatTime(new Date())
  },

  /**
   * 添加日期
   * @param date 日期对象或字符串
   * @param amount 添加数量
   * @param unit 添加单位（year/month/day/hour/minute/second）
   */
  add(date: Date | string | number, amount: number, unit: dayjs.ManipulateType): string {
    return dayjs(date).add(amount, unit).format()
  },

  /**
   * 减去日期
   * @param date 日期对象或字符串
   * @param amount 减去数量
   * @param unit 减去单位（year/month/day/hour/minute/second）
   */
  subtract(date: Date | string | number, amount: number, unit: dayjs.ManipulateType): string {
    return dayjs(date).subtract(amount, unit).format()
  },

  /**
   * 判断是否为今天
   * @param date 日期对象或字符串
   */
  isToday(date: Date | string | number): boolean {
    return dayjs(date).isSame(dayjs(), 'day')
  },

  /**
   * 判断是否为昨天
   * @param date 日期对象或字符串
   */
  isYesterday(date: Date | string | number): boolean {
    return dayjs(date).isSame(dayjs().subtract(1, 'day'), 'day')
  },

  /**
   * 判断是否为今年
   * @param date 日期对象或字符串
   */
  isThisYear(date: Date | string | number): boolean {
    return dayjs(date).isSame(dayjs(), 'year')
  },

  /**
   * 获取两个日期之间的天数差
   * @param startDate 开始日期
   * @param endDate 结束日期
   */
  diffDays(startDate: Date | string | number, endDate: Date | string | number): number {
    return dayjs(endDate).diff(dayjs(startDate), 'day')
  },

  /**
   * 获取指定月份的总天数
   * @param date 日期对象或字符串，默认为当前日期
   */
  getDaysInMonth(date?: Date | string | number): number {
    return dayjs(date).daysInMonth()
  },

  /**
   * 获取当前月份的总天数
   */
  getDaysInCurrentMonth(): number {
    return this.getDaysInMonth()
  },

  /**
   * 获取时间戳
   * @param date 日期对象或字符串
   * @param unit 单位（second/millisecond）
   */
  timestamp(date?: Date | string | number, unit: 'second' | 'millisecond' = 'millisecond'): number {
    return dayjs(date).valueOf() / (unit === 'second' ? 1000 : 1)
  }
}

// 导出dayjs实例，方便需要高级功能的场景使用
export { dayjs }
