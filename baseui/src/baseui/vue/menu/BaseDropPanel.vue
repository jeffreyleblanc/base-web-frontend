<template>
<div class="inline-block relative">
    <button @click="drop_down_open=!drop_down_open"
        class="ui-button text-black border border-gray-400 bg-gray-50"
    >
        <span><slot></slot></span>
        <span class="ml-2 text-gray-500">
            <svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
            </svg>
        </span>
    </button>
    <div v-show="drop_down_open"
        class="z-10 border-t-4 border-transparent whitespace-nowrap absolute min-w-full drop-shadow-xl"
        :class="alignclass"
        @click="menu_clicked"
    >
        <slot name="content"></slot>
    </div>
</div>
</template>

<script>
    export default {
        props: {
            title: {
                type: String,
                default: ''
            },
            auto_close: {
                type: Boolean,
                default: false
            },
            align: {
                type: String,
                default: 'center'
            },
            focus_code: String,
            entries: {
                type: Array,
                default: ()=>[]
            },
            action: {
                type: Function,
                default: null
            }
        },
        mounted(){
            // SST.add_menu(this);
        },
        beforeDestroy(){
            // SST.remove_menu(this);
        },
        data(){
            return {
                drop_down_open: false
            }
        },
        computed: {
            alignclass(){
                return {
                    'center-under-parent':(this.align=='center'),
                    'right-under-parent':(this.align=='right')
                }
            }
        },
        methods: {
            menu_clicked(){
                // Triggered AFTER any click handlers within the dropdown
                console.log('MENU WAS CLICKED!!!');
                if(this.auto_close){
                    this.drop_down_open = false;
                }
            },
            toggle_dropdown(event){
                this.drop_down_open = !this.drop_down_open;
                // (this.drop_down_open)?
                //     SST.on_menu_user_open(this):
                //     SST.on_menu_user_close(this);
            },
            on_item_clicked(event){
                const el = event.target;
                const idx = el.dataset.idx;
                if(this.action==null){
                    this.entries[idx].meth(event,this.entries[idx]);
                }else{
                    this.action(idx,this.entries[idx])
                }
                this.drop_down_open = false;
            }
        }
    }

</script>
