<template>
    <div class="sack-list">
        <h2>{{ name }}</h2>
        <FeedRecents />
        <FeedArchive />
    </div>
</template>

<script>
import FeedRecents from './FeedRecents.vue';
import FeedArchive from './FeedArchive.vue';

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