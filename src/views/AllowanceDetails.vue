<template lang="pug">
#AllowanceDetails(ref="containerRef")
  //- h3 {{typeList}}
  van-sticky(:container="containerRef" :offset-top="46" )
    div(class="bg-[#f5f7fa]")
      van-row(:gutter="16" class="p-4")
        van-col(:span="10")
          //- div(class="flex justify-center") {{currentDate}}
          van-button(type="primary" round class="h-8" plain @click="onClick")
            span {{isEmpty(selectedDate) ? currentDate :  `${selectedDate[0]}年${selectedDate[1]}月`}}
            van-icon(name="notes-o" size="18" class="relative top-[1px]")
      div(class="px-4")
        div(class="relative overflow-hidden rounded-[20px] bg-gradient-to-br from-sky-600 via-sky-500 to-sky-600 p-6 shadow-soft shadow-blue-500/20 ring-1 ring-black/5")
          div(class="text-sm font-medium text-sky-50") {{t('totalAllowance')}}
          div(class="text-white mt-2")
            span(class="text-2xl font-semibold opacity-90 mr-1") ¥
            span(class="text-4xl font-semibold tracking-tight") {{utils.formatCurrency(totalAmount || 0)}}
          div(class="mt-3 flex justify-between van-hairline--top pt-3" v-if="typeList?.length > 1")
            template(v-for="item in typeAmountList")
              div
                p(class="text-white font-medium") {{item.typeName}}
                p(class="text-white font-medium") ¥{{utils.formatCurrency(item.amount || 0)}}
      div(class="px-4")
        div(class="mt-4 mb-2 flex items-center justify-between")
          div(class="flex items-baseline")
            span(class="text-base font-bold text-slate-800") {{t('allowanceDetail')}}
            van-dropdown-menu(ref="dropdownMenuRef" v-if="list?.length > 0" class="min-w-[160px]" )
              van-dropdown-item(v-model="querySearch.typeId" :options="typeList" v-if="typeList?.length > 1" @change="handleChangeType")
              van-dropdown-item(v-model="querySearch.sortOrder" :options="sortList" :title="t('sortByTime')" @change="handleChangeSort")
            //- DropdownItem(v-for="item in typeList" :key="item.typeId" :value="item.typeId" @click="handleClick(item.typeId)") {{item.typeName}}
          span(class="text-xs text-sky-600 bg-sky-50 px-2.5 py-1 rounded-full border border-sky-100") 共{{list.length}}条
  div(class="px-4")
    //- p loading {{loading}}
    template(v-if="list?.length === 0")
      van-empty(class="h-[300px]" :description="t('noAllowanceDetail')")
    div(v-else v-for="item in list")
      AllowanceItem(:data="item" )
  van-popup(v-model:show="isPicker" position="bottom")
    van-date-picker(v-model="dateValue" :title="t('selectYearMonth')" :max-date="new Date()" :columns-type="columnsType" @confirm="handleConfirm")
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { isEmpty, sumBy } from 'lodash'
import { dateUtil } from '@/assets/scripts/date-util'
import { utils } from '@/assets/scripts/utils'
import AllowanceItem from '@/components/AllowanceItem.vue'
import { Allowance } from '@/api'
import { useI18n } from '@/i18n'
const { t } = useI18n()

const currentDate = computed(() => {
  return dateUtil.formatDate(new Date(), 'YYYY-MM')
})
const isPicker = ref(false)
const selectedDate = ref()
const dateValue = ref(dateUtil.formatDate(new Date(), 'YYYY-MM').split('-'));
const columnsType = ref(['year', 'month'])
const totalAmount = ref(0)
const querySearch = ref({
  typeId: '',
  sortOrder: ''
})
const sortList = ref([
  {
    value: 'asc',
    text: t('ascendingOrder')
  },
  {
    value: 'desc',
    text: t('descendingOrder')
  }
])
// const list = ref([
//   {
//     id: 1,
//     name: "餐饮补助",
//     datetime: '2023-08-01 08:00:00',
//     type: 1,
//     status: 1,
//     allowance: 100,
//   },
//   {
//     id: 2,
//     name: "交通补助",
//     datetime: '2023-08-02 08:00:00',
//     type: 2,
//     status: 2,
//     allowance: 50,
//   },
//   // {
//   //   id: 3,
//   //   name: "加班补助",
//   //   datetime: '2023-08-03 08:00:00',
//   //   type: 3,
//   //   status: 1,
//   //   allowance: 200,
//   // },
// ])
const typeList: any = ref([])
const typeAmountList = ref([])
const list = ref([])
const onClick = () => {
  isPicker.value = true
}
const handleConfirm = (date: any) => {
  isPicker.value = false
  console.log(date)
  selectedDate.value = date.selectedValues
  getAllowanceList(selectedDate.value.join('-'))
  getTypeSummary(selectedDate.value.join('-'))
  // 格式化日期为YYYY-MM-DD格式
  // const formattedDate = dateUtil.formatDate(date, 'YYYY-MM-DD')
  // 更新当前日期显示
  // currentDate.value = formattedDate
}
const loading = ref(false)
const getAllowanceList = async (date: string = currentDate.value) => {
  loading.value = true
  const params = {
    allowanceMonth: date,
    ...querySearch.value
  }
  const res = await Allowance.getAllowanceDetailByMonth(params)
  loading.value = false
  console.log('getAllowanceDetailByMonth', res)
  list.value = res.data || []
  totalAmount.value = sumBy(list.value, (item: any) => item.amount)
}
const getTypeSummary = async (date: string = currentDate.value) => {
  const params = {
    allowanceMonth: date,
  }
  const res = await Allowance.getAllowanceSummary(params)
  console.log('getAllowanceSummary', res)
  // list.value = res.data || []
  typeAmountList.value = res.data || []
  typeList.value = typeAmountList.value.map((item: any) => ({
    value: item.typeId,
    text: item.typeName
  }))
  typeList.value.unshift({
    value: '',
    text: t('allTypes')
  })
  totalAmount.value = sumBy(list.value, (item: any) => item.amount)
}
const handleChangeType = (value: any) => {
  console.log('handleChange', value)
  getAllowanceList(selectedDate.value.join('-'))
}
const handleChangeSort = (value: any) => {
  console.log('handleChangeSort', value)
  getAllowanceList(selectedDate.value.join('-'))
}
onMounted(() => {
  getAllowanceList()
  getTypeSummary()
})
</script>

<style lang="scss">
  .van-dropdown-menu__bar {
    background-color: transparent !important;
    box-shadow: none !important;
  }
  .van-dropdown-menu__title {
    margin-left: 8px;
    font-size: 14px;
  }
  .van-dropdown-menu__title:after {
    border-color: transparent transparent var(--van-gray-6) var(--van-gray-6)

  }
// v-deep(.van-dropdown-menu__bar) {
//   background-color: transparent;
// }
</style>