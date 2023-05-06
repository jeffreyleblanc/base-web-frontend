
import {reactive} from 'vue'

export default class SVGIconStore {

    constructor(root_url){
        if(root_url.endsWith('/')){
            root_url = root_url.slice(0,-1); }

        this.root_url = root_url;
        this.icons_tracking = new Set();
        this.vstore = reactive({});
    }

    async fetch(icon){
        console.log('SVGIconStore::fetch:',icon)
        if(this.icons_tracking.has(icon)){
            console.log('already tracking:',icon)
            return; }

        this.icons_tracking.add(icon);
        try {
            const resp = await window.fetch(`${this.root_url}/${icon}.svg`);
            if(resp.status==200){
                let text = await resp.text();
                // Here we could apply a transform e.g.
                text = text.replace('width="16"','width="100%"');
                text = text.replace('height="16"','height="100%"');
                console.log('SVGIconStore::setting',icon); // ,text)
                this.vstore[icon] = text;
            }else{
                console.error('>err resp',resp);
            }
        }catch(err){
            console.error('>err',err);
        }
    }
}
