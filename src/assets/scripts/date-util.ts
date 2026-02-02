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
  },

  /**
   * 计算两个时间之间的时长
   * @param startTime 开始时间，格式为hh:mm:ss或YYYY-MM-DD hh:mm:ss
   * @param endTime 结束时间，格式为hh:mm:ss或YYYY-MM-DD hh:mm:ss
   * @param options 选项
   * @param options.unit 返回单位：'hours'（小时）、'minutes'（分钟）、'seconds'（秒）或 'format'（格式化为hh:mm:ss）
   * @returns 时长
   */
  calculateDuration(startTime: string, endTime: string, options: {
    unit?: 'hours' | 'minutes' | 'seconds' | 'format';
  } = {}): string | number {
    const { unit = 'format' } = options

    // 解析时间字符串为Date对象
    const parseTime = (timeStr: string): Date => {
      // 检查是否包含日期部分
      if (timeStr.includes(' ')) {
        // 格式为YYYY-MM-DD hh:mm:ss
        return new Date(timeStr)
      } else {
        // 格式为hh:mm:ss，使用当前日期
        const today = new Date().toISOString().split('T')[0]
        return new Date(`${today} ${timeStr}`)
      }
    }

    const start = parseTime(startTime)
    const end = parseTime(endTime)

    // 计算差值（处理跨天情况，取绝对值）
    let diffSeconds = Math.abs(Math.floor((end.getTime() - start.getTime()) / 1000))

    // 转换为小时、分钟、秒
    const hours = Math.floor(diffSeconds / 3600)
    const minutes = Math.floor((diffSeconds % 3600) / 60)
    const seconds = diffSeconds % 60

    // 根据单位返回不同格式
    switch (unit) {
      case 'hours':
        return parseFloat((hours + minutes / 60 + seconds / 3600).toFixed(2))
      case 'minutes':
        return parseFloat((hours * 60 + minutes + seconds / 60).toFixed(2))
      case 'seconds':
        return diffSeconds
      case 'format':
      default:
        // 格式化为hh:mm:ss
        return [
          hours.toString().padStart(2, '0'),
          minutes.toString().padStart(2, '0'),
          seconds.toString().padStart(2, '0')
        ].join(':')
    }
  },

  /**
   * 获取指定日期的星期几
   * @param date 日期对象或字符串，格式为YYYY-MM-DD
   * @param options 选项
   * @param options.format 返回格式：'full'（星期几）或 'short'（周几）
   * @param options.type 返回类型：'number'（阿拉伯数字，1-7，周日为1）或 'chinese'（中文大写）
   * @returns 星期几
   */
  getDayOfWeek(date?: Date | string | number, options: {
    format?: 'full' | 'short';
    type?: 'number' | 'chinese';
  } = {}): string | number {
    const { format = 'full', type = 'chinese' } = options
    const dayjsDate = dayjs(date)

    if (type === 'number') {
      // 返回阿拉伯数字，0-6，周日为0
      // console.log('date',date, dayjsDate.day())
      return dayjsDate.day()
    } else {
      // 返回中文大写
      const days = format === 'full'
        ? ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
        : ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
      return days[dayjsDate.day()]
    }
  },

  /**
   * 获取连续出勤天数
   * @param attendanceDates 出勤日期数组，元素可以是Date对象、字符串或数字
   * @returns 最长连续出勤天数
   */
  getConsecutiveAttendanceDays(attendanceDates: Array<Date | string | number>): number {
    if (!attendanceDates || attendanceDates.length === 0) {
      return 0
    }

    // 转换并排序日期
    const sortedDates = attendanceDates
      .map(date => dayjs(date).format('YYYY-MM-DD'))
      .filter((value, index, self) => self.indexOf(value) === index) // 去重
      .sort()

    if (sortedDates.length === 0) {
      return 0
    }

    let maxConsecutive = 1
    let currentConsecutive = 1

    // 计算连续天数
    for (let i = 1; i < sortedDates.length; i++) {
      const prevDate = dayjs(sortedDates[i - 1])
      const currDate = dayjs(sortedDates[i])
      const diffDays = currDate.diff(prevDate, 'day')

      if (diffDays === 1) {
        // 连续的一天
        currentConsecutive++
        maxConsecutive = Math.max(maxConsecutive, currentConsecutive)
      } else {
        // 不连续，重置计数器
        currentConsecutive = 1
      }
    }

    return maxConsecutive
  }
}

// 导出dayjs实例，方便需要高级功能的场景使用
export { dayjs }
