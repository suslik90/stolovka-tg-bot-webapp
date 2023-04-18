<template>
  <div
    class="d-flex align-center progress-wrapper justify-center text-center"
    v-if="isLoading"
  >
    <v-progress-circular indeterminate :size="125"></v-progress-circular>
  </div>
  <div v-else>
    <div class="stiky-header">
      <div class="wrapper">
        <div class="search-wrapper">
          <v-text-field
            class="search-field primary-btn px-3 align-center"
            v-model="searchString"
            clearable
            clear-icon="mdi-close"
            density="compact"
            hide-details="auto"
            variant="plain"
            placeholder="Введите название блюда"
            @input="search"
            @click:clear="clearSearch"
          >
            <template v-slot:prepend-inner>
              <v-icon icon="mdi-magnify" color="font-color-over-primary" />
            </template>
          </v-text-field>
          <div class="cart" v-ripple @click="goBasket">
            <div class="cart__counter" v-show="mainStore.countAllInBasket > 0">
              {{ mainStore.countAllInBasket }}
            </div>
          </div>
        </div>
      </div>
      <div class="menu-groups mt-3 pb-2">
        <div
          class="wrap-slider d-flex"
          ref="scroller"
          @wheel.prevent="onWheel"
          :scroll-left.camel="scrollLeft"
        >
          <div
            class="slider-item"
            v-for="(name, index) in mainStore.menuGroups"
            :class="{ 'pl-3': index == 0 }"
            :key="'sg_' + index"
          >
            <v-btn
              size="small"
              variant="flat"
              class="menu-groups__btn ma-1 text-none"
              rounded
              :class="{
                'secondary-btn': name != isSelected,
                'primary-btn': name == isSelected,
              }"
              @click="selectGroup(name)"
            >
              {{ name }}
            </v-btn>
          </div>
        </div>
      </div>
    </div>
    <div class="wrapper">
      <div class="items-list" v-bind:class="{ 'desktop-template': !isMobile}">
        <MenuItem
          v-for="menuItem in activeMeals"
          :menuItem="menuItem"
          :key="menuItem.key"
        ></MenuItem>
      </div>
      <!-- <div class="toup-btn">Наверх</div> -->
    </div>
  </div>
</template>

<script setup>
  import { inject, onMounted, ref } from "vue";
  import MenuItem from "@/components/MenuItem.vue";
  import { useRouter } from "vue-router";
  import { useMainStore } from "@/stores/main";
  import { ALL_MENU_ITEMS_GROUP_NAME, API_URL } from "@/utils/constants";
  import { tg } from "@/utils/telegram-sdk";

  if (tg.BackButton.isVisible) tg.BackButton.hide();

  const axios = inject("axios");
  const router = useRouter();

  let mainStore = useMainStore();
  let isLoading = ref(false);
  let searchString = ref("");
  let activeMeals = ref([]);

  let menuGroupsNames = [];
  let isSelected = ref("");

  let scroller = ref(null);
  let scrollLeft = ref(0);

  const isMobile = mainStore.getMobile;

  const { min, max } = Math;

  function onWheel(e) {
    scrollLeft.value = scroller
      ? min(
          scroller.value.scrollWidth - scroller.value.offsetWidth,
          max(0, e.deltaY + scrollLeft.value)
        )
      : scrollLeft.value;
  }

  function setActiveMeals(_groupName) {
    let groupMeals = [];
    let menuGroups = mainStore.actualityMenu;
    if (_groupName == ALL_MENU_ITEMS_GROUP_NAME) {
      menuGroups
        .filter(
          (menuGroupItem) => menuGroupItem.category != ALL_MENU_ITEMS_GROUP_NAME
        )
        .map((groupItem) => {
          groupMeals = groupMeals.concat(groupItem.meals);
        });
    } else {
      let groupItem = menuGroups.find(
        (groupItem) => groupItem.category == _groupName
      );
      groupMeals = groupItem.meals;
    }
    activeMeals.value = groupMeals;
    searchString.value = "";
  }

  function selectGroup(selectedName) {
    isSelected.value = selectedName;
    setActiveMeals(selectedName);
  }
  function clearSearch() {
    setActiveMeals(isSelected.value);
  }
  function search() {
    const searchValue = searchString.value.toLowerCase();
    let menuGroups = mainStore.actualityMenu;
    if (searchValue == "") {
      clearSearch();
    } else {
      let arrayMealsForSearch = [];
      let groupMeals = [];

      if (isSelected.value == ALL_MENU_ITEMS_GROUP_NAME) {
        menuGroups
          .filter(
            (menuGroupItem) => menuGroupItem.category != ALL_MENU_ITEMS_GROUP_NAME
          )
          .map((groupItem) => {
            groupMeals = groupMeals.concat(groupItem.meals);
          });
        arrayMealsForSearch = groupMeals;
      } else {
        const groupItem = menuGroups.find(
          (groupItem) => groupItem.category == isSelected.value
        );
        arrayMealsForSearch = groupItem.meals;
      }

      let filteredActiveMeals = arrayMealsForSearch.filter((meal) => {
        return (
          meal.name.toLowerCase().includes(searchValue) ||
          meal.description.toLowerCase().includes(searchValue)
        );
      });
      activeMeals.value = filteredActiveMeals;
    }
  }

  function goBasket() {
    router.push({ path: "/basket" });
  }

  function genRandonString(length) {
    var chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    var charLength = chars.length;
    var result = "";
    for (var i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * charLength));
    }
    return result;
  }

  onMounted(() => {
    isLoading.value = true;
    axios.get(API_URL + "/menu ").then(
      (response) => {
        const menuWithKeys = response.data.menu.map((category) => {
          category.meals.map((mealItem) => {
            mealItem.key = genRandonString(10);
            return mealItem;
          });
          return category;
        });
        mainStore.setMenu(menuWithKeys);
        isLoading.value = false;
        menuGroupsNames = mainStore.actualityMenu.map(
          (menuGroupItem) => menuGroupItem.category
        );
        menuGroupsNames.unshift(ALL_MENU_ITEMS_GROUP_NAME);
        mainStore.setMenuGroups(menuGroupsNames);

        isSelected.value = menuGroupsNames[0];
        setActiveMeals(isSelected.value);
      },
      (error) => {}
    );
  });
</script>
<style lang="scss">
  @import "@/assets/width.scss";

  .progress-wrapper {
    color: rgb(var(--v-theme-primary));
    height: 99vh;
  }
  .wrap-slider {
    width: 100%;
    overflow-x: auto;
  }
  .wrap-slider::-webkit-scrollbar {
    display: none;
  }

  .menu-groups__btn {
    .v-btn__content {
      font-size: 15px !important;
      font-weight: 700;
    }
  }

  .stiky-header {
    position: sticky;
    top: 0;
    background-color: rgb(var(--v-theme-background));
    z-index: 10;
  }
  /*Страница категории*/
  //search
  .search-field {
    width: 100%;
    height: 100%;
    border-radius: var(--border-radius-header-btn) !important;
    color: rgb(var(--v-theme-font-color-over-primary));
    .v-field {
      .v-icon {
        opacity: 1 !important;
        font-size: 28px;
      }
      &__input {
        padding-top: 10px !important;
        font-size: 15px;
      }
      .v-field__input::-webkit-input-placeholder,
      .v-field__input::placeholder {
        color: rgb(var(--v-theme-font-color-over-primary));
        opacity: 1 !important;
      }
    }
  }
  .search-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 44px;
  }
  .search-input-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
    &:before {
      content: "";
      position: absolute;
      left: 14px;
      top: 0;
      bottom: 0;
      background: url("/img/search.svg") no-repeat center/contain;
      width: 21px;
      height: 21px;
      margin: auto;
    }
    input {
      width: 100%;
      height: 100%;
      padding: 12px 46px;
      color: rgb(var(--v-theme-white));
      background: rgb(var(--v-theme-primary));
      box-sizing: border-box;
      border: none;
      border-radius: 16px;
      outline: none;
      &::placeholder {
        color: rgb(var(--v-theme-white));
        font-size: 15px;
        font-weight: 400;
      }
    }
  }
  .clear-search {
    position: absolute;
    right: 10px;
    top: 0;
    bottom: 0;
    background: url("/img/cross.svg") no-repeat center/contain;
    width: 24px;
    height: 24px;
    margin: auto;
  }
  .cart {
    position: relative;
    width: 44px;
    height: 44px;
    background: rgb(var(--v-theme-primary)) url("/img/cart.svg") no-repeat
      center/24px;
    border-radius: 16px;
    margin-left: 12px;
    flex: none;
  }
  .cart__counter {
    position: absolute;
    left: 20px;
    top: 19px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 16px;
    height: 16px;
    box-sizing: border-box;
    background: rgb(var(--v-theme-white));
    border-radius: 50%;
    border: 1px solid rgb(var(--v-theme-primary));
    color: rgb(var(--v-theme-primary));
    font-size: 10px;
    font-weight: 700;
  }
  //categories-menu
  .categories-menu-wrapper {
    max-width: var($maxWidth);
    width: 100%;
    margin: auto;
    overflow-x: scroll;
    &::-webkit-scrollbar {
      width: 0;
      height: 0;
    }
  }
  .categories-menu {
    display: flex;
    justify-content: center;
    align-items: center;
    grid-column-gap: 13px;
    padding: 15px 0;
  }
  .category {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 27px;
    padding: 0 10px;
    background: var(--secondary-color);
    border-radius: 28px;
    font-size: 15px;
    font-weight: 700;
    color: rgb(var(--v-theme-white));
  }
  .current-category {
    background: rgb(var(--v-theme-primary));
  }
  //item-list
  .items-list.desktop-template {
    display: grid;
    grid-gap: 28px;
    grid-template-columns: 1fr 1fr;
    .item-card {
      box-sizing: border-box;
      display: block;
      max-width: 244px;
      margin-bottom: 0;
    }
    .item-image {
      width: 100%;
      height: 208px;
      margin-right: 0;
      img {
        width: 100%;
      }
    }
    .item-name {
      margin: 15px 0;
    }
    .item-order-btn {
      height: 43px;
      margin: 0 auto 15px;
      width: 100%;
    }
    .item-mark {
      width: 38.5px;
      height: 33px;
    }
    .item-mark__cold {
      background: url("/img/cold.svg") no-repeat center/21px;
    }
  }

  .toup-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--secondary-color);
    max-width: 242px;
    width: 100%;
    height: 43px;
    margin: 40px auto auto auto;
    border-radius: 28px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    font-size: 20px;
    font-weight: 600;
    color: rgb(var(--v-theme-white));
  }
</style>