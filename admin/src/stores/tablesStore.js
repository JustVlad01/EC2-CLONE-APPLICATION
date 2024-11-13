import { defineStore } from 'pinia';
import { reactive } from 'vue';
import axios from "axios";

export const useTablesStore = defineStore('tableStore', () => {

    let tables = reactive([]);
    let rooms = reactive([]);

    async function getTables() {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/tables/`, {withCredentials: true});
            tables.splice(0, tables.length, ...response.data);
        } catch (error) {
            console.error(error);
        }
    }

    async function getRooms() {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/rooms/`, {withCredentials: true});
            rooms.splice(0, rooms.length, ...response.data);
        } catch (error) {
            console.error(error);
        }
    }

    async function deleteTable(id) {
        try {
            await axios.delete(`${import.meta.env.VITE_API_URL}/tables/${id}`, {withCredentials: true});
            await getTables();
        } catch (error) {
            console.error(error);
        }
    }

    async function deleteRoom(id) {
        try {
            await axios.delete(`${import.meta.env.VITE_API_URL}/rooms/${id}`, {withCredentials: true});
            await getRooms();
        } catch (error) {
            console.error(error);
        }
    }

    return { getTables, getRooms, deleteTable, deleteRoom, tables, rooms };
});