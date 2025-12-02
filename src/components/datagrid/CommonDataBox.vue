<template>
    <div class="box report-box common-data-box">
        <DxScrollView direction="horizontal" show-scrollbar="onHover" v-if="showHeader">
            <div class="box-header with-border" >
                    <slot name="header"></slot>
            </div>
        </DxScrollView>
        <div class="table-responsive">
            <DxDataGrid
                ref="table"
                id="dataGrid"
                :key="tableKey"
                @initialized="saveGridInstance"
                :data-source="dataSource"
                :key-expr="keyExpr"
                :row-alternation-enabled="rowAlternationEnabled"
                :allow-column-reordering="$suiteStored.isMobile ? false : allowColumnReordering"
                :allow-column-resizing="$suiteStored.isMobile ? false : allowColumnResizing"
                :column-auto-width="columnAutoWidth"
                :show-borders="showBorders"
                :loadPanel="loadPanel"
                :onContentReady="onContentReady"
                :focusedRowEnabled="allowFocusRow"
                :remoteOperations="true"
                :cacheEnabled="false"
                :hoverStateEnabled="true"
                @selectionChanged="selectionChanged"
                @rowDblClick="onRowClicked"
                @rowClick="onRowSelected"
                @cellClick="onCellClick"
                @optionChanged="onOptionChanged"
                @rowPrepared="onRowPrepared"
                @cellPrepared="onCellPrepared"
                @rowUpdating="onRowUpdating"
                @exporting="onExporting"
                :height="tableHeight"
                :onRowValidating="onRowValidating"
                :onEditorPreparing="onEditorPreparing"
            >
                <DxPaging :page-size="pageSize"/>
                <DxColumnFixing :enabled="allowColumnFixed" />
                <DxPager
                    v-if="showPager"
                    :visible="true"
                    :allowed-page-sizes="tablePageSizeAllows"
                    :show-page-size-selector="true"
                    :show-info="true"
                    :show-navigation-buttons="true"
                />
                <DxSelection
                    :fixed="false"
                    v-if="(showTableSelection || showTableMasterDetail)"
                    :mode="tableMultiSelection ? 'multiple' : 'single'"
                    showCheckBoxesMode="always"

                />
                <DxFilterRow
                    v-if="showTableFilters"
                    :visible="true"
                />
                <DxEditing
                    v-if="allowRowEditing"
                    :allow-updating="true"
                    :allow-deleting="allowRowDeleting"
                    :allow-adding="false"
                    :confirmDelete="false"
                    mode="cell"
                />
                <slot name="columns"></slot>
                <template v-for="slot in templates" v-slot:[slot]="{ data }">
                    <slot :name="slot" v-bind:data="data" />
                </template>
                <DxMasterDetail
                    :enabled="false"
                    template="masterDetailTemplate"
                />
                <template #masterDetailTemplate="{ data: row }">
                    <slot name="masterDetail" :slotData="row" />
                </template>
                <DxExport
                    :enabled="allowExport"
                />
            </DxDataGrid>
        </div>
        <div class="box-footer with-border-top b-row" v-if="showFooter">
        </div>
    </div>
</template>
<script>
import viMessages from "devextreme/localization/messages/vi.json";
import { locale, loadMessages } from "devextreme/localization";
import {
  DxDataGrid,
  DxRemoteOperations,
  DxColumn,
  DxColumnChooser,
  DxColumnFixing,
  DxPager,
  DxPaging,
  DxFilterRow,
  DxSelection,
  DxMasterDetail,
  DxEditing,
  DxSummary,
  DxTotalItem,
  DxExport
} from 'devextreme-vue/data-grid';
import { exportDataGrid } from 'devextreme/excel_exporter';
import { Workbook } from 'exceljs';
import saveAs from 'file-saver';

export default {
    props: {
        showHeader: {
            type: Boolean,
            default: true
        },
        showFooter: {
            type: Boolean,
            default: true
        },
        dataSource: {
            type: Array | Object,
            default: () => []
        },
        keyExpr: {
            type: String,
            default: 'id'
        },
        rowAlternationEnabled: {
            type: Boolean,
            default: true
        },
        allowColumnReordering: {
            type: Boolean,
            default: true
        },
        allowColumnResizing: {
            type: Boolean,
            default: true
        },
        allowColumnFixed: {
            type: Boolean,
            default: false
        },
        allowRowEditing: {
            type: Boolean,
            default: false
        },
        allowRowDeleting: {
            type: Boolean,
            default: false
        },
        columnAutoWidth: {
            type: Boolean,
            default: true
        },
        showBorders: {
            type: Boolean,
            default: false
        },
        loadPanel: {
            type: Object,
            default: () => {
                return {
                    enabled: true,
                    text: 'Đang tải dữ liệu...'
                }
            }
        },
        showTableSelection: {
            type: Boolean,
            default: true
        },
        tableMultiSelection: {
            type: Boolean,
            default: false
        },
        showTableFilters: {
            type: Boolean,
            default: true
        },
        showPager: {
            type: Boolean,
            default: true
        },
        tablePagination: {
            type: Object,
            default: () => {
                return {
                    current_page: 1,
                    per_page: 25,
                    total: 0
                }
            }
        },
        showTableMasterDetail: {
            type: Boolean,
            default: false
        },
        pageSize: {
            type: Number,
            default: 25
        },
        tablePageSizeAllows : {
            type: Array,
            default: () => [25, 50, 100]
        },
        dataLoading: {
            type: Boolean,
            default: false
        },
        tableHeight: {
            type: String,
            default: '100%'
        },
        onRowValidating: {
            type: Function,
            default: () => {}
        },
        onEditorPreparing: {
            type: Function,
            default: () => {}
        },
        initFunction: {
            type: Function,
            default: () => {}
        },
        allowFocusRow: {
            type: Boolean,
            default: true
        },
        allowExport: {
            type: Boolean,
            default: false
        },
        /**
         * Cho phép customize export bao gồm:
         * {
         * @var string fileName
         * @var string storeName
         * @var string title
         * @var string subTitle
         * @var number columnCount
         * @var boolean borderAll
         * }
         */
        exportCustomize: {
            type: Object,
            default: () => {}
        }
    },
    components: {
        DxDataGrid,
        DxRemoteOperations,
        DxColumn,
        DxColumnChooser,
        DxColumnFixing,
        DxPager,
        DxPaging,
        DxEditing,
        DxFilterRow,
        DxSelection,
        DxMasterDetail,
        DxSummary,
        DxTotalItem,
        DxExport
    },
    data() {
        return {
            tableKey: null,
            templates: [],
            currentFilter: null,
        }
    },

    created() {
        loadMessages(viMessages);
        locale(navigator.language);
        this.tableKey = Math.random().toString(36).substring(2, 15)
    },

    computed: {
        table() {
            return this.$refs['table'].instance;
        },

        tableColumns() {
            return this.table.getVisibleColumns().map((column) => {
                return column.dataField;
            });
        },
    },

    methods: {
        saveGridInstance(e) {
            // Lấy template của các column
            let columns = e.component.option("columns")
            if (columns && columns.length) {
                this.templates = columns
                    .filter((res) => res.cellTemplate)
                    .map((ele) => ele.cellTemplate);
            }

        },

        onPageChange(page) {
            this.$emit('pageChange', page)
        },

        handleSizeChange(val) {
            this.$emit('sizeChange', val)
        },

        onContentReady(e) {
            let filters = this.table.getCombinedFilter(true) || null
            const allColumns = Array.from(Array(this.table.columnCount()).keys()).map(index => this.table.columnOption(index));
            let sortedColumn =  allColumns.find(col => col.sortIndex != null);
            this.$emit('filterChange', {
                filters: filters,
                sortedColumn: sortedColumn ? {
                    dataField: sortedColumn.dataField,
                    sortOrder: sortedColumn.sortOrder
                } : null
            })

            if (this.initFunction) {
                this.initFunction(e)
            }
        },

        selectionChanged(e) {
            if (this.showTableMasterDetail) {
                setTimeout(() => {
                    e.component.collapseAll(-1);
                    if (e.currentSelectedRowKeys.length) {
                        e.component.expandRow(e.currentSelectedRowKeys[0]);
                    }
                }, 50);
            }
            this.$emit('rowSelected', e.selectedRowsData)
        },

        onRowClicked(e) {
            this.$emit('rowClicked', e.data)
        },

        onRowSelected(e) {
            if (this.showTableMasterDetail) {
                /* Nếu click target parent và row đã select thì deselect */
                let targetNames = ['dx-row-focused', 'dx-selection']
                let isContain = targetNames.every((targetName) => e.event.target.parentElement.classList.contains(targetName))
                // if parent has class dx-row-focused and dx-selection
                if (isContain) {
                    if (e.isExpanded) {
                        e.component.collapseAll(-1);
                        /** Unfocus */
                        this.table.clearSelection()
                        this.table.option("focusedRowIndex", -1);
                    } else {
                        e.component.collapseAll(-1);
                        e.component.expandRow(e.key);
                    }
                }
            }
            this.$emit('rowTouched', e.data)
        },

        onCellClick(e) {
            // if (e.row && e.row.isSelected) {
            //     this.table.deselectAll()
            //     e.component.option("focusedRowIndex", -1);
            // }
        },

        onOptionChanged(e) {
            /* Click lần thứ 3 sẽ xoá filter */
            if(e.fullName.includes("sortOrder")) {
                let startIdx = e.fullName.indexOf('[') +1,
                    endIdx = e.fullName.indexOf(']');

                let idx = parseInt(e.fullName.slice(startIdx,endIdx));
                if(e.previousValue === "desc") {
                    e.component.columnOption(idx, "sortOrder", undefined);
                }
            }
        },

        onRowUpdating(e) {
            this.$emit('rowUpdating', e)
        },

        refresh() {
            this.table.refresh();
        },

        onClickDeleteRows() {
            this.table.cancelEditData()
            let items = this.table.getVisibleRows()
            if (!items.length) return
            let selectedItems = items.filter(item => item.isSelected)
            if (selectedItems.length) {
                selectedItems.forEach(item => {
                    let index = this.table.getRowIndexByKey(item.key)
                    this.table.deleteRow(index)
                })

            } else {
                let index = this.table.totalCount() - 1
                this.table.deleteRow(index)
            }
        },

        onRowPrepared(e) {
            this.$emit('rowPrepared', e)
        },

        onCellPrepared(e) {
            this.$emit('cellPrepared', e)
        },

        onExporting(e) {
            if (this.exportCustomize) {
                const workbook = new Workbook();
                const worksheet = workbook.addWorksheet('Sheet 1');
                let customize = this.exportCustomize;
                let totalCol = customize.columnCount || this.tableColumns.length;
                let fileName = customize.fileName || 'export.xlsx';
                exportDataGrid({
                    component: e.component,
                    worksheet,
                    topLeftCell: { row: 4, column: 1 },
                }).then((cellRange) => {
                    if (customize.storeName) {
                        const storeNameRow = worksheet.getRow(1);
                        storeNameRow.height = 20;
                        worksheet.mergeCells(1, 1, 1, totalCol);
                        storeNameRow.getCell(1).value = customize.storeName;
                        storeNameRow.getCell(1).font = { size: 16 };
                        storeNameRow.getCell(1).alignment = { horizontal: 'center' };
                    }
                    if (customize.title) {
                        const headerRow = worksheet.getRow(2);
                        headerRow.height = 30;
                        worksheet.mergeCells(2, 1, 2, totalCol);
                        headerRow.getCell(1).value = customize.title;
                        headerRow.getCell(1).font = { size: 22 };
                        headerRow.getCell(1).alignment = { horizontal: 'center' };
                    }
                    if (customize.subTitle) {
                        const subHeaderRow = worksheet.getRow(3);
                        subHeaderRow.height = 20;
                        worksheet.mergeCells(3, 1, 3, totalCol);
                        subHeaderRow.getCell(1).value = customize.subTitle;
                        subHeaderRow.getCell(1).font = { italic: true };
                        subHeaderRow.getCell(1).alignment = { horizontal: 'center' };
                    }
                }).then(() => {
                    if (customize.borderAll) {
                        const borderStyle = { style: 'thin', color: { argb: '000000' } };
                        worksheet.eachRow((row) => {
                            row.eachCell((cell) => {
                                cell.border = {
                                    top: borderStyle,
                                    left: borderStyle,
                                    bottom: borderStyle,
                                    right: borderStyle,
                                };
                            });
                        });
                    }
                    workbook.xlsx.writeBuffer().then((buffer) => {
                    saveAs(new Blob([buffer], { type: 'application/octet-stream' }), fileName);
                    });
                });
                e.cancel = true;
            }
            this.$emit('exporting', e)
        }
    },

    watch: {
        dataLoading(val) {
            if (val) {
                this.table.beginCustomLoading('Đang tải dữ liệu...');
            } else {
                this.table.endCustomLoading();
            }
        }
    }
}
</script>
<style lang="scss">
.common-data-box {
    border-radius: 5px;
    min-height: 200px;
    .box-header {
        padding: 8px 10px !important;
        width: 100%;
        white-space: nowrap;
        button {
            i {
                margin-right: 2px;
            }
        }
    }
    .box-footer {
        width: 100%;
        overflow: hidden;
    }
}
#dataGrid {
    .dx-datagrid-rowsview
    .dx-master-detail-row>.dx-master-detail-cell {
        padding: 0;
    }
    .icon-tick {
        font-size: 18px;
        text-align: center;
        &.ticked {
            color: #28a745;
        }
        &.no-tick {
            color: #f4273b;
        }
    }
    .dx-datagrid-header-panel {
        display: none !important;
    }
}
.dx-widget {
    font-family: 'Cimi' !important;
    letter-spacing: -0.6px;
}
.dx-pager {
    padding: 10px !important;
    .dx-navigate-button {
        height: 28px;
        line-height: 25px;
        padding: 0 10px;
    }
    .dx-page,
    .dx-page-size  {
        padding: 0 4px !important;
        background: #FFF;
        font-size: 13px;
        font-weight: bold;
        min-width: 32px;
        height: 28px;
        line-height: 26px;
        box-sizing: border-box;
        text-align: center;
        &.dx-selection {
            background-color: #409EFF;
            color: #FFF;
        }
    }
}
.dx-page-sizes {
    .dx-page-size  {
        padding: 0 4px !important;
        background: #FFF;
        font-size: 13px;
        font-weight: bold;
        min-width: 32px;
        height: 28px;
        line-height: 26px;
        text-align: center;
        &.dx-selection {
            background-color: #409EFF;
            color: #FFF;
        }
    }
}

</style>
