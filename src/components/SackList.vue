<template>
    <div class="sack-list">
        <FeedRecents />
        <FeedArchive />
    </div>
</template>

<script>
import FeedRecents from '@/components/FeedRecents.vue';
import FeedArchive from '@/components/FeedArchive.vue';

export default {
    name: "SackList",
    components: {
        FeedRecents,
        FeedArchive
    },
    data () {
        return {

        }
    }
}
</script>
<style lang="scss">
@import '@/assets/scss/utility/variables';

.card {
    padding: 1em;
    margin-bottom: 2em;
    border: 1px solid $blk;
}
</style>