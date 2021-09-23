<template>
    <div class="list">
        <h3><code>$set使用</code></h3>
        <hr>

        <div v-for="(item, index) in list" :key="index" class="list-item">
            <h3><span v-if="item.price">$:{{ item.price }} </span>
                {{ item.name }} <i>{{ item.count }}</i>
                <a class="add-btn" v-on:click.prevent="check(index)">添加</a>
                <a class="add-btn" v-on:click.prevent="checkDetail">详情</a>
            </h3>
        </div>

        <div>
            <ul>
                <li v-for="(item, index) in items" :key="index * 2" v-on:click="handleClick(index)">
                    {{ item }}
                </li>
            </ul>
        </div>

        <hr>

        <div>
            <input id="file" placeholder="点击上传" type="file" @change="handleUploadFile">
        </div>
    </div>
</template>
<script>
import axios from 'axios';

const instance = axios.create({
    withCredentials: false
});
export default {
    name: "List",
    props: {
        msg: String
    },
    data() {
        return {
            items: [1, 10, 20],
            list: [
                {
                    id: 10001,
                    count: 1,
                    name: 'item1'
                },
                {
                    id: 10002,
                    count: 100,
                    name: 'item1'
                },
                {
                    id: 10003,
                    count: 1000,
                    name: 'item1'
                }
            ]
        }
    },
    activated() {
        console.log('activated');
    },
    created() {
        console.log('created');
    },
    mounted() {
        console.log('mount');
        // axios({
        //     url: 'http://192.168.40.234:3300/api/msg/list',
        //     method: 'get'
        // }).then(res => {
        //     console.log(res);
        // })
    },
    methods: {
        handleUploadFile(e) {
            console.log(e.target.files);
            // const file = e.target.files[0];
            // const data = new FormData();
            // data.append('file', file);
            // console.log(data);
            // axios.defaults.withCredentials = true; // *****必须*****
            // axios({
            //     url: 'http://192.168.40.234:3300/api/common/img/upload',
            //     method: 'post',
            //     data: data
            // }).then(res => {
            //     console.log(res);
            // });
            const file = e.target.files[0];
            if (file) {
                const data = new FormData();
                data.append('file', file);
                instance.post('http://localhost:3300/api/common/imgUpload', data).then(res => {
                    console.log(res);
                }).catch(err => {
                    console.log(err);
                });
            }
        },
        handleClick(index) {
            console.log(index);
            /**
             * 如下：直接修改，视图是不会更新的
             */
            this.items[index] = index + Math.random();

            // 使用Vue.set，
            // this.$set(vm.items, indexOfItem, newValue)
            // this.$set(this.items, index, Math.random());
        },
        checkDetail() {
            console.log('detail');
            this.$router.push({
                path: 'detail'
            });
        },
        check(index) {
            /**
             * 可以更新视图
             * /
             *
             // this.list[index].count++; // 已存在的字段
             /**
             * 如下：直接修改，视图是不会更新的
             */
            // this.list[index].price = index + 100; // 不存在的字段

            /**
             *  不能直接去修改数组的某个项，或者直接删除、添加对象的属性，需要借助$set去实现
             */
            /**
             * 对于数组，Vue 不能检测以下数组的变动：
             * 1. 当你利用索引直接设置一个数组项时，例如：vm.items[indexOfItem] = newValue
             * 2. 当你修改数组的长度时，例如：vm.items.length = newLength
             * /

             // 使用Vue.set，
             // this.$set(vm.items, indexOfItem, newValue)
             // this.$set(this.list, index, {
                 //     id: 10086 + index,
                 //     count: 999,
                 //     name: '$set',
                 //     price: 999 + index
                 // })

             /**
             * 对于对象，Vue 无法检测 property 的添加或移除。
             * 由于 Vue 会在初始化实例时对 property 执行 getter/setter 转化，
             * 所以 property 必须在 data 对象上存在才能让 Vue 将它转换为响应式的。
             */
            // this.$set(object, key, value);
            this.$set(this.list[index], 'price', index + Math.random());
            // console.log(this.$route);
            // console.log(this.$router);
            // this.$router.push({
            //     path: `/List?t=${Date.now()}`
            // });
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
    margin: 40px 0 0;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    display: inline-block;
    margin: 0 10px;
}

a {
}

.add-btn {
    cursor: pointer;
    color: #fff;
    background: #000;
    border-radius: 6px;
    padding: 6px 10px;
    font-size: 14px;
    margin-left: 5px;
}
</style>
