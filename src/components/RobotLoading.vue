<template>
<transition name="el-loading-fade" @after-leave="handleAfterLeave">
    <div v-show="visible" class="el-loading-mask" :style="{ backgroundColor: background || '' }" :class="[customClass, { 'is-fullscreen': fullscreen }]">
        <div id="robot-loading">
            <div id="bot">
                <div id="eyes">
                    <div id="left">
                        <div class="eye"></div>
                    </div>
                    <div id="right">
                        <div class="eye"></div>
                    </div>
                </div>
                <div id="leftarm">
                    <div class="finger"></div>
                    <div class="finger"></div>
                </div>
                <div id="rightarm">
                    <div class="finger"></div>
                    <div class="finger"></div>
                </div>
            </div>
            <div id="neck"></div>
            <div id="body"></div>
            <div id="legs">
                <div id="left">
                    <div class="foot"></div>
                </div>
                <div id="right">
                    <div class="foot"></div>
                </div>
            </div>
        </div>
        <div v-if="text" id="loading-text">{{ text }}</div>
    </div>
</transition>
</template>



<script>
export default {
    data() {
        return {
            text: null,
            spinner: null,
            background: null,
            fullscreen: true,
            visible: false,
            customClass: ''
        };
    },

    methods: {
        handleAfterLeave() {
            this.$emit('after-leave');
        },
        setText(text) {
            this.text = text;
        }
    }
};
</script>

<style lang="scss">
$backgroundColor_1: #1d7de2;
$backgroundColor_2: #fff;

#robot-loading {
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -0.75em;
    margin-left: -1.5em;

    #bot {
        position: absolute;
        height: 30px;
        width: 50px;
        border-radius: 3px;
        background-color: $backgroundColor_1;
        -webkit-animation: 1.3s botMotion linear infinite;
        animation: 1.3s botMotion linear infinite;

        #eyes {
            position: absolute;
            width: 40px;
            height: 20px;
            top: 5px;
            left: 5px;
            background-color: $backgroundColor_2;

            .eye {
                height: 10px;
                width: 5px;
                background-color: $backgroundColor_1;
                -webkit-animation: 1.5s eyeBlink 0.16s linear infinite;
                animation: 1.5s eyeBlink 0.16s linear infinite;
                border-radius: 40%;
            }

            #left {
                position: absolute;
                top: 50%;
                left: 25%;
                margin-top: -5px;
            }

            #right {
                position: absolute;
                top: 50%;
                right: 25%;
                margin-top: -5px;
            }
        }

        .finger {
            position: absolute;
            height: 10px;
            width: 6px;
            border-radius: 3px;
            background-color: $backgroundColor_1;
        }

        #leftarm {
            position: absolute;
            top: 0;
            left: 0;
            height: 30px;
            width: 25px;

            .finger {
                &:nth-of-type(1) {
                    -webkit-animation: 1.3s lefttopfinger linear infinite;
                    animation: 1.3s lefttopfinger linear infinite;
                }

                &:nth-of-type(2) {
                    -webkit-animation: 1.3s leftbotfinger linear infinite;
                    animation: 1.3s leftbotfinger linear infinite;
                }
            }
        }

        #rightarm {
            position: absolute;
            top: 0;
            right: 0;
            height: 30px;
            width: 25px;

            .finger {
                &:nth-of-type(1) {
                    -webkit-animation: 1.3s righttopfinger linear infinite;
                    animation: 1.3s righttopfinger linear infinite;
                }

                &:nth-of-type(2) {
                    -webkit-animation: 1.3s rightbotfinger linear infinite;
                    animation: 1.3s rightbotfinger linear infinite;
                }
            }
        }
    }

    #neck {
        position: absolute;
        top: 30px;
        width: 40px;
        height: 3px;
        background-color: $backgroundColor_1;
        margin-left: 5px;
        -webkit-animation: 1.3s neckMotion linear infinite;
        animation: 1.3s neckMotion linear infinite;
    }

    #body {
        position: absolute;
        top: 33px;
        width: 50px;
        height: 10px;
        border-radius: 3px;
        background-color: $backgroundColor_1;
        -webkit-animation: 1.3s bodyMotion linear infinite;
        animation: 1.3s bodyMotion linear infinite;
    }

    #legs {
        position: absolute;
        top: 33px;
        left: 25px;

        .foot {
            width: 25px;
            height: 10px;
            border-radius: 3px;
            background-color: $backgroundColor_1;
        }

        #left {
            position: absolute;
            top: -10px;
            left: 0;
            -webkit-animation: 1.3s leftfoot linear infinite;
            animation: 1.3s leftfoot linear infinite;
        }

        #right {
            position: absolute;
            top: -10px;
            right: 0;
            -webkit-animation: 1.3s rightfoot linear infinite;
            animation: 1.3s rightfoot linear infinite;
        }
    }
}
#loading-text {
    // after robot, center
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    text-align: center;
    margin-top: 50px;
    font-size: 13px;
    color: $backgroundColor_1;

}

@keyframes lefttopfinger {
    0% {
        left: 0;
        top: 5px;
    }

    10%,
    20% {
        left: -10px;
        top: 5px;
    }

    30% {
        left: -10px;
        top: 2px;
    }

    40% {
        left: -10px;
        top: 5px;
    }

    50% {
        left: -10px;
        top: 2px;
    }

    60% {
        left: -10px;
        top: 5px;
    }

    70% {
        left: -10px;
        top: 2px;
    }

    80%,
    90% {
        left: -10px;
        top: 5px;
    }

    100% {
        left: 0;
        top: 5px;
    }
}

@keyframes leftbotfinger {
    0% {
        left: 0;
        bottom: 5px;
    }

    10%,
    20% {
        left: -10px;
        bottom: 5px;
    }

    30% {
        left: -10px;
        bottom: 2px;
    }

    40% {
        left: -10px;
        bottom: 5px;
    }

    50% {
        left: -10px;
        bottom: 2px;
    }

    60% {
        left: -10px;
        bottom: 5px;
    }

    70% {
        left: -10px;
        bottom: 2px;
    }

    80%,
    90% {
        left: -10px;
        bottom: 5px;
    }

    100% {
        left: 0;
        bottom: 5px;
    }
}

@keyframes righttopfinger {
    0% {
        right: 0;
        top: 5px;
    }

    10%,
    20% {
        right: -10px;
        top: 5px;
    }

    30% {
        right: -10px;
        top: 2px;
    }

    40% {
        right: -10px;
        top: 5px;
    }

    50% {
        right: -10px;
        top: 2px;
    }

    60% {
        right: -10px;
        top: 5px;
    }

    70% {
        right: -10px;
        top: 2px;
    }

    80%,
    90% {
        right: -10px;
        top: 5px;
    }

    100% {
        right: 0;
        top: 5px;
    }
}

@keyframes rightbotfinger {
    0% {
        right: 0;
        bottom: 5px;
    }

    10%,
    20% {
        right: -10px;
        bottom: 5px;
    }

    30% {
        right: -10px;
        bottom: 2px;
    }

    40% {
        right: -10px;
        bottom: 5px;
    }

    50% {
        right: -10px;
        bottom: 2px;
    }

    60% {
        right: -10px;
        bottom: 5px;
    }

    70% {
        right: -10px;
        bottom: 2px;
    }

    80%,
    90% {
        right: -10px;
        bottom: 5px;
    }

    100% {
        right: 0;
        bottom: 5px;
    }
}

@keyframes leftfoot {
    0% {
        top: 0;
    }

    10%,
    20% {
        top: 0;
    }

    30% {
        top: 12px;
    }

    40% {
        top: 0;
    }

    50% {
        top: 12px;
    }

    60% {
        top: 0;
    }

    70% {
        top: 12px;
    }

    80%,
    90%,
    100% {
        top: 0;
    }
}

@keyframes rightfoot {
    0% {
        top: 0;
    }

    10%,
    20%,
    30% {
        top: 0;
    }

    40% {
        top: 12px;
    }

    50% {
        top: 0;
    }

    60% {
        top: 12px;
    }

    70%,
    80%,
    90%,
    100% {
        top: 0;
    }
}

@keyframes botMotion {

    0%,
    10% {
        top: 0;
    }

    20%,
    80% {
        top: -13px;
    }

    90%,
    100% {
        top: 0;
    }
}

@keyframes neckMotion {

    0%,
    10% {
        top: 30px;
    }

    20%,
    80% {
        top: 17px;
    }

    90%,
    100% {
        top: 30px;
    }
}

@keyframes bodyMotion {

    0%,
    10% {
        top: 33px;
    }

    20%,
    80% {
        top: 20px;
    }

    90%,
    100% {
        top: 33px;
    }
}

@keyframes eyeBlink {

    0%,
    10% {
        background-color: $backgroundColor_1;
    }

    15% {
        background-color: #fff;
    }

    20%,
    50%,
    80% {
        background-color: $backgroundColor_1;
    }

    85% {
        background-color: #fff;
    }

    90%,
    100% {
        background-color: $backgroundColor_1;
    }
}
</style>
