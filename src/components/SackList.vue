<template>
    <div class="sack-list">
        <FeedRecents />
    </div>
</template>

<script>
import FeedRecents from '@/components/FeedRecents.vue';
// import FeedArchive from '@/components/FeedArchive.vue';

export default {
    name: "SackList",
    components: {
        FeedRecents,
        // FeedArchive
    },
    data () {
        return {

        }
    }
}
</script>