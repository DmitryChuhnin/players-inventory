export interface InventoryItem {
    id: number;
    name: string;
    type: 'armor' | 'weapon' | 'misc';
    imageUrl: string;
    count?: number;
    charges?: number;
    maxCharges?: number;
    cooldown?: number;
}