<template>

    <span class="text-lg">Content</span>

    <span class="h-6 w-6 text-black">
        <icon-tools />
    </span>

    <button class="ui-button-icon">
        <icon-plus />
    </button>

    <button class="ui-button-icon bg-gray-400 rounded-full">
        <icon-plus />
    </button>

    <button class="ui-button-icon sq-7" title="Add thing">
        <icon-plus-circle />
    </button>

    <button class="ui-button-icon sq-7 text-blue-gray-600 hover:text-blue-gray-700">
        <icon-plus-circle-fill />
    </button>

    <span class="ui-row sq-8 text-white bg-green-600 rounded-full items-center justify-center">
        <icon-arrow-down-up class="sq-5" />
    </span>

    <span class="ui-row sq-8 text-white bg-green-600 rounded-lg items-center justify-center">
        <icon-arrow-down-up class="sq-5" />
    </span>

    <button class="ui-button" @click="set_content(0,0)">clear</button>
    <button class="ui-button text-yellow-600 h-10" @click="set_content(5,7)">a little</button>
    <button class="ui-button-slate" @click="set_content(120,7)">left</button>
    <button class="ui-button" @click="set_content(5,120)">right</button>
    <button class="ui-button gap-2" @click="set_content(110,120)">
        <span class="sq-5"><icon-image /></span>
        <span>all</span>
    </button>


    <span>Left col</span>
    <button class="ui-button-blue" @click="left_col_width('w-1/4')">w-1/4</button>
    <button class="ui-button-red" @click="left_col_width('w-3/4')">w-3/4</button>

    <div class="relative">
        <select class="block appearance-none w-32 bg-gray-200 h-8 px-4 pr-8 rounded drop-shadow focus:outline-none cursor-pointer">
            <option>Apples</option>
            <option>Orange</option>
            <option>Fish</option>
            <option>A Long Long Journey, That is so so long!</option>
        </select>
        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <chevron-down />
        </div>
    </div>

    <base-menu :align="'left'">
        Actions <!-- this is the main button text -->
        <template v-slot:items>
            <li class="ui-dropdown-item">One</li>
            <li class="ui-dropdown-item">Two</li>
            <li class="ui-dropdown-item">Lots of text here here here here</li>
        </template>
    </base-menu>

    <base-menu :align="'center'">
        <span class="ui-row items-center">
            <span class="sq-4 mr-3"><icon-tools/></span>
            <span>Actions 2</span>
        </span>
        <template v-slot:items>
            <li class="ui-dropdown-item">One</li>
            <li class="ui-dropdown-item">Two</li>
            <li class="ui-dropdown-item">Lots of text here here here</li>
            <li class="ui-dropdown-item">One</li>
            <li class="ui-dropdown-item">Two</li>
            <li class="ui-dropdown-item">One</li>
            <li class="ui-dropdown-item">Two</li>
            <li class="ui-dropdown-item">One</li>
            <li class="ui-dropdown-item">Two</li>
            <li class="ui-dropdown-item">One</li>
            <li class="ui-dropdown-item">Two</li>
        </template>
    </base-menu>

    <base-menu :align="'right'" :auto_close="true">
        Actions 3 <!-- this is the main button text -->
        <template v-slot:items>
            <li class="ui-dropdown-item" @click="set_right_col('image')">image</li>
            <li class="ui-dropdown-item" @click="set_right_col('text')">text</li>
            <li class="ui-dropdown-item" @click="set_right_col('cards')">Lots of here but: cards</li>
            <li class="ui-dropdown-item" @click="set_right_col('label')">label</li>
        </template>
    </base-menu>

    <base-drop-panel :align="'center'">
        Controls <!-- this is the main button text -->
        <template v-slot:content>
            <div class="p-4 bg-gray-50 rounded ui-col gap-y-2 items-start">
                <div>Token Actions:</div>
                <button class="ui-button-blue">Clear</button>
                <button class="ui-button-red">Re Key All</button>
                <div>Guest Thingy Actions:</div>
                <button class="ui-button inline-block">Clear</button>
                <button class="ui-button">Re Key All</button>
            </div>
        </template>
    </base-drop-panel>

    <select class="form-select">
        <option>Apples</option>
        <option>Orange</option>
        <option>Fish</option>
        <option>A Long Long Journey, That is so so long!</option>
    </select>

    <select class="ui-select">
        <option>Red Sox</option>
        <option>Tor</option>
        <option>Beam</option>
    </select>

    <span>Other</span>
    <button class="ui-button" @click="set_right_col('image')">show image</button>
    <button class="ui-button" @click="set_right_col('text')">show text</button>
    <button class="ui-button" @click="set_right_col('cards')">show cards</button>
    <button class="ui-button" @click="set_right_col('label')">show label</button>

    <div class="ui-dropdown inline-block relative">
        <button class="bg-gray-700 py-1 px-4 rounded flex flex-row items-center">
            <span class="text-blue-500">Dropdown</span>
            <span class="ml-2 text-blue-500">
                <chevron-down/>
            </span>
        </button>
        <ul class="ui-dropdown-menu whitespace-nowrap center-under-parent absolute hidden  min-w-full text-gray-700 drop-shadow-lg cursor-pointer">
            <li class="dropdown-item">One</li>
            <li class="dropdown-item">Two</li>
            <li class="dropdown-item">Lots of text here</li>
        </ul>
    </div>

    <div class="h-10 force-w-px bg-gray-500"></div>

    <input class="ui-input-text" type="text" placeholder="search" />

    <div class="ui-tool-group">
        <input class="h-4 w-4 border-none accent-pink-700" type="checkbox" />
        <label>stuff</label>
    </div>

    <div class="ui-tool-group">
        <input class="ui-checkbox h-4 w-4" type="checkbox" />
        <label>right stuff</label>
    </div>

    <div class="ui-tool-group">
        <input class="form-checkbox" type="checkbox" />
        <label>other stuff</label>
    </div>

    <span class="relative">
        <input class="ui-input-text pl-9" type="text" placeholder="search" />
        <span class="absolute top-2 left-2 h-4 w-4 text-gray-700 flip-lr">
            <icon-search />
        </span>
    </span>

</template>

<script>

import {make_text,randint} from '~/tools/simulator.js';

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
        set_content(left, right){
            this.$G.store.ui.l_list = [];
            for(let i=0; i<left; i++){
                this.$G.store.ui.l_list.push(`>> ${make_text(randint(1,20))} <<`);
            }

            this.$G.store.ui.r_list = [];
            for(let i=0; i<right; i++){
                this.$G.store.ui.r_list.push(`>> ${make_text(randint(1,20))} <<`)
            }
        },
        left_col_width(val){
            this.$G.store.ui.left_col_width = val;
        },
        set_right_col(val){
            console.log('SET RIGHT COL',val);
            this.$G.store.ui.right_col_showing = val;
        }
    }
};
</script>
