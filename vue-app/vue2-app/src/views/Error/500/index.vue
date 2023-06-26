<template>
    <div>
        <el-result icon="info" title="500" subTitle="Server Error">
            <template slot="extra">
                <el-link type="primary" size="medium" href="/">返回首页</el-link>
            </template>
        </el-result>
    </div>
</template>
<script>
export default {
    hidden: true,
    name: 'Error500'
}
</script>
