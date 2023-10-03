<script setup lang="ts">
// add-chart 브랜치에 추가될 내용들을 단순 출력하는 용도
import BarChartVue from '@/components/Common/Chart/BarChart.vue'
import LineChartVue from '@/components/Common/Chart/LineChart.vue'
import PieChartVue from '@/components/Common/Chart/PieChart.vue'
import DoughnutChartVue from '@/components/Common/Chart/DoughnutChart.vue'

</script>

<template>
  <div>
    <div class="chart">
      <LineChartVue
        :data="{
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
          datasets: [{label: 'Data One',borderColor: '#ffb3ba',backgroundColor: '#ffffba',fill: true,data: [Math.random()*100,Math.random()*100,Math.random()*100,Math.random()*100,Math.random()*100,Math.random()*100,Math.random()*100]}]
        }"
        :guide="false"
        unit="%"
      ></LineChartVue>
      <LineChartVue
        :data="{
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
          datasets: [{label: 'Data One',borderColor: '#333333',backgroundColor: '#ffffba',fill: false,data: [Math.random()*100,Math.random()*100,Math.random()*100,Math.random()*100,Math.random()*100,Math.random()*100,Math.random()*100]}]
        }"
        :legend="true"
        unit="명"
      ></LineChartVue>
      <LineChartVue
        :data="{
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
          datasets: [{label: 'Data One',borderColor: '#333333',backgroundColor: '#ffffba',fill: true,data: [Math.random()*100,Math.random()*100,Math.random()*100,Math.random()*100,Math.random()*100,Math.random()*100,Math.random()*100]}]
        }"
        :gradient="true"
        unit="건"
      ></LineChartVue>
      <LineChartVue
        :data="{
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
          datasets: [{label: 'Data One', borderColor: '#191d88', data: [Math.random()*100,Math.random()*100,Math.random()*100,Math.random()*100,Math.random()*100,Math.random()*100,Math.random()*100]},{label: 'Data Two',borderColor: '#ffc436',data: [Math.random()*100,Math.random()*100,Math.random()*100,Math.random()*100,Math.random()*100,Math.random()*100,Math.random()*100]},{label: 'Data Two',borderColor: '#aa46be',data: [Math.random()*100,Math.random()*100,Math.random()*100,Math.random()*100,Math.random()*100,Math.random()*100,Math.random()*100],borderDash:[5,5]}]
        }"
        unit="원"
      ></LineChartVue>
    </div>
    <div class="chart">
      <BarChartVue :data="{
          labels: ['January', 'February', 'March', 'April', 'May', 'June'],
          datasets: [{label: 'Data One', backgroundColor: '#191d88', data: [Math.random()*100,Math.random()*100,Math.random()*100,Math.random()*100,Math.random()*100,Math.random()*100]},{label: 'Data Two',backgroundColor: '#ffc436',data: [Math.random()*100,Math.random()*100,Math.random()*100,Math.random()*100,Math.random()*100,Math.random()*100]},{label: 'Data Two',backgroundColor: '#aa46be',data: [Math.random()*100,Math.random()*100,Math.random()*100,Math.random()*100,Math.random()*100,Math.random()*100]}]}"
          :guide="false"
          unit="%"
      ></BarChartVue>
      <BarChartVue :data="{
          labels: ['January', 'February', 'March', 'April', 'May', 'June'],
          datasets: [{label: 'Data One', backgroundColor: '#191d88', data: [Math.random()*100,Math.random()*100,Math.random()*100,Math.random()*100,Math.random()*100,Math.random()*100]},{label: 'Data Two',backgroundColor: '#ffc436',data: [Math.random()*100,Math.random()*100,Math.random()*100,Math.random()*100,Math.random()*100,Math.random()*100]},{label: 'Data Two',backgroundColor: '#aa46be',data: [Math.random()*100,Math.random()*100,Math.random()*100,Math.random()*100,Math.random()*100,Math.random()*100]}]}"
          :legend="true"
          unit="명"
      ></BarChartVue>
      <BarChartVue :data="{
          labels: ['January', 'February', 'March', 'April', 'May', 'June'],
          datasets: [{label: 'Data One', backgroundColor: '#191d88', data: [Math.random()*100,Math.random()*100,Math.random()*100,Math.random()*100,Math.random()*100,Math.random()*100]},{label: 'Data Two',backgroundColor: '#ffc436',data: [Math.random()*100,Math.random()*100,Math.random()*100,Math.random()*100,Math.random()*100,Math.random()*100]},{label: 'Data Two',backgroundColor: '#aa46be',data: [Math.random()*100,Math.random()*100,Math.random()*100,Math.random()*100,Math.random()*100,Math.random()*100]}]}"
          :stacked="true"
          unit="건"
      ></BarChartVue>
      <BarChartVue :data="{
          labels: ['January', 'February', 'March', 'April', 'May', 'June'],
          datasets: [{label: 'Data One', backgroundColor: '#191d88', data: [Math.random()*100,Math.random()*100,Math.random()*100,Math.random()*100,Math.random()*100,Math.random()*100]},{label: 'Data Two',backgroundColor: '#ffc436',data: [Math.random()*100,Math.random()*100,Math.random()*100,Math.random()*100,Math.random()*100,Math.random()*100]},{label: 'Data Two',backgroundColor: '#aa46be',data: [Math.random()*100,Math.random()*100,Math.random()*100,Math.random()*100,Math.random()*100,Math.random()*100]}]}"
          :horizontal="true"
          unit="원"
      ></BarChartVue>
    </div>
    <div class="chart">
      <PieChartVue
        :data="{
          labels: ['VueJs', 'EmberJs', 'ReactJs', 'AngularJs'],
          datasets: [{backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],data: [Math.random()*100,Math.random()*100,Math.random()*100,Math.random()*100]}]
        }"
        :guide="false"
        unit="%"
      ></PieChartVue>
      <PieChartVue
        :data="{
          labels: ['VueJs', 'EmberJs', 'ReactJs', 'AngularJs'],
          datasets: [{backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],data: [Math.random()*100,Math.random()*100,Math.random()*100,Math.random()*100]}]
        }"
        :legend="true"
        unit="명"
      ></PieChartVue>
      <PieChartVue
        :data="{
          labels: ['VueJs', 'EmberJs', 'ReactJs', 'AngularJs'],
          datasets: [{backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],data: [Math.random()*100,Math.random()*100,Math.random()*100,Math.random()*100]}]
        }"
        :label="true"
        unit="건"
      ></PieChartVue>
      <PieChartVue
        :data="{
          labels: ['VueJs', 'EmberJs', 'ReactJs', 'AngularJs'],
          datasets: [{backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],data: [Math.random()*100,Math.random()*100,Math.random()*100,Math.random()*100]}]
        }"
        :legend="true"
        legendPosition="right"
        unit="원"
      ></PieChartVue> 
    </div>
    <div class="chart">
      <DoughnutChartVue
        :data="{
          labels: ['VueJs', 'EmberJs', 'ReactJs', 'AngularJs'],
          datasets: [{backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],data: [Math.random()*100,Math.random()*100,Math.random()*100,Math.random()*100]}]
        }"
        :guide="false"
        unit="%"
      ></DoughnutChartVue>
      <DoughnutChartVue
        :data="{
          labels: ['VueJs', 'EmberJs', 'ReactJs', 'AngularJs'],
          datasets: [{backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],data: [Math.random()*100,Math.random()*100,Math.random()*100,Math.random()*100]}]
        }"
        :legend="true"
        unit="명"
      ></DoughnutChartVue>
      <DoughnutChartVue
        :data="{
          labels: ['VueJs', 'EmberJs', 'ReactJs', 'AngularJs'],
          datasets: [{backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],data: [Math.random()*100,Math.random()*100,Math.random()*100,Math.random()*100]}]
        }"
        :label="true"
        unit="건"
      ></DoughnutChartVue>
      <DoughnutChartVue
        :data="{
          labels: ['VueJs', 'EmberJs', 'ReactJs', 'AngularJs'],
          datasets: [{backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],data: [Math.random()*100,Math.random()*100,Math.random()*100,Math.random()*100]}]
        }"
        :legend="true"
        legendPosition="right"
        unit="원"
      ></DoughnutChartVue> 
    </div>
  </div>
</template>
<style lang="scss">
  .chart {
    display: flex;
    gap: 1rem;
    div {
      position: relative;
      width: 100%;
    }
  }
</style>