<template>
<main class="ui-spa-root ui-parent-col">
    <header class="ui-tool-row drop-shadow-md py-12 px-4 bg-gray-300">
        <tool-bar></tool-bar>
    </header>

    <section class="ui-child-expand ui-parent-col">

        <section class="ui-child-expand ui-parent-row bg-pink-500">

            <div class="w-10 bg-purple-300">
                <div>1</div>
                <div>2</div>
            </div>

            <nav class="ui-parent-col bg-lime-400" :class="ui.left_col_width">
                <div class="ui-tool-row p-4 bg-blue-200">
                   <tool-mini-bar></tool-mini-bar>
                </div>
                <div class="ui-child-expand p-4 bg-orange-200">
                    <div v-for="e in ui.l_list">{{e}}</div>
                </div>
            </nav>

            <main class="ui-child-expand ui-parent-row bg-lime-400">
                <template v-if="ui.right_col_showing=='text'">
                    <div class="ui-child-expand p-4 bg-brown-200">
                        <div v-for="e in ui.r_list">{{e}}</div>
                    </div>
                </template>
                <template v-if="ui.right_col_showing=='image'">
                    <img class="ui-child-center-max p-2" src="/media/dunes.png" />
                </template>
                <template v-if="ui.right_col_showing=='label'">
                    <!-- An alternate could probably make the parent a relative and position within -->
                    <div class="ui-child-center p-4 bg-black text-white">
                        This is a warning!<br>to you!
                        <br>
                        <SvgIcon class="h-16 w-16" :icon="'cpu'" />
                    </div>
                </template>
                <template v-if="ui.right_col_showing=='cards'">
                    <div class="ui-child-expand p-4 bg-brown-200 flex flex-row flex-wrap gap-6">
                        <lots-of-cards />
                    </div>
                </template>
            </main>

        </section>

        <section class="h-36 overflow-auto bg-gray-300 border border-red-500">
            <lots-of-yes />
        </section>

    </section>

    <footer class="ui-flex-row h-8 items-center px-2 bg-black text-white">
        <span>Footer</span>
    </footer>
</main>
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

import ToolBar from './ToolBar.vue';
import ToolMiniBar from './ToolMiniBar.vue';
import LotsOfCards from './LotsOfCards.vue';
import LotsOfYes from './LotsOfYes.vue';


export default {
    components: {
        ToolBar, ToolMiniBar, LotsOfCards, LotsOfYes,
        IconAlarm, IconSearch, IconImage, IconPlus,
        IconPlusCircle, IconPlusCircleFill, IconTools, IconArrowDownUp
    },
    $init_data(){
        return {
            right_col_showing: 'text',
            left_col_width: 'w-1/4',
            l_list: ['a','b'],
            r_list: ['1','2','3']
        }
    },
    computed: {
        ui(){ return this.$G.store.ui; }
    }
}
</script>
