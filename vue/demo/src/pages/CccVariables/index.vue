<template>
    <div class="page variable">

        <h3 style="margin: 15px 0;">CssVariables</h3>

        <hr />

        <div class="font__big">默认继承父元素color</div>
        <hr />

        <div class="font__big variables">使用CssVariables自定义变量</div>
        <hr />

        <div class="font__big variables__invalid">
            无效的自定义属性值
            <h5 style="font-size: 14px;">
                它并不会被忽略，从而会导致该值被覆盖为默认值
            </h5>
        </div>
        <hr />

        <div class="font__big color__invalid">
            无效的css原生属性值
            <h5 style="font-size: 14px;">
                当CSS属性-值对中存在语法错误，该行则会被忽略。
            </h5>
        </div>
        <hr />

    </div>

</template>

<script>
export default {
    name: "CssVariables",
    data () {
        return {

        }
    }
}
</script>

<style lang="less">
.font {
    &__big {
        padding: 5px 0;
        margin: 10px 0;
        font-size: 40px;
    }
}
.variable {
    color: #333;
    font-size: 18px;
    font-weight: bold;
    .variables {
        color: var(--primary-text-color);
    }
    .variables__invalid {
        // 如果自定义属性的值无效，它并不会被忽略，从而会导致该值被覆盖为默认值。
        // 如果父元素没有设置color，将该值设置为它的默认初始值,color 为浏览器默认值 #000
        font-size: var(--primary-text-color);
    }
    .color__invalid {
        // 当CSS属性-值对中存在语法错误，该行则会被忽略。
        font-size: '#666';
    }
}
</style>
