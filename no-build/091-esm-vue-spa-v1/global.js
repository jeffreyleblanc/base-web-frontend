/* Copyright Jeffrey LeBlanc */

// see https://vuejs.org/guide/reusability/plugins.html#introduction

export const G = {
    install(app, options){
        app.config.globalProperties.$G = this;
    }
};

