import { defineStore } from 'pinia';
import { reactive } from 'vue';
import axios from "axios";

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
            id: Date.now() + Math.random(), // Add unique ID to category
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
            id: Date.now() + Math.random(), // Add unique ID to item
            title: '',
            description: '',
            price: '',
            availability: true,
            discountPrice: '',
            allergens: [],
            imageUrl: ''
        });
    };

    const submitMenu = async () => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/menu/create`,
                menu,
                { withCredentials: true }
            );
            console.log('Menu submitted successfully:', response.data);
        } catch (error) {
            console.error('Error submitting menu:', error);
        }
    };

    return { menu, addCategory, removeCategory, addItemToCategory, submitMenu };
});