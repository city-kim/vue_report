<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue'
import { productStore } from '@/stores/product'
import { getCssVar } from '@/util/color'

import ContainerHeading from '@/components/DashBoard/ContainerHeading.vue'

import DataTable from '@/components/Common/DataTable.vue'
import BarChart from '@/components/Common/Chart/BarChart.vue'
import PieChart from '@/components/Common/Chart/PieChart.vue'

const product = productStore()

// 정렬대상
const sortBy = ref('')

// 차트색상
const colors = [ getCssVar('--c-blue'), getCssVar('--c-red'), getCssVar('--c-purple'), getCssVar('--c-yellow') ]

// 판매량 차트 색상포함 데이터
const BarChartDataset = computed(() => product.salesChartData.data.map((x, i) => ({
  ...x,
  backgroundColor: colors[i]
})))

// 종류별 비율 차트 색상포함 데이터
const PieChartDataset = computed(() => product.categoryChart.dataset.map(x => ({
  ...x,
  backgroundColor: colors
})))

onMounted(() => {
  product.fetechProductData()
  product.fetechPurchaseData()
})
</script>

<template>
  {{ product.tableSortTarget }}
  <ContainerHeading
    h2="제품"
  >
    <div class="dashboard-productinfo-body">
      <article>
        <h3>판매량</h3>
        <BarChart
          :data="{
            labels: product.salesChartData.labels,
            datasets: BarChartDataset
          }"
          :stacked="true"
          :horizontal="true"
          :gradient="true"
          unit="건"
        />
      </article>
      <article>
        <section>
          <h3>판매순위</h3>
          <select
            v-model="sortBy"
          >
            <option value="">정렬</option>
            <option
              v-for="option in product.tableSortTarget"
              :key="option.key"
              :value="option.key"
            >
              {{ option.title ? option.title : option.key }}
            </option>
          </select>
        </section>
        <DataTable
          :data="product.tableData"
          :sortBy="sortBy"
          height="300px"
        />
      </article>
      <article>
        <h3>종류별 비율</h3>
        <PieChart
          :data="{
            labels: product.categoryChart.labels,
            datasets: PieChartDataset
          }"
          :label="true"
          :legend="true"
          legendPosition="right"
          unit="원"
        />
      </article>
    </div>
  </ContainerHeading>
</template>
<style lang="scss">
  .dashboard-productinfo-body {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
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
  }
</style>