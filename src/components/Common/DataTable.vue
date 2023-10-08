<script lang="ts" setup>
import { computed } from 'vue'
import { numberExpression } from '@/util/number_converter'

import type { DataTable } from '@/types/components/data_table'
import type { PropType } from 'vue'

import PercentWithIcon from '@/components/Common/PercentWithIcon.vue'

const props = defineProps({
  data: {
    type: Object as PropType<DataTable>,
    required: true
  },
  height: {
    type: String,
    required: false,
    default: '300px'
  },
  sortBy: String
})

const tableData = computed(() => {
  const result = {
    columns: props.data.columns,
    rows: props.data.rows.map(x => (
      Array.from(props.data.columns, c => {
        return {
          ...x[c.key],
          component: c.component == 'PercentWithIcon' ? PercentWithIcon : null,
        }
      })
    ))
  }
  if (props.sortBy) {
    // 정렬이 전달된경우 columns에서 해당 key를 찾아서 정렬
    const index = result.columns.findIndex(x => x.key == props.sortBy)
    if (index) result.rows.sort((a, b) => a[index].text[0] > b[index].text[0] ? -1 : 1)
  }
  return result
})

</script>
<template>
  <div
    class="data-table"
    :style="`max-height: ${height};`"
  >
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
                >
                  {{ text }}
                </component>
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
              >
                {{ typeof text === 'number' ? numberExpression(text) : text }}
              </component>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<style lang="scss">
  .data-table {
    overflow: auto;
    position: relative;
    &::-webkit-scrollbar {
      width: 0.5rem;
    }
    &::-webkit-scrollbar-thumb {
      height: 20%;
      background: var(--c-indigo);
      border-radius: 0.25rem;
    }
    &::-webkit-scrollbar-track {
      background: var(--c-white-mute);
    }

    table {
      width:100%;
      thead {
        tr {
          th {
            padding: 0.5rem;
            background: var(--c-white-mute);
            position: sticky;
            top: 0;
          }
        }
      }

      tbody {
        tr {
          td {
            padding: 0.25rem 0.5rem;
            border-bottom: 1px solid var(--c-white-mute);
            vertical-align: middle;
            figure {
              display: flex;
              gap: 1rem;
              align-items: center;
              img {
                max-width: 2.5rem;
                border-radius: 50%;
              }
              figcaption {
                p {
                  word-break: keep-all;
                }
              }
            }
          }
        }
      }
    }
  }
</style>