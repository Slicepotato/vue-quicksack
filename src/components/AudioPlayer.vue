<template>
    <div class="audio-player">
        <audio 
            ref="player"
            preload="none"
            :id="objectid"
        >
            <source :src="url" :type="type">
        </audio>

        <div class="control">
            <button 
                type="button"
                @click="toggleAudio()"
                v-show="!isPlaying"
            >
                <fa :icon="['fas', 'play-circle']" />
            </button>
            <button 
                type="button"
                @click="toggleAudio()"
                v-show="isPlaying"
            >
                <fa :icon="['fas', 'stop-circle']" />
            </button>
        </div>
        <div class="progress-bar">
            <div v-show="audioLoaded">
                <input
                    v-model="playbackTime"
                    type="range"
                    min="0"
                    :max="audioDuration"
                    name="position"
                />

                <div
                    class="timing"
                >
                    <span v-html="elapsedTime()"></span> /
                    <span v-html="totalTime()"></span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "AudioPlayer",
    props: [
        'url',
        'type',
        'objectid',
    ],
    data () {
        return {
            playbackTime: 0,
            audioDuration: 100,
            audioLoaded: false,
            isPlaying: false
        }
    },
    methods: {
        initSlider() {
            let audio = this.$refs.player;

            if (audio) {
                this.audioDuration = Math.round(audio.duration);
            }
        },
        convertTime(seconds){
            const format = val => `0${Math.floor(val)}`.slice(-2);
            let hours = seconds / 3600;
            let minutes = (seconds % 3600) / 60;
            
            return [hours, minutes, seconds % 60].map(format).join(":");
        },
        totalTime() {
            let audio = this.$refs.player;

            if (audio) {
                let seconds = audio.duration;

                return this.convertTime(seconds);
            } else {
                return '00:00';
            }
        },
        elapsedTime() {
            let audio = this.$refs.player;

            if (audio) {
                let seconds = audio.currentTime;

                return this.convertTime(seconds);
            } else {
                return '00:00';
            }
        },
        playbackListener() {
            let audio = this.$refs.player;

            //Sync local 'playbackTime' var to audio.currentTime and update global state
            this.playbackTime = audio.currentTime;
            
            //console.log("update: " + audio.currentTime);
            //Add listeners for audio pause and audio end events
            audio.addEventListener("ended", this.endListener);
            audio.addEventListener("pause", this.pauseListener);
        },
        pauseListener() {
            this.isPlaying = false;
            this.listenerActive = false;
            this.cleanupListeners();
        },
        //Function to run when audio play reaches the end of file
        endListener() {
            this.isPlaying = false;
            this.listenerActive = false;
            this.cleanupListeners();
        },
        //Remove listeners after audio play stops
        cleanupListeners() {
            let audio = this.$refs.player;

            audio.removeEventListener("timeupdate", this.playbackListener);
            audio.removeEventListener("ended", this.endListener);
            audio.removeEventListener("pause", this.pauseListener);
            //console.log("All cleaned up!");
        },
        toggleAudio() {
            let audio = this.$refs.player;

            //var audio = document.getElementById("audio-player");
            if (audio.paused) {
                audio.play();
                this.isPlaying = true;
            } else {
                audio.pause();
                this.isPlaying = false;
            }
        },
    },
    mounted: function() {
        this.$nextTick(function() {
        
            let audio=this.$refs.player;

            audio.addEventListener("loadedmetadata",
                function() {
                    this.initSlider();
                }.bind(this)
            );

            audio.addEventListener("canplay",
                function() {
                    this.audioLoaded=true;
                }.bind(this)
            );

            this.$watch("isPlaying",function() {
                if(this.isPlaying) {
                    let audio=this.$refs.player;
                    this.initSlider();
                    
                    if(!this.listenerActive) {
                        this.listenerActive=true;
                        audio.addEventListener("timeupdate",this.playbackListener);
                    }
                }
            });

            this.$watch("playbackTime",function() {
                let diff=Math.abs(this.playbackTime-this.$refs.player.currentTime);
            
                if(diff>0.01) {
                    this.$refs.player.currentTime=this.playbackTime;
                }
            });
        });
    }
}
</script>
<style lang="scss" scoped>
.audio-player {
        margin-top: auto;
}

.control {
    margin: 0 auto;
    text-align: center;

    button {
        font-size: 6rem;
        background-color: transparent;
        border: none;
        outline: none;
    }
}

.progress-bar {
    margin: 0 0 1rem;
    padding: 0 1rem;

    input[type=range] {
        height: 25px;
        -webkit-appearance: none;
        border-radius: 5px;
        margin: 10px 0;
        width: 100%;
    }
    input[type=range]:focus {
        outline: none;
    }
    input[type=range]::-webkit-slider-runnable-track {
        width: 100%;
        height: 25px;
        cursor: pointer;
        animate: 0.2s;
        box-shadow: 0px 0px 0px $blk;
        background: $carmine;
        border-radius: 5px;
        border: 0px solid $blk;
    }
    input[type=range]::-webkit-slider-thumb {
        box-shadow: 0px 0px 0px $blk;
        border: 3px solid $blk;
        height: 30px;
        width: 15px;
        border-radius: 5px;
        background: $wht;
        cursor: pointer;
        -webkit-appearance: none;
        margin-top: -3.5px;
    }
    input[type=range]:focus::-webkit-slider-runnable-track {
        background: $carmine;
    }

    input[type=range]::-moz-range-track {
        width: 100%;
        height: 25px;
        cursor: pointer;
        animate: 0.2s;
        box-shadow: 0px 0px 0px $blk;
        background: $carmine;
        border-radius: 5px;
        border: 0px solid $blk;
    }
    input[type=range]::-moz-range-thumb {
        box-shadow: 0px 0px 0px $blk;
        border: 2px solid $blk;
        height: 30px;
        width: 15px;
        border-radius: 5px;
        background: $wht;
        cursor: pointer;
    }

    input[type=range]::-ms-track {
        width: 100%;
        height: 25px;
        cursor: pointer;
        animate: 0.2s;
        background: transparent;
        border-color: transparent;
        color: transparent;
    }
    input[type=range]::-ms-fill-lower {
        background: $carmine;
        border: 0px solid $blk;
        border-radius: 10px;
        box-shadow: 0px 0px 0px $blk;
    }
    input[type=range]::-ms-fill-upper {
        background: $carmine;
        border: 0px solid $blk;
        border-radius: 10px;
        box-shadow: 0px 0px 0px $blk;
    }
    input[type=range]::-ms-thumb {
        margin-top: 1px;
        box-shadow: 0px 0px 0px $blk;
        border: 2px solid $blk;
        height: 30px;
        width: 15px;
        border-radius: 5px;
        background: $wht;
        cursor: pointer;
    }
    input[type=range]:focus::-ms-fill-lower {
        background: $carmine;
    }
    input[type=range]:focus::-ms-fill-upper {
        background: $carmine;
    }
}
</style>