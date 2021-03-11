<template>
    <div>
        <div v-for="episode in resultQuery" v-bind:key="episode" class="card">
            <h3 class="ep-number">
                <button @click="copyToClipboard($route.path)" class="copy-link">
                    <fa :icon="['fas', 'link']" />
                </button>
                <span>{{episodeNumber(episode.title)}}</span>
            </h3>
            <h3 class="title">{{ formatTitle(episode.title) }}</h3>
            <p class="pubdate">{{ formatDate(episode.pubdate) }}</p>
            <p class="desc">{{ episode.description }}</p>
            <AudioPlayer 
                :url="episode.enclosure.link" 
                :type="episode.enclosure.type"
                :objectid="episode.guid"
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
    props: {
    },
    components: {
        AudioPlayer
    },
    data() {
        return {
            searchQuery: this.$route.params.episodeId,
            items: [],
            recents: {
                title: "Recents",
                items: [],
                feedUrl: "http://feeds.frogpants.com/filmsack_feed.xml"
            },
            archive: {
                title: "Archive",
                items: [],
                feedUrl: "http://feeds.frogpants.com/filmsack_feed_old.xml"
            },
        }
    },
    mounted: function() {
        axios.all([
            this.recentFeed(),
            this.archiveFeed()
        ])
        .then(axios.spread((recent, archive) => {
            this.recents.items = recent.data.items;
            this.archive.items = archive.data.items;
            this.items = recent.data.items.concat(archive.data.items);
        }))

        // console.log(this.$router.currentRoute._value.params.episodeId);
    },
    computed: {
        resultQuery(){
            let found = this.items.filter((item)=>{
                return this.formatLink(item.title) == this.searchQuery;
            })
            console.log(found)
            return found;
        },
    },
    methods: {
        formatDate(date) {
            return moment(date).format('MMMM Do YYYY');
        },
        formatLink(episode) {
            if (episode.indexOf(':') !== -1) {
                let title = episode.split(':')[1];
                title = title.replace(/[^\w\s]/gi, '')
                title = title.trim();
                title = title.replace(/\s+/g, '-').toLowerCase();
                
                return title;
            } else {
                let title = episode.replace(/[^\w\s]/gi, '')
                title = title.trim();
                title = title.replace(/\s+/g, '-').toLowerCase();

                return title;
            }
        },
        episodeNumber(title) {
            if(title.substring(0, title.indexOf(":"))){
                let epNum = title.substring(0, title.indexOf(":"));
                let episodeNumber = epNum.replace(/\D/g, "");
                episodeNumber = episodeNumber.substring(0, 3);

                return '#' + episodeNumber;
            } else {
                return 'Special'
            }
        },
        formatTitle(title) {
            if (title.indexOf(':') !== -1) {
                let prettyName = title.split(':')[1];
                prettyName = prettyName.trim();
                
                return prettyName;
            } else {
                return title;
            }
        },
        async copyToClipboard(route) {
            let link = window.location.origin + route;
            await navigator.clipboard.writeText(link);
            alert(link + ' copied!');
        },
        recentFeed() {
            return axios.get(feedParser, {
                params: {
                    rss_url: this.recents.feedUrl,
                    api_key: 'pwgv1pkesdnf8nxq84azuasbprpspqbccbiqqhd4',
                    count: 1000,
                }
            })
        },
        archiveFeed() {
            return axios.get(feedParser, {
                params: {
                    rss_url: this.archive.feedUrl,
                    api_key: 'pwgv1pkesdnf8nxq84azuasbprpspqbccbiqqhd4',
                    count: 1000,
                }
            })
        },
    }
}
</script>
<style lang="scss" scoped>
.ep-number {
    justify-content: flex-end;
}
</style>