import { api } from './api'

export class Allowance {
  /**
   * 获取用户信息
   */
  static getUserInfo = () => {
    return api.get('/admin/user/info', null, {showLoading: true})
  }
  /**
   * 获取考勤信息列表
   */
  static getAttendanceInfoList = (params: any) => {
    return api.get('/kqbz/attendanceInfo/myPageByMonth', params, {showLoading: true})
  }
  /**
   * 获取待办考勤
   */
  static getListConfirmable = (params: any) => {
    return api.get('/kqbz/attendanceConfirm/listConfirmable', params, {showLoading: true})
  }
  /**
   * 获取补助列表
   */
  static getAllowanceInfoList = (params: any) => {
    return api.get('/kqbz/allowanceInfo/listMyAllowanceDetailByMonth', params, {showLoading: true})
  }
  /**
   * 确认考勤补助
   */
  static confirmAllowance = (data: any) => {
    return api.post('/kqbz/attendanceConfirm/confirm', data)
  }
  /**
   * 获取补助-按类型
   */
  static getAllowanceSummary = (params: any) => {
    return api.get('/kqbz/allowanceInfo/listMyAllowanceSummaryByMonth', params, {showLoading: true})
  }

  // listMyAllowanceDetailByMonth
  /**
   * 获取补助-按月份
   */
  static getAllowanceDetailByMonth = (params: any) => {
    return api.get('/kqbz/allowanceInfo/listMyAllowanceDetailByMonth', params, {showLoading: true})
  }
}