<template>
    <div class="feed">
        <div class="search-wrapper">
            <label for="episode-search">Search</label>
            <input id="episode-search" class="form-control" type="text" v-model="searchQuery" placeholder="Look up an episode..." />
        </div>  
        <div class="recent-items">
            <div v-for="episode in resultQuery" :key="episode" class="card">
                <h3 class="ep-number">
                    <button @click="copyToClipboard($route.path + formatLink(episode.title))" class="copy-link">
                        <fa :icon="['fas', 'link']" />
                    </button>
                    <span>{{episodeNumber(episode.title)}}</span>
                </h3>
                <h3 class="title">
                    <router-link 
                        class="episode-link" 
                        :to="{ 
                        name: 'Details', 
                        params: { 
                            episodeId: formatLink(episode.title),
                            title: formatTitle(episode.title),
                            epNum: episodeNumber(episode.title),
                            pubdate: formatDate(episode.pubDate),
                            desc: episode.description,
                            url: episode.enclosure.link,
                            type: episode.enclosure.type,
                            objectid: episode.guid,
                        }}">
                        <span>{{ formatTitle(episode.title) }}</span>
                        <fa :icon="['fas', 'external-link-alt']" />
                    </router-link>
                </h3>
                <p class="pubdate">{{ formatDate(episode.pubDate) }}</p>
                <p class="desc">{{ episode.description }}</p>
                <AudioPlayer 
                    :url="episode.enclosure.link" 
                    :type="episode.enclosure.type"
                    :objectid="episode.guid"
                />
            </div>
        </div>  
        <button 
            @click="scrollTop()" 
            id="return" 
            class="scroll-to-top"
            title="Go to top"
            v-show="top"
        >
            <fa :icon="['fas', 'angle-up']" />
        </button>
    </div>
</template>

<script>
import axios from 'axios';
import moment from 'moment';
import AudioPlayer from '@/components/AudioPlayer.vue';

const feedParser = "https://api.rss2json.com/v1/api.json";

const tmdbEntry = "http://api.themoviedb.org/3/search/movie";
const tmdbKey = "67d23767771b66aa28d6965682f3d5f3";

export default {
    name: "Episode List",
    components: {
        AudioPlayer
    },
    data () {
        return {
            searchQuery: null,
            top: false,
            items: [],
            posterImg: [],
            posterPath: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2',
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
        scrollTop() {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            })
        },
        onScroll(e) {
            if (typeof window === 'undefined') return
            const top = window.pageYOffset ||   e.target.scrollTop || 0
            this.top = top > 50
        },
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
            if(title.substring(0, title.indexOf(":"))){
                let epNum = title.substring(0, title.indexOf(":"));
                let episodeNumber = epNum.replace(/\D/g, "");
                episodeNumber = episodeNumber.substring(0, 3);

                if(this.isNumeric(episodeNumber)){
                    return '#' + episodeNumber;
                } else {
                    return 'Special'
                }
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
        isNumeric(n) {
            return !isNaN(parseFloat(n)) && isFinite(n);
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
        fetchPoster(movieTitle, id) {
            axios.get(tmdbEntry, {
                params: {
                    query: movieTitle,
                    api_key: tmdbKey
                }
            })
            .then(response => {
                if(response.data.results === !undefined || response.data.results.length > 0) {
                    this.posterImg.push({ path: response.data.results[0].poster_path, id: id });
                }    
            })
        },
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
    },
    created () {
        window.addEventListener('scroll', this.onScroll);
    },
    unmounted () {
        window.removeEventListener('scroll', this.onScroll);
    },
}
</script>
<style lang="scss" scoped>
.recent-items {
    @include break('small') {
        display: grid;
        column-gap: 2rem;
        justify-content: center;
        grid-template-columns: repeat(auto-fit,$col3);
    }
}

.episode-link {
    text-decoration: none;
    color: $blk;
    display: flex;
    justify-content: flex-start;
    align-items: center;

    svg {
        font-size: 1.25rem;
        margin-left: 1rem;
    }

    &:hover, &:focus {
        text-decoration: underline;
    }
}

.search-wrapper {
    padding: 1rem 0 2rem;

    input {
        width: 100%;
        padding: .5rem;
        font-size: 1.5rem;
        border: 3px solid $grey-8;
        border-radius: 5px;
    }
}
</style>