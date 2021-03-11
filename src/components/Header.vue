<template>
    <header>
        <h1>
            <router-link to="/">FilmSack</router-link>
        </h1>
        <p class="subtitle">/QuickSack</p>
        <p class="site-desc">Looking to see if <b>FilmSack</b> has already covered a film? You can search here to find when they talked about it and listen to the fun.</p>
    </header>
</template>

<script>
export default {
    
}
</script>
<style lang="scss" scoped>
header {
    border-top: 10px solid $blk;
    padding-top: .5rem;
}
.site-desc {
    line-height: 1.25rem;
}
</style>