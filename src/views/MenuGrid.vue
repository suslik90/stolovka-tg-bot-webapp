<template>
  <div
    class="d-flex align-center progress-wrapper justify-center text-center"
    v-if="isLoading"
  >
    <v-progress-circular indeterminate :size="125"></v-progress-circular>
  </div>
  <div v-else>
    <div class="stiky-header pt-4">
      <CustomToolbar class="px-5">
        <template v-slot:actions>
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
          <div class="d-flex" style="position: relative">
            <v-btn
              to="/basket"
              icon="mdi-cart-outline"
              class="ml-3 toolbar-btn-icon-size primary-btn toolbar-btn"
            ></v-btn>
            <div
              class="count-in-cart primary-btn"
              v-show="mainStore.countAllInBasket > 0"
              @click="goBasket"
            >
              {{ mainStore.countAllInBasket }}
            </div>
          </div>
        </template>
      </CustomToolbar>
      <div class="menu-groups mt-6 pl-4">
        <div class="wrap-slider d-flex">
          <div
            class="slider-item"
            v-for="(name, index) in mainStore.menuGroups"
            :key="'sg_' + index"
          >
            <v-btn
              class="menu-groups__btn ma-2"
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
        <!-- <v-slide-group>
          <v-slide-group-item
            v-for="(name, index) in mainStore.menuGroups"
            :key="'sg_' + index"
          >
            <v-btn
              class="menu-groups__btn ma-2"
              rounded
              :class="{
                'secondary-btn': name != isSelected,
                'primary-btn': name == isSelected,
              }"
              @click="selectGroup(name)"
            >
              {{ name }}
            </v-btn>
          </v-slide-group-item>
        </v-slide-group> -->
      </div>
    </div>
    <div class="d-flex flex-column justify-center mb-6 mx-2">
      <MenuItem
        v-for="menuItem in activeMeals"
        :menuItem="menuItem"
        :key="menuItem.key"
      />
    </div>
  </div>
</template>

<script setup>
  import { ref, inject, computed, getCurrentInstance, onMounted } from "vue";
  import { useMainStore } from "../stores/main";
  import MenuItem from "../components/MenuItem.vue";
  import CustomToolbar from "../components/CustomToolbar.vue";
  import { API_URL, ALL_MENU_ITEMS_GROUP_NAME } from "../utils/constants";
  import { tg } from "../utils/telegram-sdk";
  import router from "../router";

  if (tg.BackButton.isVisible) tg.BackButton.hide();
  tg.enableClosingConfirmation();

  const axios = inject("axios");

  let mainStore = useMainStore();
  let isLoading = ref(false);
  let searchIsActive = ref(false);
  let searchString = ref("");
  let activeMeals = ref([]);

  let menuGroupsNames = [];
  let isSelected = ref("");

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
    axios.get(API_URL + "/menu").then(
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
  .wrap-slider {
    width: 99%;
    overflow-x: auto;
  }
  .wrap-slider::-webkit-scrollbar {
    display: none;
  }

  .stiky-header {
    position: sticky;
    top: 0;
    backdrop-filter: blur(100px);
    z-index: 10;
  }
  .progress-wrapper {
    color: var(--primary-color);
    height: 99vh;
  }
  .search-field {
    width: 100%;
    border-radius: var(--border-radius-header-btn) !important;
    color: var(--font-color-over-primary);
    .v-field {
      .v-icon {
        opacity: 1 !important;
        font-size: 28px;
      }
      &__input {
        padding-top: 8px !important;
      }
      .v-field__input::-webkit-input-placeholder,
      .v-field__input::placeholder {
        font-style: italic;
        color: var(--font-color-over-primary);
        opacity: 1 !important;
      }
    }
  }

  .count-in-cart {
    display: flex;
    align-content: center;
    justify-content: center;
    position: absolute;
    top: 25px;
    right: 10px;
    height: 15px;
    background-color: var(--background-color-white) !important;
    color: var(--primary-color) !important;
    border-radius: 16px;
    font-size: 10px;
    padding: 0 5px;
  }
  .menu-groups {
    &__btn {
      text-transform: initial !important;
      font-size: 20px;
      font-weight: 700;
    }
  }
</style>