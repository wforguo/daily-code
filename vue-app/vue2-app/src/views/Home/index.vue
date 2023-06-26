<template>
    <div class="home">
        <db-click-input v-model="name" v-show="false" />
        <div style="white-space: pre-line; word-break: break-word">
            {{ name }}
        </div>
        <!--热力图容器-->
        <div id="heatMap" style="width: 100%; height: 720px"></div>
    </div>
</template>

<script>
import DbClickInput from '@/components/DbClickInput'
import Heatmap from 'heatmap.js'

export default {
    title: '首页',
    name: 'Home',
    computed: {},
    data() {
        return {
            name: 'www'
        }
    },
    components: {
        DbClickInput
    },
    mounted() {
        var heatmap = Heatmap.create({
            container: document.getElementById('heatMap'),
            // backgroundColor: 'red',
            radius: 20,
            maxOpacity: 0.9,
            minOpacity: 0.7
        })

        var points = []
        var width = 600
        var height = 400
        var max = 100

        // 热力图经纬度范围
        var latMin = 28.364807
        var latMax = 40.251095
        var lonMin = 94.389228
        var lonMax = 108.666357

        // 根据热力图图片范围，生成随机热力点和强度值
        for (var i = 0; i < 300; i++) {
            var lon = lonMin + Math.random() * (lonMax - lonMin)
            var lat = latMin + Math.random() * (latMax - latMin)
            var value = Math.floor(Math.random() * max)
            var point = {
                x: Math.floor(((lat - latMin) / (latMax - latMin)) * width),
                y: Math.floor(((lon - lonMin) / (lonMax - lonMin)) * height),
                value: value
            }
            points.push(point)
        }

        heatmap.setData({
            max: max,
            data: points
        })
    }
}
</script>
<style scoped lang="scss">
.home {
}
</style>
