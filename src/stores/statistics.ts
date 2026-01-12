import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useStatisticsStore = defineStore('statistics', () => {
  // let count = ref(0)
  const attendanceForDay = ref()
  const allowanceForDay = ref()

  const setAttendanceForDay = (data: any) => {
    attendanceForDay.value = data
    // count.value++
    sessionStorage.setItem('attendanceForDay', JSON.stringify(data))
  }
  const getAttendanceForDay = () => {
    // count.value++
    return attendanceForDay.value
  }

  const setAllowanceForDay = (data: any) => {
    allowanceForDay.value = data
    // count.value--
    sessionStorage.setItem('allowanceForDay', JSON.stringify(data))
  }

  const getAllowanceForDay = () => {
    // count.value--
    return allowanceForDay.value
  }



  return {
    attendanceForDay,
    allowanceForDay,
    setAttendanceForDay,
    // getAttendanceForDay,
    setAllowanceForDay,
    // getAllowanceForDay,
  }
})