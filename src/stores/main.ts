// stores/counter.js
import { defineStore } from 'pinia'

export const useMainStore = defineStore('main', {
    state: () => ({
        isLoading: false,
        count: 0,
        index: -1,
        fileInfo: '',
        filteredTime: '',
        isAll: true,
        items: [],
        modifiedItems: [],
        rowNames: {
            time: '',
            longitude: '',
            latitude: ''
        },
        inpValue: ''
    }),
    getters: {
        getItems: (state) => {
//@ts-ignore
            return state.modifiedItems.filter(item => item['Время подключения'].includes(state.inpValue))
        },
        getIndex(state) {
            return state.index
        },
        filteredItems(state): any {
            if (state.isAll) return this.getItems
            if (!state.isAll && this.getIndex !== -1) return [this.getItems[state.index]]
        }
    },
    actions: {
        changeIndex(val: number) {
            this.index = val
        },
        changeLoading(val = true) {
            this.isLoading = val
        },
        setItems(val: any) {
            this.items = val
        },
        setCount(val = 1000) {
            if (this.count + val <= this.items.length) {
                this.count = this.count + val
            }
            else {
                this.count = this.items.length
            }
        },
        resetStore() {
            this.index = -1
            this.filteredTime = ''
            this.isAll = true
            this.count = 0
            this.items = []
            this.modifiedItems = []
        }
    },
})
