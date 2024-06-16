import { defineStore } from 'pinia';
import { InventoryItem } from "@/types/inventory.types";

export const useInventoryStore = defineStore('inventory', {
    state: () => ({
        inventoryItems: [] as InventoryItem[],
    }),
    actions: {
        async getInventoryItems(customCaseNumber?: number): Promise<void> {
            try {
                const baseUrl = import.meta.env.VITE_API_BASE_URL;
                if (!baseUrl) {
                    throw new Error('Base URL is not defined');
                }
                let url = customCaseNumber ? `${baseUrl}?case=${customCaseNumber}` : baseUrl;
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                if (!data.inventory) {
                    throw new Error('Invalid server response');
                }
                this.inventoryItems = data.inventory;
            } catch (error) {
                console.error('Error fetching inventory items:', error);
            }
        },
    }
});