<script setup lang="ts">
import { computed } from 'vue'
import SvgIconVue from '@/components/Common/SvgIcon.vue'

const props = defineProps({
  totalItems: { // 아이템 갯수
    type: Number,
    required: true
  },
  currentPage: { // 현재페이지
    type: Number,
    default: 1
  },
  pageSize: { // 페이지당 아이템 갯수
    type: Number,
    default: 5
  },
  maxPages: { // 페이지 최대 출력갯수
    type: Number,
    default: 5
  }
})

const emit = defineEmits(['paging'])

const pageData = computed(() => {
  const totalPages = Math.ceil(props.totalItems / props.pageSize)
    let currentPage = props.currentPage

    if (props.currentPage < 1) currentPage = 1 // 1페이지보다 작은경우 1페이지로
    else if (props.currentPage > totalPages) currentPage = totalPages // 마지막페이지보다 큰경우 마지막페이지로

    let startPage: number, endPage: number // 출력될 페이지의 시작번호와 끝번호
    if (totalPages <= props.maxPages) {
      // 전체 페이지가 maxPages보다 작은경우는 1 ~ 전체페이지까지 출력
      startPage = 1
      endPage = totalPages
    } else {
      const before = Math.floor(props.maxPages / 2) // 현재페이지 이전 카운트는 / 2를 버림한 숫자
      const after = Math.ceil(props.maxPages / 2) - 1 // 현재페이지 이후 카운트는 / 2를 반올림한 숫자 - 1
      if (currentPage <= before) {
        // 현재페이지가 before보다 작은경우는 1 ~ maxPages까지 출력
        startPage = 1
        endPage = props.maxPages
      } else if (currentPage + after >= totalPages) {
        // 현재페이지 + after가 전체페이지보다 큰경우는 전체페이지 - maxPages + 1 ~ 전체페이지까지 출력
        startPage = totalPages - props.maxPages + 1
        endPage = totalPages
      } else {
        // 그외의 경우는 현재페이지 - before ~ 현재페이지 + after까지 출력
        startPage = currentPage - before
        endPage = currentPage + after
      }
    }

    // 마지막 페이지의 1을 더한값에서 시작페이지를 뺀만큼 배열을 생성하여 페이지를 출력한다
    const pages = Array.from(Array((endPage + 1) - startPage).keys()).map(i => startPage + i)

    return {
      currentPage: currentPage,
      startPage: startPage,
      totalPages: totalPages,
      pages: pages
    }
})

function changePage (page: number) {
  // 페이지 바꾸기
  emit('paging', page)
}
</script>
<template>
  <ul class="contents-pagination">
    <li v-show="currentPage != pageData.startPage">
      <button type="button"
        @click="changePage(1)"
      >
        <SvgIconVue
          name="chevron_double_left"
          width="1rem"
          height="1rem"
        ></SvgIconVue>
      </button>
    </li>
    <li v-for="page in pageData.pages"
      :key="page"
    >
      <button
        :class="{pageActive: currentPage == page}"
        type="button"
        @click="changePage(page)"
      >{{page}}</button>
    </li>
    <li v-show="currentPage != pageData.totalPages">
      <button
        type="button"
        @click="changePage(pageData.totalPages)"
      >
        <SvgIconVue
          name="chevron_double_right"
          width="1rem"
          height="1rem"
        ></SvgIconVue>
      </button>
    </li>
  </ul>
</template>
<style lang="scss">
  .contents-pagination {
    display: flex;
    gap: 0.2rem;
    li {
      button {
        padding: 0.2rem 0.5rem;
        border:1px solid #ccc;
        cursor: pointer;
        &.pageActive {
          background: #ccc;
        }
      }
    }
  }
</style>