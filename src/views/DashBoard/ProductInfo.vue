<script lang="ts" setup>
import { onMounted } from 'vue'
import { productStore } from '@/stores/product'
import { getCssVar } from '@/util/color'

import ProductInfoScreen from '@/views/DashBoard/ProductInfoScreen.vue'

const product = productStore()

// 차트색상
const colors = [ getCssVar('--c-blue'), getCssVar('--c-red'), getCssVar('--c-purple'), getCssVar('--c-yellow') ]

onMounted(() => {
  product.fetechProductData()
  product.fetechPurchaseData()
})
</script>

<template>
  <ProductInfoScreen
    :colors="colors"
    :salesChartData="product.salesChartData"
    :categoryChart="product.categoryChart"
    :tableSortTarget="product.tableSortTarget"
    :tableData="product.tableData"
    :isProductLoading="product.isProductLoading"
    :isProductError="product.isProductError"
    :isPurchaseLoading="product.isPurchaseLoading"
    :isPurchaseError="product.isPurchaseError"
  ></ProductInfoScreen>
</template>