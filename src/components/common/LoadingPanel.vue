<template>
    <DxLoadPanel
        :position="{ of: position }"
        :visible="visible"
        :show-indicator="true"
        :show-pane="true"
        :shading="true"
        :message="message"
        :hide-on-outside-click="hideOnOutsideClick"
        shading-color="rgba(0,0,0,0.4)"
    />
</template>
<script>
import { DxLoadPanel } from 'devextreme-vue/load-panel';
export default {
    components: {
        DxLoadPanel
    },
    props: {
        position: {
            type: String,
            default: 'body'
        },
        visible: {
            type: Boolean,
            default: false
        },
        message: {
            type: String,
            default: 'Đang tải'
        },
        hideOnOutsideClick: {
            type: Boolean,
            default: false
        }
    }
}
</script>
