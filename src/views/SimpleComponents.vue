<script setup lang="ts">
// simple-component 브랜치에 추가될 내용들을 단순 출력하는 용도
import { ref, computed } from 'vue'

import CompareCalendar from '@/components/compareCalendar.vue'
import TitleWithSubtitle from '@/components/titleWithSubtitle.vue'
import ProgressFill from '@/components/progressFill.vue'
import PercentWithIcon from '@/components/percentWithIcon.vue'
import DataTable from '@/components/dataTable.vue'
import ContentsPagination from '@/components/contentsPagination.vue'

const random = [
  {image: '/image/character/astronaut_cat.jpeg', text: ['Lorem ipsum dolor sit amet','consectetur adipiscing elit'], word: 'lorem'},
  {image: '/image/character/astronaut_fox.jpeg', text: ['Fusce porttitor dui quis eros accumsan','eu ultrices urna porttitor'], word: 'ipsum'},
  {image: '/image/character/chef_cat.jpeg', text: ['Nunc in nunc eleifend tincidunt orci eu','pretium risus'], word: 'dolor'},
  {image: '/image/character/cosplay_wolf.jpeg', text: ['Donec ut lacus bibendum aliquet mi quis','tincidunt libero'], word: 'sit'},
  {image: '/image/character/hip_hop_cat.jpeg', text: ['Integer eget arcu consectetur', 'lorem dictum pharetra'], word: 'amet'},
  {image: '/image/character/hip_hop_dog.jpeg', text: ['Suspendisse a nisl venenatis','aliquam diam quis maximus neque'], word: 'consectetur'},
  {image: '/image/character/hip_hop_panda.jpeg', text: ['Aliquam eget lorem consequat','volutpat magna at placerat tortor'], word: 'adipiscing'},
  {image: '/image/character/hip_hop_pig.jpeg', text: ['Pellentesque placerat odio vel odio pulvinar','vitae cursus felis consequat'], word: 'elit'},
  {image: '/image/character/pirate_cat.jpeg', text: ['Aenean sollicitudin neque','et auctor fringilla'], word: 'aliquam'},
  {image: '/image/character/suit_dog.jpeg', text: ['Pellentesque vitae mauris','id felis aliquet sagittis porttitor id tellus'], word: 'maximus'},
]

const data = {
  title: 'All Company',
  columns: [
    { key: 'category', title: '카테고리' },
    { key: 'views', title: '조회수', sortable: true},
    { key: 'revenue', title: '수익', sortable: true},
    { key: 'sales', title: '판매량', component: 'PercentWithIcon', sortable: true},
  ],
  rows: Array.from(Array(50), () => {
    return {
      category: {
        image: random[Math.floor(Math.random()*10)].image,
        text: random[Math.floor(Math.random()*10)].text
      },
      views: { text: [Math.floor(Math.random()*1000), random[Math.floor(Math.random()*10)].word] },
      revenue: { text: [Math.floor(Math.random()*1000)] },
      sales: { text: [(500 - Math.random()*1000)] },
    }
  }),
}

const page = ref(1)
function changePage (n: number) {
  // pageing에서 페이지 변경
  page.value = n
}

const pageSize = 10
const pageRows = computed(() => data.rows.slice((page.value-1)*pageSize, page.value*pageSize))

</script>

<template>
  <div>
    <CompareCalendar></CompareCalendar>
    <TitleWithSubtitle
      title="title"
      subtitle="subtitle"
    />
    <ProgressFill
      :base="100"
      :compare="Math.floor(Math.random() * 100)"
    />
    <ProgressFill
      :percent="50"
    />
    <PercentWithIcon
      :base="Math.floor(Math.random() * 100)"
      :compare="Math.floor(Math.random() * 100)"
    />
    <DataTable
      :data="{
        title: data.title,
        columns: data.columns,
        rows: pageRows
      }"
    ></DataTable>
    <ContentsPagination
      :totalItems="data.rows.length"
      :currentPage="page"
      :pageSize="pageSize"
      :maxPages="5"
      @paging="changePage"
    />
  </div>
</template>