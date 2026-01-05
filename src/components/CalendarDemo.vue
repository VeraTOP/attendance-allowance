<template lang="pug">
#CalendarDemo(class="px-5 mt-6 mb-10")
  p(class="text-[17px] font-bold text-slate-800 tracking-tight mb-4") 日历功能演示

  // 日历组件
  div(class="bg-white rounded-lg shadow-sm border border-slate-100 mb-4")
    van-calendar(show="showCalendar"
                  :title="'自定义日历'"
                  :show-mark="true"
                  :get-mark="getMark"
                  :default-date="new Date('2025-12-28')"
                  @close="showCalendar = false")

  // 控制按钮
  div(class="flex gap-3")
    button(@click="showCalendar = true" class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors")
      | 打开日历

    button(@click="toggleMarkedDate('2025-12-25')" class="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors")
      | {{ markedDates.includes('2025-12-25') ? '移除圣诞标记' : '添加圣诞标记' }}

    button(@click="toggleMarkedDate('2026-01-01')" class="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors")
      | {{ markedDates.includes('2026-01-01') ? '移除新年标记' : '添加新年标记' }}

  // 说明文字
  div(class="mt-4 bg-slate-50 p-3 rounded-md")
    p(class="text-sm text-slate-600 mb-1") 功能说明：
    ul(class="list-disc list-inside text-sm text-slate-600")
      li 支持左右滑动或按钮切换月份
      li 标记的日期会显示圆点（绿色：自定义标记，红色：默认标记）
      li 可以通过按钮动态添加/移除标记
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { Calendar } from 'vant'

// 控制日历显示
const showCalendar = ref(false)

// 定义需要标记的日期
const markedDates = ref(['2025-12-28', '2025-12-31'])

// 自定义标记逻辑
const getMark = (date: Date) => {
  const marks = []

  // 格式化日期为YYYY-MM-DD格式
  const formatDate = (d: Date): string => {
    const year = d.getFullYear()
    const month = String(d.getMonth() + 1).padStart(2, '0')
    const day = String(d.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  const dateStr = formatDate(date)

  // 默认标记 - 红色
  if (dateStr === '2025-12-28') {
    marks.push({ color: '#ff4d4f', type: 'dot' })
  }

  // 动态标记 - 绿色
  if (markedDates.value.includes(dateStr) && dateStr !== '2025-12-28') {
    marks.push({ color: '#52c41a', type: 'dot' })
  }

  return marks
}

// 切换标记状态
const toggleMarkedDate = (date: string) => {
  const index = markedDates.value.indexOf(date)
  if (index > -1) {
    markedDates.value.splice(index, 1)
  } else {
    markedDates.value.push(date)
  }
}
</script>

<style scoped>
#CalendarDemo {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}
</style>