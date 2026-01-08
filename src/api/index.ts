import { api } from './api'

export class Allowance {
  /**
   * 获取用户信息
   */
  static getUserInfo = () => {
    return api.get('/admin/user/info')
  }
  /**
   * 获取考勤信息列表
   */
  static getAttendanceInfoList = (params: any) => {
    return api.get('/kqbz/attendanceInfo/myPageByMonth', params)
  }
  /**
   * 获取待办考勤
   */
  static getListConfirmable = (params: any) => {
    return api.get('/kqbz/attendanceUserConfirm/listConfirmable', params)
  }
}