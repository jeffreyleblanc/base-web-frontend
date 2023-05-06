
<template>

    <SvgIcon class="sq-8 text-red-700" icon="gear" />
    <SvgIcon class="sq-8" icon="gear" />
    <SvgIcon class="sq-8" icon="gear-fill" />
    <SvgIcon class="sq-8" icon="gear" />


    <input class="ui-input-text" type="text" placeholder="search" />

    <div class="ui-row items-center gap-1">
        <input class="h-4 w-4 border-none accent-pink-700" type="checkbox" />
        <label>stuff</label>
    </div>

    <div class="ui-row items-center gap-1">
        <input class="ui-checkbox h-4 w-4" type="checkbox" />
        <label>right stuff</label>
    </div>

    <div class="ui-row items-center gap-1">
        <input class="form-checkbox" type="checkbox" />
        <label>other stuff</label>
    </div>

    <span class="relative">
        <input class="ui-input-text pl-9" type="text" placeholder="search" />
        <span class="absolute top-2 left-2 h-4 w-4 text-gray-700">
            <icon-search />
        </span>
    </span>

    <span class="ui-input-text-icon-wrapper w-48">
        <span class="sq-4 text-gray-700">
            <icon-search />
        </span>
        <input type="text" placeholder="search" />
        <span class="sq-4 text-gray-700">
            <icon-search />
        </span>
    </span>

    <span class="ui-input-text-icon-wrapper">
        <span class="sq-4 text-gray-700">
            <icon-search />
        </span>
        <input type="text" placeholder="search" />
        <span class="sq-4 text-gray-700">
            <icon-search />
        </span>
    </span>

</template>

<script>

import IconAlarm from '~/vue/icons/IconAlarm.vue';
import IconSearch from '~/vue/icons/IconSearch.vue';
import IconImage from '~/vue/icons/IconImage.vue';
import IconPlus from '~/vue/icons/IconPlus.vue';
import IconPlusCircle from '~/vue/icons/IconPlusCircle.vue';
import IconPlusCircleFill from '~/vue/icons/IconPlusCircleFill.vue';
import IconTools from '~/vue/icons/IconTools.vue';
import IconArrowDownUp from '~/vue/icons/IconArrowDownUp.vue';

export default {
    components: {
        IconAlarm, IconSearch, IconImage, IconPlus, IconPlusCircle, IconPlusCircleFill,
        IconTools, IconArrowDownUp
    },
    methods: {
        // pass
    }
};
</script>