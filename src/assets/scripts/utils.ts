/**
 * 工具类
 */
export const utils = {
  /**
   * 显示金额，包含三位分节，保留小数点后两位
   * @param amount 金额数值
   * @returns 格式化后的金额字符串
   */
  formatCurrency(amount: number): string {
    // 保留两位小数
    const fixedAmount = amount.toFixed(2)

    // 分割整数部分和小数部分
    const [integerPart, decimalPart] = fixedAmount.split('.')

    // 对整数部分添加三位分节
    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',')

    // 组合整数部分和小数部分
    return `${formattedInteger}.${decimalPart}`
  },

  /**
   * 显示金额（支持处理字符串输入）
   * @param amount 金额数值或字符串
   * @returns 格式化后的金额字符串
   */
  formatCurrencyFromString(amount: number | string): string {
    const num = typeof amount === 'string' ? parseFloat(amount) : amount
    return this.formatCurrency(isNaN(num) ? 0 : num)
  },

  /**
   * 获取URL的查询参数
   * @param url 可选，指定的URL地址，未传入时使用当前页面地址
   * @returns 包含查询参数的对象
   */
  getUrlParams(url?: string): Record<string, any> {
    const params: Record<string, any> = {}
    let search: string

    if (url) {
      // 从指定URL中提取查询参数
      const urlObj = new URL(url)
      search = urlObj.search
    } else {
      // 使用当前页面地址的查询参数
      search = window.location.search
    }

    if (search) {
      const urlParams = new URLSearchParams(search)

      urlParams.forEach((value, key) => {
        // 尝试将值转换为数字
        const numValue = parseFloat(value)
        if (!isNaN(numValue) && value === numValue.toString()) {
          params[key] = numValue
        } else {
          params[key] = value
        }
      })
    }

    return params
  }
}
