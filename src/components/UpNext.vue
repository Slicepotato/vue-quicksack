<template>
    <div class="coming-soon">
       <h2>Coming Soon!</h2>
       <p class="title">
           <span>{{ comingSoon }}</span>
        </p>
    </div>
</template>

<script>
import axios from 'axios';

const googleSheet = 'https://spreadsheets.google.com/feeds/cells/1LfDJd7_731VeKbXcYJMBJnK23kE6MbipC7mH2a0FWXk/1/public/full?alt=json'

export default {
    data() {
        return {
            comingSoon: ''
        }
    },
    mounted() {
        axios.get(googleSheet)
        .then(response => {
            this.comingSoon = response.data.feed.entry[2].content.$t;
        });
    }
}
</script>
<style lang="scss" scoped>
.coming-soon {
    margin: 1rem 0;

    h2 {
        font-family: $roboto-slab;
        font-weight: 700;
        font-size: 2rem;
        margin-bottom: .5rem;
    }

    .title {
        text-align: center;
        padding: .25rem 0;
        font-style: italic;
        font-family: $roboto-slab;
        font-size: 1.5rem;
        border-top: 1px solid $grey-5;
        border-bottom: 1px solid $grey-5;

        span {
            display: block;
            padding: 1rem;
            border-top: 3px solid $grey-6;
            border-bottom: 3px solid $grey-6;
        }
    }
}
</style>