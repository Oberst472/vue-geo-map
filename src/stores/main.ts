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
    }),
    getters: {
        getItems: (state) => {
            const getSeconds = function (val: string) {
                if (val.includes('24:00')) return 0

                const [h, m, s] = val.split(':')
                const hs = (Number(h) || 0) * 60
                return (hs + Number(m || 0)) * 60 + Number(s || 0)
            }

            return state.modifiedItems
                .filter(item => item['Широта БС (начало, А)'] && item['Долгота БС (начало, А)'])
                .map(item => {
                    //@ts-ignore
                    const time = item['Время подключения'].split(' ')[1]
                    //@ts-ignore
                    item.msTime = getSeconds(time)
                    //@ts-ignore
                    item.time = time
                    return item
                })
                //@ts-ignore
                .sort((a, b) => a.msTime - b.msTime)
        },
        getIndex(state) {
            console.log(884);
            return state.index
        },
        filteredItems(state): any {
            console.log(88);
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
