import Vue from "vue";
import {
    DxForm,
    DxItem,
    DxLabel,
    DxGroupItem,
    DxRequiredRule,
    DxButtonItem,
    DxButtonOptions,
    DxEmailRule,
    DxAsyncRule,
    DxCompareRule,
    DxSimpleItem,
} from "devextreme-vue/form";
import { DxButton } from "devextreme-vue/button";
import DxSelectBox from "devextreme-vue/select-box";
import { DxSwitch } from "devextreme-vue/switch";
import { DxNumberBox } from "devextreme-vue/number-box";
import { DxValidator, DxPatternRule, DxCustomRule } from "devextreme-vue/validator";
import { DxCheckBox } from "devextreme-vue/check-box";
import { DxRadioGroup } from "devextreme-vue/radio-group";
import { DxColumn, DxLookup } from "devextreme-vue/data-grid";
import DxTagBox from 'devextreme-vue/tag-box';
import DxTextArea from 'devextreme-vue/text-area';
import CustomStore from "devextreme/data/custom_store";
import { DxRowDragging } from 'devextreme-vue/data-grid';
import { DxScrollView } from 'devextreme-vue/scroll-view';
import CommonDataBox from "@/components/datagrid/CommonDataBox.vue";
import LoadingPanel from "@/components/common/LoadingPanel.vue";

Vue.component("DxForm", DxForm);
Vue.component("DxItem", DxItem);
Vue.component("DxLabel", DxLabel);
Vue.component("DxGroupItem", DxGroupItem);
Vue.component("DxRequiredRule", DxRequiredRule);
Vue.component("DxCompareRule", DxCompareRule);
Vue.component("DxButtonItem", DxButtonItem);
Vue.component("DxButtonOptions", DxButtonOptions);
Vue.component("DxEmailRule", DxEmailRule);
Vue.component("DxAsyncRule", DxAsyncRule);
Vue.component("DxSimpleItem", DxSimpleItem);
Vue.component("DxButton", DxButton);
Vue.component("DxSelectBox", DxSelectBox);
Vue.component("DxSwitch", DxSwitch);
Vue.component("DxNumberBox", DxNumberBox);
Vue.component("DxValidator", DxValidator);
Vue.component("DxPatternRule", DxPatternRule);
Vue.component("DxCustomRule", DxCustomRule);
Vue.component("DxCheckBox", DxCheckBox);
Vue.component("DxRadioGroup", DxRadioGroup);
Vue.component("DxColumn", DxColumn);
Vue.component("DxLookup", DxLookup);
Vue.component("DxTextArea", DxTextArea);
Vue.component("DxTagBox", DxTagBox);
Vue.component("DxRowDragging", DxRowDragging);
Vue.component("DxScrollView", DxScrollView);
Vue.component("CommonDataBox", CommonDataBox);
Vue.component("LoadingPanel", LoadingPanel);

// CustomStore
Vue.prototype.$DxCustomStore = CustomStore;
