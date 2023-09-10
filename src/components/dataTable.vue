<script lang="ts" setup>
import { computed, ref } from 'vue'
import type { DataTable } from '@/types/data_table'
import type { PropType } from 'vue'

import PercentWithIcon from '@/components/percentWithIcon.vue'

const props = defineProps({
  data: {
    type: Object as PropType<DataTable>,
    required: true
  }
})

const tableData = computed(() => {
  const result = {
    title: props.data.title,
    columns: props.data.columns,
    rows: props.data.rows.map(x => {
      return Array.from(props.data.columns, c => {
        return {
          ...x[c.key],
          component: c.component == 'PercentWithIcon' ? PercentWithIcon : null,
        }
      })
    })
  }
  if (sortBy.value) {
    const index = result.columns.findIndex(x => x.key == sortBy.value)
    result.rows.sort((a, b) => a[index].text[0] > b[index].text[0] ? -1 : 1)
  }
  return result
})

const sortTarget = computed(() => {
  return tableData.value.columns.reduce((a, c) => {
    if (c.sortable) a.push({ key: c.key, title: c.title})
    return a
  }, [] as Array<{key: string, title: string|undefined}>)
})

const sortBy = ref('')

</script>
<template>
  <div class="data-table">
    <section>
      <h2>{{ tableData.title }}</h2>
      <select
        v-model="sortBy"
      >
        <option value="">정렬</option>
        <option
          v-for="option in sortTarget"
          :key="option.key"
          :value="option.key"
        >{{ option.title ? option.title : option.key }}</option>
      </select>
    </section>
    <table>
      <thead>
        <tr>
          <th
            v-for="column in tableData.columns"
            :key="column.key"
          >{{ column.title }}</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(row, i) in tableData.rows"
          :key="i"
        >
          <td
            v-for="(item, j) in row"
            :key="j"
          >
            <!-- 이미지는 figure로 출력 text는 가장 처음만 P 이후는 small로 출력 -->
            <figure v-if="item.image">
              <img :src="item.image"/>
              <figcaption>
                <component
                  v-for="(text, k) in item.text"
                  :key="k"
                  :is="k == 0 ? 'p' : 'small'"
                >{{ text }}</component>
              </figcaption>
            </figure>
            <!-- 텍스트가 1개이고 컴포넌트가 명시되어 있으면 컴포넌트로 출력 -->
            <div
              v-else-if="item.text.length == 1 && item.component"
            >
              <component
                :is="item.component"
                :percent="Number(item.text[0])"
                :toFixed="1"
              />
            </div>
            <div v-else>
              <component
                v-for="(text, k) in item.text"
                :key="k"
                :is="k == 0 ? 'p' : 'small'"
              >{{ text }}</component>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<style lang="scss">
  .data-table {
    width:800px;
    max-height: 500px;
    overflow: auto;
    position: relative;
    section {
      display: flex;
      padding: 1rem;
      justify-content: space-between;
      align-items: center;
      h2 {
        font-size: 1.5rem;
      }
      select {
        padding: 0.25rem;
      }
    }

    table {
      width:100%;
      thead {
        tr {
          th {
            padding: 1rem;
            background: #ccc;
            position: sticky;
            top: 0;
          }
        }
      }

      tbody {
        tr {
          td {
            padding: 1rem;
            border-bottom: 1px solid #ccc;
            vertical-align: middle;
            figure {
              display: flex;
              gap: 1rem;
              align-items: center;
              img {
                max-width: 2.5rem;
                border-radius: 50%;
              }
            }
            p {
              font-size: 1.125rem;
            }
          }
        }
      }
    }
  }
</style>