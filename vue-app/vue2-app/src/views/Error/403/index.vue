<template>
    <div>
        <el-result icon="info" title="403" subTitle="Page Forbidden">
            <template slot="extra">
                <el-link type="primary" size="medium" href="/">返回首页</el-link>
            </template>
        </el-result>
    </div>
</template>
<script>
export default {
    hidden: true,
    name: 'Error403'
}
</script>
