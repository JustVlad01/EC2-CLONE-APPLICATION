// stores/menuStore.js
import { defineStore } from 'pinia';
import { reactive } from 'vue';

export const useMenuStore = defineStore('menuStore', () => {
    const menu = reactive({
        title: '',
        shortTitle: '',
        description: '',
        timeRange: { start: '', end: '' },
        categories: []
    });

    const addCategory = () => {
        menu.categories.push({
            name: '',
            description: '',
            items: []
        });
    };

    const removeCategory = (index) => {
        menu.categories.splice(index, 1);
    };

    const addItemToCategory = (categoryIndex) => {
        menu.categories[categoryIndex].items.push({
            title: '',
            description: '',
            price: '',
            availability: true,
            discountPrice: '',
            allergens: []
        });
    };

    const submitMenu = () => {
        // Here, make the API call to submit `menu`
        console.log('Submitting menu:', JSON.stringify(menu, null, 2));
    };

    return { menu, addCategory, removeCategory, addItemToCategory, submitMenu };
});