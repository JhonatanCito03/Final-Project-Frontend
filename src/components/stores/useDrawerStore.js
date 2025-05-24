import { defineStore } from "pinia";

export const useDrawerStore = defineStore('drawer',{
    state: () => ({
        showDrawer: false
    }),
    actions:{
        openDrawer(){
            this.showDrawer = true
        },
        closeDrawer(){
            this.showDrawer = false
        },
        toggleDrawer(){
            this.showDrawer = !this.showDrawer
        }
    }
}) 