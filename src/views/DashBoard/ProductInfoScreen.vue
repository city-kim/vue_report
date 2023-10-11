<script lang="ts" setup>
import { ref, computed } from 'vue'

import ContainerHeading from '@/components/DashBoard/ContainerHeading.vue'

import DataTable from '@/components/Common/DataTable.vue'
import BarChart from '@/components/Common/Chart/BarChart.vue'
import PieChart from '@/components/Common/Chart/PieChart.vue'

import SkeletonContainer from '@/components/Common/Skeleton/SkeletonContainer.vue'

import type { PropType } from 'vue'

const props = defineProps({
  colors: {
    type: Array as PropType<string[]>,
    required: true
  },
  salesChartData: {
    type: Object as PropType<{
      labels: Array<string>
      data: Array<{
        label: string
        data: Array<number>
      }>
    }>,
    required: true
  },
  categoryChart: {
    type: Object as PropType<{
      labels: Array<string>
      dataset: Array<{
        data: Array<number>
      }>
    }>,
    required: true
  },
  tableSortTarget: {
    type: Array as PropType<Array<{
      key: string
      title: string
      sortable?: boolean|undefined
      component?: string|undefined
    }>>,
    required: true
  },
  tableData: {
    type: Object as PropType<{
      columns: Array<{
        key: string
        title: string
        sortable?: boolean | undefined
        component?: string | undefined
      }>
      rows: Array<{
        [key: string]: {
          image?: string | undefined
          text: Array<string | number>
        }
      }>
    }>,
    required: true
  },
  isProductLoading: Boolean,
  isPurchaseLoading: Boolean,
})

// 정렬대상
const sortBy = ref('')

// 판매량 차트 색상포함 데이터
const BarChartDataset = computed(() => props.salesChartData.data.map((x, i) => ({
  ...x,
  backgroundColor: props.colors[i]
})))

// 종류별 비율 차트 색상포함 데이터
const PieChartDataset = computed(() => props.categoryChart.dataset.map(x => ({
  ...x,
  backgroundColor: props.colors
})))

const isLoading = computed(() => props.isProductLoading || props.isPurchaseLoading)

</script>

<template>
  <ContainerHeading
    h2="제품"
    :isLoading="isLoading"
  >
    <div class="dashboard-productinfo-body">
      <article>
        <SkeletonContainer
          target="chart"
          :isLoading="isProductLoading"
        >
          <h3>판매량</h3>
          <BarChart
            :data="{
              labels: props.salesChartData.labels,
              datasets: BarChartDataset
            }"
            :stacked="true"
            :horizontal="true"
            :gradient="true"
            unit="건"
          />
        </SkeletonContainer>
      </article>
      <article class="dashboard-productinfo-body-table">
        <SkeletonContainer
          target="chart"
          :isLoading="isLoading"
        >
          <section>
            <h3>판매순위</h3>
            <select
              v-model="sortBy"
            >
              <option value="">정렬</option>
              <option
                v-for="option in props.tableSortTarget"
                :key="option.key"
                :value="option.key"
              >
                {{ option.title ? option.title : option.key }}
              </option>
            </select>
          </section>
          <DataTable
            :data="props.tableData"
            :sortBy="sortBy"
            height="300px"
          />
        </SkeletonContainer>
      </article>
      <article>
        <SkeletonContainer
          target="chart"
          :isLoading="isProductLoading"
        >
          <h3>종류별 비율</h3>
          <PieChart
            :data="{
              labels: props.categoryChart.labels,
              datasets: PieChartDataset
            }"
            :label="true"
            :legend="true"
            legendPosition="right"
            unit="원"
          />
        </SkeletonContainer>
      </article>
    </div>
  </ContainerHeading>
</template>
<style lang="scss">
  .dashboard-productinfo-body {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    @include mobile {
      grid-template-columns: repeat(1, 1fr);
    }
    @include tablet {
      grid-template-columns: repeat(1, 1fr);
    }
    gap: 1rem;
    & > article {
      @include card-container;
      section {
        display: flex;
        justify-content: space-between;
      }
      h3 {
        font-size: 1.125rem;
      }
    }
    .dashboard-productinfo-body-table {
      @include mobile {
        overflow: auto;
      }
    }
  }
</style>