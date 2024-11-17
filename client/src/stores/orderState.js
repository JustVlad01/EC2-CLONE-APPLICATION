import { defineStore } from 'pinia';
import axios from 'axios';

export const orderTypes = {
  table: 1,
  room: 2,
};

export const useOrderStore = defineStore('order', {
  state: () => ({
    type: null,
    number: null,
    numberExists: false,
    customersAmount: null,
    tableNums: [],
    roomNums: [],
  }),
  actions: {
    resetType() {
      if (this.type !== null){
        this.type = null;
      }else{
        this.type = null;
        this.number = null;
        window.history.back();
      }
    },
    async fetchTables(restaurantId) {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/tables/${restaurantId}`);
        this.tableNums = response.data.map((table) => table.number); // Extract table numbers
      } catch (error) {
        console.error('Error fetching tables:', error);
      }
    },
    async fetchRooms(restaurantId) {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/rooms/${restaurantId}`);
        this.roomNums = response.data.flatMap((room) =>
            room.rooms.map((range) => ({ from: range.from, to: range.to }))
        ); // Extract room ranges
      } catch (error) {
        console.error('Error fetching rooms:', error);
      }
    },
    checkNumberExists() {
      if (this.type === orderTypes.table) {
        this.numberExists = this.tableNums.includes(this.number);
      } else if (this.type === orderTypes.room) {
        this.numberExists = this.roomNums.some(
            (range) => this.number >= range.from && this.number <= range.to
        );
      }
    },
  },
});