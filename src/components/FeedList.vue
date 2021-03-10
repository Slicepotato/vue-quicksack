<template>
    <div class="feed">
        <div class="search-wrapper panel-heading col-sm-12">
            <input class="form-control" type="text" v-model="searchQuery" placeholder="Search" />
        </div>  
        <div class="recent-items">
            <div v-for="episode in resultQuery" v-bind:key="episode" class="card">
                <h3>{{episodeNumber(episode.title)}}</h3>
                <h3 class="title">{{ formatTitle(episode.title) }}</h3>
                <router-link :to="{ 
                    name: 'Details', 
                    params: { 
                        episodeId: formatLink(episode.title),
                        title: formatTitle(episode.title),
                        epNum: episodeNumber(episode.title),
                        pubdate: formatDate(episode.pubDate),
                        desc: episode.description,
                        url: episode.enclosure.link,
                        type: episode.enclosure.type,
                        objectid: episode.enclosure.guid,
                    }}">give link</router-link>
                <p class="pubdate">{{ formatDate(episode.pubDate) }}</p>
                <p class="desc">{{ episode.description }}</p>
                <AudioPlayer 
                    :url="episode.enclosure.link" 
                    :type="episode.enclosure.type"
                    :objectid="episode.enclosure.guid"
                />
            </div>
        </div>  
    </div>
</template>

<script>
import axios from 'axios';
import moment from 'moment';
import AudioPlayer from '@/components/AudioPlayer.vue';

const feedParser = "https://api.rss2json.com/v1/api.json";

export default {
    name: "Episode List",
    components: {
        AudioPlayer
    },
    data () {
        return {
            searchQuery: null,
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
            }
        },
        episodeNumber(title) {
            let epNum = title.substring(0, title.indexOf(":"));
            let episodeNumber = epNum.replace(/\D/g, "");
            episodeNumber = episodeNumber.substring(0, 3);

            return episodeNumber;
        },
        formatTitle(title) {
            if (title.indexOf(':') !== -1) {
                let prettyName = title.split(':')[1];
                prettyName = prettyName.trim();
                
                return prettyName;
            }
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
        }
    },
    mounted() {
        axios.all([
            this.recentFeed(),
            this.archiveFeed()
        ])
        .then(axios.spread((recent, archive) => {
            this.recents.items = recent.data.items;
            this.archive.items = archive.data.items;
            this.items = recent.data.items.concat(archive.data.items);
        }))
    },
    computed: {
        resultQuery(){
            if(this.searchQuery){
            return this.items.filter((item)=>{
                return this.searchQuery.toLowerCase().split(' ').every(v => item.title.toLowerCase().includes(v))
            })
            } else{
                return this.items;
            }
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