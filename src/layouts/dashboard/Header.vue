<template>
<nav class="navbar navbar-dark bg-success navbar-expand">
    <button type="button" aria-label="Toggle navigation" aria-controls="sidedrawer" class="navbar-toggler" @click="toogleSideDrawer">
        <el-badge :value="notifyCount" :hidden="notifyCount === 0" class="notify-count">
            <template>
                <img class="el-unfold" src="/images/show-sidebar.svg" v-if="!sidedrawer_show">
                <img class="el-fold" src="/images/hide-sidebar.svg" v-else>
            </template>
        </el-badge>
    </button>

    <div class="navbar-brand" v-if="showLogo">
        <img class="logo-img" src="/images/suitelogo.svg">
    </div>

    <!-- <div class="datepicker" v-if="isShowDatePicker">
        <div ref="datePickerForm" class="datepicker-form" :class="{'is-overlay' : picker_show}">
            <div class="date-icon" @click="showDatePicker">
                <i class="el-icon-date"></i>
            </div>
            <div class="start-date" @click="showDatePicker"> {{ startDateSelected }}
                <div class="to-date-icon"> <i class="el-icon-right"></i> </div>
            </div>
            <div class="end-date" @click="showDatePicker"> {{ endDateSelected }} </div>
            <div class="delete-icon" @click="resetDatePicker">
                <i class="el-icon-delete-solid"></i>
            </div>
        </div>
        <div class="picker-overlay" :class="{'is-overlay' : picker_show}">
            <div class="header">
                <div class="close-btn" @click="closeDatePicker">
                    <i class="el-icon-close"></i>
                </div>
            </div>
            <div class="calendar" v-if="picker_show">
                <div class="popular-ranges">
                    <div class="form-title">Kỳ báo cáo thường dùng</div>
                    <div class="date-options">
                        <div class="option" v-for="range in ranges" :key="range.key" :class="{ active: range.is_active }" @click="onClickRangeOption(range)">
                            {{ range.name }}
                        </div>
                    </div>
                </div>
                <div class="form-title"><i class="el-icon-date"></i> Kỳ báo cáo</div>
                <v-date-picker :columns="1" is-expanded mode='range' v-model="selected_date" color="blue" locale="vi-VN" is-inline :min-date="min_date" :max-date="max_date" @drag="onInputDate" @input="onInputDate" />
                <hr />
                <div class="form-title">
                    <i class="el-icon-time"></i> Khung giờ
                    <div class="right-title">Chỉ áp dụng một số báo cáo</div>
                </div>
                <SelectTimeRange v-model="selected_time" key="header-range" />
                <hr />
            </div>
            <div class="picker-footer">
                <div class="select-btn" @click="onSelectDate">Đồng ý</div>
            </div>
        </div>
    </div> -->

    <el-dropdown trigger="click" class="account-dropdown">
        <div class="staff-avatar">
            <img src="/images/default-avatar.svg">
        </div>
        <el-dropdown-menu slot="dropdown" class="account-poper">
            <el-dropdown-item>
                <div>{{ $authStored.name }}</div>
                <small>{{ $authStored.email || 'Chưa có email'}}</small>
            </el-dropdown-item>
            <el-dropdown-item divided @click.native="logout">Đăng xuất</el-dropdown-item>
        </el-dropdown-menu>
    </el-dropdown>
    <ChangePasswordPopup v-if="isShowPasswordPopup" :isCreate="true" :show="isShowPasswordPopup" @close="onClosePopup" />
</nav>
</template>


<script>
let today = new Date();
import moment from 'moment';


// import ChangePasswordPopup from '@/modals/system/ChangePasswordPopup.vue';
// import SelectTimeRange from '@/components/common/SelectTimeRange.vue';
// import {
//     TIME_RANGE
// } from '@/utils/time_range'

export default {
    name: 'PageHeader',
    components: {
        // SelectTimeRange,
        // ChangePasswordPopup
    },
    data() {
        return {
            isShowPasswordPopup: false,
            sidedrawer_show: false,
            picker_show: false,
            selected_date: {
                start: moment().toDate(),
                end: moment().toDate()
            },
            min_date: null,
            max_date: null,
            ranges: [],
            // selected_time: TIME_RANGE.defaultSelectedTime,
        }
    },
    mounted() {
        // this.defaultTimeValues()
        // this.checkActiveOption()
    },
    computed: {
        isShowDatePicker() {
            let showDatePickerRoutes = [
                'StoreReport',
                'OnlineOrders',
                'PeriodReport',
                'MenuReport',
                'OrderReport',
                'Inventory',
                'CashFlow',
                'Timekeeping'
            ]
            return showDatePickerRoutes.includes(this.$route.name) && !this.$suiteStored.forceHeaderLogo
        },
        showLogo() {
            return !this.isShowDatePicker
        },

        startDateSelected() {
            return moment(this.selected_date.start).format('DD/MM')
        },
        endDateSelected() {
            return moment(this.selected_date.end).format('DD/MM')
        },

        notifyCount() {
            return this.$suiteStored.notifyCount.total
        }
    },
    methods: {
        defaultTimeValues() {
            this.min_date = moment('2020-01-01').toDate()
            this.max_date = moment().add(365, 'days').toDate()
            this.ranges = [{
                    key: 'yesterday',
                    name: 'Hôm qua',
                    start: moment().add(-1, 'days').toDate(),
                    end: moment().add(-1, 'days').toDate(),
                    is_active: false
                },
                {
                    key: 'today',
                    name: 'Hôm nay',
                    start: moment().toDate(),
                    end: moment().toDate(),
                    is_active: false
                },
                {
                    key: 'week',
                    name: 'Tuần này',
                    start: moment().startOf('week').toDate(),
                    end: moment().endOf('week').toDate(),
                    is_active: false
                },
                {
                    key: 'lastweek',
                    name: 'Tuần trước',
                    start: moment().add(-1, 'weeks').startOf('week').toDate(),
                    end: moment().add(-1, 'weeks').endOf('week').toDate(),
                    is_active: false
                },
                {
                    key: 'month',
                    name: 'Tháng này',
                    start: moment().startOf('month').toDate(),
                    end: moment().endOf('month').toDate(),
                    is_active: false
                },
                {
                    key: 'lastmonth',
                    name: 'Tháng trước',
                    start: moment().add(-1, 'months').startOf('month').toDate(),
                    end: moment().add(-1, 'months').endOf('month').toDate(),
                    is_active: false
                },
            ]
        },

        toogleSideDrawer() {
            this.$emit('toogleSideDrawer')
        },
        goHome() {
            this.$router.push({
                name: 'Dashboard'
            })
        },
        logout() {
            this.$authStored.logout()
                .then((res) => {
                    location.reload()
                })
        },
        showDatePicker() {
            if (!this.picker_show) {
                this.defaultTimeValues()
                this.checkActiveOption()
                this.picker_show = true
            } else {
                this.closeDatePicker()
            }
        },
        closeDatePicker() {
            this.picker_show = false
            this.selected_date = this.$suiteStored.selectedDate
            this.selected_time = this.$suiteStored.selectedTime
            this.checkActiveOption()
        },
        resetDatePicker() {
            this.selected_date = {
                start: moment().toDate(),
                end: moment().toDate()
            }
            // this.selected_time = TIME_RANGE.defaultSelectedTime
            this.onSelectDate()
        },
        onInputDate(e) {
            if (e) {
                let start = moment(e.start)
                let end = moment(e.end)
                if (end.diff(start, 'days') > 365) {
                    if (moment(e.start).add(365, 'days') > moment()) {
                        e.end = moment().toDate()
                    } else {
                        e.end = moment(e.start).add(365, 'days').toDate()
                    }
                }
                this.checkActiveOption()
            }
        },
        onClickRangeOption(range) {
            this.selected_date = {
                start: range.start,
                end: range.end
            }
            this.onSelectDate()
        },

        onSelectDate() {
            this.$suiteStored.selectedDate = this.selected_date
            this.$suiteStored.selectedTime = this.selected_time
            this.picker_show = false
            this.$nextTick(() => {
                this.$suiteStored.forceReRender = true
                this.checkActiveOption()
            })
        },

        checkActiveOption() {
            let selected = this.selected_date
            this.ranges.forEach(range => {
                if (moment(selected.start).format('YYYY-MM-DD') == moment(range.start).format('YYYY-MM-DD') &&
                    moment(selected.end).format('YYYY-MM-DD') == moment(range.end).format('YYYY-MM-DD')) {
                    range.is_active = true
                } else {
                    range.is_active = false
                }
            })
        },

        upgrade() {
            window.location.reload(true);
        },
        onClosePopup() {
            this.isShowPasswordPopup = false
        },

        openPopup() {
            this.isShowPasswordPopup = true
        }
    },
    watch: {
        "$suiteStored.selectedDate"(val) {
            this.selected_date = val
            this.checkActiveOption()
        },
        "$suiteStored.changedSelectedDate"(val) {
            if (val) {
                this.selected_date = this.$suiteStored.selectedDate
            }
        },
        selected_time(val) {
            this.checkActiveOption()
        },
        "$suiteStored.showSideDrawer"(isShow) {
            this.sidedrawer_show = isShow
        },
        picker_show(n, o) {
            /* Trick tránh lỗi trên safari */
            if (!n && o) {
                this.$refs.datePickerForm.style.display = 'none'
                setTimeout(() => {
                    this.$refs.datePickerForm.style.display = 'flex'
                }, 10);
            }
        }
    }
}
</script>


<style lang="scss">
@import '../../assets/scss/variables.scss';

.datepicker {
    margin: auto;
    transition: all 1s;

    .datepicker-form {
        position: relative;
        background: #fff;
        height: 40px;
        width: 500px;
        border-radius: 5px;
        display: flex;
        flex-wrap: nowrap;
        transition: ease-in-out .3s;
        overflow: hidden;

        @media (max-width: 600px) {
            width: 250px;

            &.is-overlay {
                width: 270px;
                transform: translate(0, 0);
            }
        }

        &.is-overlay {
            position: fixed;
            top: 9px;
            left: 0;
            right: 0;
            z-index: 1000;
            margin: auto;
            box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);

            .delete-icon {
                display: block;
                transition: all 1s;
            }

        }

        .date-icon {
            width: 40px;
            font-size: 22px;
            line-height: 42px;
            text-align: center;
            color: #437ba9;
        }

        .delete-icon {
            display: none;
            width: 40px;
            font-size: 18px;
            line-height: 42px;
            text-align: center;
            color: #fff;
            background: #F44336;
        }

        .start-date,
        .end-date {
            position: relative;
            width: 50%;
            font-size: 20px;
            line-height: 42px;
            text-align: center;
            cursor: pointer;

            .to-date-icon {
                width: 30px;
                position: absolute;
                top: 0;
                right: -15px;
            }
        }
    }

    .picker-overlay {
        position: fixed;
        width: 100%;
        height: 0;
        top: 0;
        left: 0;
        background: #fff;
        z-index: 999;

        &.is-overlay {
            height: 100%;
            transition: all .2s;

            .header,
            .picker-footer {
                display: block;
            }
        }

        .header {
            display: none;
            height: 57px;
            background: #fff !important;
            position: fixed;
            top: 0;
            width: 100%;
            z-index: 999;
            border-bottom: 1px solid #eaeaea;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);

            .close-btn {
                width: 40px;
                font-size: 30px;
                line-height: 59px;
                margin-left: 8px;
                color: #333;
                cursor: pointer;
            }
        }

        .calendar {
            max-width: 500px;
            margin: 60px auto 0;
            padding: 0 10px 0;
            height: calc(100% - 120px);
            overflow-y: auto;
            overflow-x: hidden;

            .vc-container {
                border: none;

                .vc-title {
                    font-family: 'Cimi', sans-serif;
                }
            }

            .popular-ranges {
                background: #fff3cf;
                margin: -10px -10px 10px;
                padding: 10px;
                border-radius: 10px;
            }
        }

        .form-title {
            font-size: 15px;
            font-weight: bold;
            margin: 5px 0;

            .right-title {
                float: right;
                font-size: 12px;
                font-weight: normal;
            }
        }

        .picker-footer {
            display: none;
            position: fixed;
            bottom: 0;
            width: 100%;
            background-color: #fff;
            font-size: 14px;
            line-height: 16px;
            color: #7e7e7e;
            border-top: 1px solid #eaeaea;
            box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.05);
            padding: 10px;

            .select-btn {
                cursor: pointer;
                max-width: 500px;
                margin: auto;
                width: 100%;
                border: none;
                background: $mainColor;
                color: #fff;
                font-weight: bold;
                height: 40px;
                font-size: 16px;
                line-height: 40px;
                text-align: center;
                border-radius: 5px;
            }
        }
    }
}

.notify-count {
    .el-badge__content {
        font-size: 10px;
        font-weight: bold;
        top: 3px;
    }
}
</style>
