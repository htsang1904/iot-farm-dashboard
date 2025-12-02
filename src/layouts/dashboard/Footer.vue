<template>
<div id="footer">
    <img src="/images/grey-logo.svg" alt="Powered By Cimi.vn" />
    © {{ moment().format('YYYY') }}
</div>
</template>

<script>
export default {

}
</script>
<style lang="scss">
#footer {
    height: 40px;
    line-height: 40px;
    img {
        width: 40px;
    }
    text-align: right;
    @media (max-width: 767px) {
        text-align: center;
    }
}
</style>
