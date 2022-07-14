<template>
    <nav>
        <router-link to="/">home</router-link>
        |
        <router-link to="/about">about</router-link>
        |
        <router-link to="/wei-tool">wei-tool</router-link>
        |
        <router-link to="/pinia">pinia</router-link>
    </nav>
    <hr />
    <router-view />
    <div id="vueApp">
        <div>...</div>
    </div>

</template>

<style lang="scss">
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

nav {
    padding: 30px;
    a {
        font-weight: bold;
        color: #2c3e50;

        &.router-link-exact-active {
            color: #42b983;
        }
    }
}
</style>
