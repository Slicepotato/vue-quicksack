<template>
    <div>
        <pre>{{ $route.params.title }}</pre>
        <AudioPlayer 
            :url="$route.params.url" 
            :type="$route.params.type"
            :objectid="$route.params.objectid"
        />
    </div>
</template>

<script>
import AudioPlayer from '@/components/AudioPlayer.vue';

export default {
    props: ["details"],
    components: {
        AudioPlayer
    },
    data() {

    }
}
</script>