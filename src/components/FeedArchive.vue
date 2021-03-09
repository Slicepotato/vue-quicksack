<template>
    <div class="feed-archive">
        <pre>{{ items }}</pre>
    </div>
</template>

<script>
import axios from 'axios';

const feedParser = "https://api.rss2json.com/v1/api.json";

export default {
    name: "Archive",
    data () {
        return {
            title: "Archive",
            items: [],
            feedUrl: "http://feeds.frogpants.com/filmsack_feed_old.xml"
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