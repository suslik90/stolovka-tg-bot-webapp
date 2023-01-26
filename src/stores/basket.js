import { defineStore } from 'pinia'
import { findIndex, sumBy, round } from 'lodash'
import { ROUND_AFTER_DOT } from '../utils/constants'

export const useBasketStore = defineStore('basket', {
    state: () => {
        return {
            basket: []
        }
    },
    getters: {
        totalOrderPrice(state){
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
        }
    },
    actions: {
        addToBasket(item) {
            let existedIndex = findIndex(this.basket, { name: item.name });
            if (existedIndex > -1) {
                let existedItem = this.basket[existedIndex];
                existedItem.count += 1;
                existedItem.totalPrice = round(existedItem.count * existedItem.cost, ROUND_AFTER_DOT);
                this.basket[existedIndex] = existedItem;
            } else {
                item.count = 1;
                item.totalPrice = round(item.count * item.cost, ROUND_AFTER_DOT);
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
                    this.basket[existedIndex] = existedItem;
                }
            }
        },
        removeForceFromBasket(item) {
            this.basket = [...this.basket.filter(basketItem => item.name !== basketItem.name)];
        }
    }
})
