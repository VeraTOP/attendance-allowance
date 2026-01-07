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
  }
}
