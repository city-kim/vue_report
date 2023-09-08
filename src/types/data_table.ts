interface TableItem {
  image?: string
  component?: string
  text: Array<string|number>
}

interface TableRow {
  [key: string]: TableItem
}

interface TableColumn {
  key: string
  title?: string
  component?: string
  sortable?: boolean
}

interface DataTable {
  title: string
  columns: Array<TableColumn>
  rows: Array<TableRow>
}

export type {
  DataTable
}