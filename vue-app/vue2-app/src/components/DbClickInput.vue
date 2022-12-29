<!--
 * @Name: DbClickInput.vue
 * @Author: forguo
 * @Description: 双击编辑
-->
<template>
    <div
        ref="inputRef"
        class="db-click-input"
        :class="{ editable: editable }"
        :contenteditable="editable"
        :placeholder="placeholder"
        @keydown.13="keyDown($event)"
        @dblclick="handleEdit"
        @blur="handleSave"
        @input="handleInput"
    ></div>
</template>

<script>
export default {
    name: 'DbClickInput',
    props: {
        placeholder: {
            type: String,
            default: ''
        },
        // 是否禁用
        disabled: {
            type: Boolean,
            default: false
        },
        // 禁止换行
        nowrap: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            // 可编辑
            editable: false
        }
    },
    created() {
        this.$nextTick(() => {
            this.$el.innerHTML = this.$attrs.value
        })
    },
    methods: {
        // 编辑
        handleEdit() {
            if (this.disabled) {
                return
            }
            this.editable = true
            this.$nextTick(() => {
                this.$refs.inputRef.focus()
                // 选中要编辑的文字
                if (window.getSelection) {
                    const range = document.createRange()
                    range.selectNodeContents(this.$refs.inputRef)
                    const sel = window.getSelection()
                    sel.removeAllRanges()
                    sel.addRange(range)
                }
            })
        },
        // 保存
        handleSave() {
            this.$emit('onSave', this.$el.innerHTML)
            this.$nextTick(() => {
                // 清空选中的文字
                if (window.getSelection) {
                    const range = document.createRange()
                    range.selectNodeContents(this.$refs.inputRef)
                    const sel = window.getSelection()
                    sel.removeAllRanges()
                }
                this.editable = false
            })
        },
        handleInput() {
            this.$emit('input', this.$el.innerHTML)
        },
        // 回车
        keyDown(e) {
            if (this.nowrap) {
                e.preventDefault()
            }
        }
    }
}
</script>

<style scoped lang="scss">
.db-click-input {
    min-width: 100px;
    min-height: 35px;
    width: auto;
    padding: 8px 12px;
    overflow: auto;
    outline: none;
    user-select: text;
    text-align: left;
    cursor: pointer;
    border: 1px solid #dcdfe6;
    background-color: #fff;
    border-radius: 4px;
    white-space: pre-line;
    word-break: break-all;
    &.editable {
        cursor: text;
    }
}
.db-click-input[contenteditable='true'] {
    user-modify: read-write-plaintext-only; // 纯文本
    -webkit-user-modify: read-write-plaintext-only;
}
.db-click-input[contenteditable='true']:empty:before {
    content: attr(placeholder);
    display: block;
    color: #ccc;
}
</style>
