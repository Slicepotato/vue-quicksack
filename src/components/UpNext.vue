<template>
    <div>
       <h2>Coming Soon</h2>
       <p>{{ comingSoon }}</p>
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