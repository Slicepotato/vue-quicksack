<template>
    <header>
        <div class="mode-toggle">
            <span title="Light Mode" class="ico-sun">
                <fa :icon="['fas', 'sun']" />
            </span>
            <label class="ui-mode">
                <input @change="uiToggle" id="uiSwitch" type="checkbox">
                <span class="slider"></span>
            </label>
            <span title="Dark Mode" class="ico-moon">
                <fa :icon="['fas', 'moon']" />
            </span>
        </div>
        <h1>
            <router-link to="/">FilmSack</router-link>
        </h1>
        <p class="subtitle">/QuickSack</p>
        <p class="site-desc">Looking to see if <b>FilmSack</b> has already covered a film? You can search here to find when they talked about it and listen to the fun.</p>
    </header>
</template>

<script>


export default {
    created: function() {
    },
    mounted: function() {
        this.toggleSwitch = document.getElementById('uiSwitch');
        this.pageBody = document.getElementsByTagName('body');
        this.load()        
    },
    methods: {
        load() {
            let checked = JSON.parse(localStorage.getItem('toggleSwitch'));
            console.log(this.toggleSwitch);
            this.toggleSwitch.checked = checked;

            this.uiToggle();

            return;
        },
        uiToggle() {

            if(this.toggleSwitch.checked) {
                for (let i = 0; i < this.pageBody.length; i++) {
                    this.pageBody[i].classList.remove('light');
                    this.pageBody[i].classList.add('dark');
                    localStorage.setItem('toggleSwitch',this.toggleSwitch.checked);
                }
            } else {
                for (let i = 0; i < this.pageBody.length; i++) {
                    this.pageBody[i].classList.remove('dark');
                    this.pageBody[i].classList.add('light');
                    localStorage.clear();
                }
            }

            return;
        }
    },
    computed: {
        
    }
}
</script>
<style lang="scss" scoped>
header {
    border-top: 10px solid $blk;
    padding-top: .5rem;
}
.site-desc {
    line-height: 1.25rem;
}

.mode-toggle {
    display: flex;
    justify-content: flex-end;
    align-items: center;

    .ico-sun {
        font-size: 1.25rem;
    }
    .ico-moon {
        font-size: 1.05rem;
    }
}

.ui-mode {
    position: relative;
    display: inline-block;
    width: 48px;
    height: 24px;
    margin: 0 1rem;

    input {
        opacity: 0;
        width: 0;
        height: 0;

        &:checked {
            &+ .slider {
                background-color: $cadmium;

                &:before {
                    -webkit-transform: translate(26px);
                    -ms-transform: translate(26px);
                    transform: translate(26px);
                }
            }
        }

        &:focus {
            &+ .slider {
                box-shadow: 0 0 1px $cadmium;
            }
        }
    }
}

.slider {
    position: absolute;
    cursor: pointer;
    border-radius: 24px;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: $grey-3;
    -webkit-transition: .4s;
    transition: .4s;

    &:before {
        content: '';
        position: absolute;
        border-radius: 50%;
        height: 16px;
        width: 16px;
        left: 4px;
        bottom: 4px;
        background-color: $wht;
        -webkit-transition: .4s;
        transition: .4s;
    }
}
</style>