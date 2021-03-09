<template>
    <div class="recent-items">
        <div v-for="episode in items" v-bind:key="episode" class="card">
            <h3 class="title">{{ episode.title }}</h3>
            <router-link :to="{ name: 'details', params: { episodeId: episode.enclosure.guid }}">give link</router-link>
            <p class="pubdate">{{ formatDate(episode.pubDate) }}</p>
            <p class="desc">{{ episode.description }}</p>
            <AudioPlayer 
                :url="episode.enclosure.link" 
                :type="episode.enclosure.type"
                :objectid="episode.enclosure.guid"
            />
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import moment from 'moment';
import AudioPlayer from '@/components/AudioPlayer.vue';

const feedParser = "https://api.rss2json.com/v1/api.json";

export default {
    name: "Recents",
    components: {
        AudioPlayer
    },
    data () {
        return {
            title: "Recents",
            items: [],
            feedUrl: "http://feeds.frogpants.com/filmsack_feed.xml"
        }
    },
    methods: {
        formatDate(date) {
            return moment(date).format('MMMM Do YYYY');
        }
    },
    mounted() {
        axios.get(feedParser, {
            params: {
                rss_url: this.feedUrl,
                api_key: 'pwgv1pkesdnf8nxq84azuasbprpspqbccbiqqhd4',
                count: 1000,
            }
        })
        .then(response => {
            this.items = response.data.items;
        });
    }
}
</script>