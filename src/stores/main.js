import { defineStore } from 'pinia'
import { findIndex, sumBy, round } from 'lodash'
import { ROUND_AFTER_DOT, ALL_MENU_ITEMS_GROUP_NAME } from '../utils/constants'

export const useMainStore = defineStore('main', {
    state: () => {
        return {
            basket: [],
            menu: [],
            groups: []
        }
    },
    getters: {
        totalOrderPrice(state) {
            return round(sumBy(state.basket, "totalPrice"), ROUND_AFTER_DOT);
        },
        countAllInBasket(state) {
            return sumBy(state.basket, 'count');
        },
        countInBasket(state) {
            return (mealName) => {
                let existedItem = state.basket.find((basketItem) => basketItem.name === mealName);
                return existedItem ? existedItem.count : 0;
            }
        },
        actualityMenu(state) {
            return state.menu;
        },
        menuGroups(state) {
            return state.groups
        }
    },
    actions: {
        setMenu(_menu) {
            this.menu = _menu;
        },
        setMenuGroups(_groups) {
            this.groups = _groups;
        },
        addToBasket(item) {
            let existedIndex = findIndex(this.basket, { name: item.name });
            if (existedIndex > -1) {
                let existedItem = this.basket[existedIndex];
                existedItem.count += 1;
                existedItem.totalPrice = round(existedItem.count * existedItem.price, ROUND_AFTER_DOT);
                this.basket[existedIndex] = existedItem;
            } else {
                item.count = 1;
                item.totalPrice = round(item.count * item.price, ROUND_AFTER_DOT);
                delete item.image;
                this.basket.push(item);
            }
        },
        removeFromBasket(item) {
            let existedIndex = findIndex(this.basket, { name: item.name });
            if (existedIndex > -1) {
                let existedItem = this.basket[existedIndex];
                existedItem.count -= 1;
                if (existedItem.count <= 0) {
                    this.basket = this.basket.filter(basketItem => item.name !== basketItem.name);
                } else {
                    existedItem.totalPrice = round(existedItem.count * existedItem.price, ROUND_AFTER_DOT);
                    this.basket[existedIndex] = existedItem;
                }
            }
        },
        removeForceFromBasket(item) {
            this.basket = [...this.basket.filter(basketItem => item.name !== basketItem.name)];
        },
        clearBasket() {
            this.basket = [];
        }
    }
})
