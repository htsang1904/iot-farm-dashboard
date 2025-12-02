<template>
    <div v-if="false"></div>
</template>


<script>
import GetCountMixin from '../mixins/get_count'

export default {
    data() {
        return {
            alarm: false,
            authenticated: false
        }
    },
    mixins: [GetCountMixin],
    mounted() {
        this.playSound(true)
    },
    sockets: {
        connect() {
            console.log('Socket connected');
        },
        disconnect() {
            console.log('Socket disconnect')
        },
        staff_authenticated() {
            this.authenticated = true
        },
        staff_connectagain() {
            this.joinStores()
        },
        newOnlineOrder() {
            this.getNotifyCount();
            this.$suiteMessage.success('Có đơn hàng mới!');
        },
        userCancelledOrder() {
            this.getNotifyCount();
        },
        orderNeedConfirm(count) {
            this.getNotifyCount();
        },
    },
    methods: {
        joinStores() {
            if (this.$authStored.storeList && this.$authStored.storeList.store_ids.length < 20 ) {
                let store_ids = this.$authStored.storeList.store_ids
                this.$socket.emit('join_multi_store', store_ids)
            }
        },
        playSound(init) {
            let audio = document.getElementById('notification_player');
            if (!audio) {
                audio = document.createElement('audio');
                audio.id = 'notification_player';
                audio.src = '/sounds/new-order.wav';
                audio.loop = true;
                document.body.appendChild(audio);
            }
            audio.currentTime = 0;

            if (promise !== undefined) {
                promise.then(_ => {
                    // Autoplay started!
                }).catch(error => {
                    this.$confirm('Mở âm thanh?', 'Info', {
                        confirmButtonText: 'OK',
                        showClose: false,
                        showCancelButton: false,
                        type: 'warning'
                    }).then(() => {
                        audio.play()
                    });
                });
            }

            const promise = audio.play();

            if (init) {
                audio.onplaying = () => {
                    audio.pause();
                    audio.currentTime = 0;
                    audio.onplaying = undefined
                }
            }
        }
    },
    watch: {
        store_list(n) {
            if (Object.keys(n)) {
                setTimeout(() => {
                    if (this.authenticated) {
                        this.joinStores()
                    }
                }, 2000);
            }
        }
    }
}
</script>
