import { defineStore } from 'pinia'
import { findIndex, sumBy, round } from 'lodash'
import { ROUND_AFTER_DOT, BASKET_KEY } from '@/utils/constants'
import localStorage from '@/utils/localStorage';

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
        getItemByKey(state) {
            return (key) => {
                let meals = [];
                state.menu.map((groupItem) => {
                    meals = meals.concat(groupItem.meals);
                });
                return meals.find((mealItem) => mealItem.key === key);
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
        async setMenu(_menu) {
            this.menu = _menu;
            const localSavedBasket = await localStorage.getObject(BASKET_KEY);
            if (Object.keys(localSavedBasket).length > 0) {
                let onlyMeals = [];
                this.menu.map((mItem) => {
                    onlyMeals = onlyMeals.concat(mItem.meals);
                });

                const existedBasketItems = localSavedBasket.filter((bItem) => {
                    const findedBasketItemInMenu = onlyMeals.find((oMeal) => oMeal.name.trim().toLowerCase() === bItem.name.trim().toLowerCase())
                    if (findedBasketItemInMenu != undefined) {
                        return bItem;
                    }
                });

                this.basket = existedBasketItems;
                localStorage.setObject(BASKET_KEY, this.basket);
            }
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
            localStorage.setObject(BASKET_KEY, this.basket);
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

                localStorage.setObject(BASKET_KEY, this.basket);
            }
        },
        removeForceFromBasket(item) {
            this.basket = [...this.basket.filter(basketItem => item.name !== basketItem.name)];
            localStorage.setObject(BASKET_KEY, this.basket);
        },
        clearBasket() {
            this.basket = [];
            localStorage.deleteItem(BASKET_KEY);
        }
    }
})
