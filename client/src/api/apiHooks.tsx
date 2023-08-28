import React, { useState } from 'react';
import useSWR from 'swr';
import { UUID } from 'crypto';

const token = localStorage.getItem("AuthProviderToken");
const fetcher = url => fetch(url, { headers: {'Authorization': `Bearer ${token}` } }).then(res => res.json())

interface Item {
    id: UUID,
    stats: any,
    rarity: number,
    type: string,
}

interface Inventory {
    others: {
        log: any[],
    },
    uuids: Item[]
}

interface Action {
    type: string,
    status: string,
    data: any,
}

interface PlayerData {
    lastAction: Action & {
        createdAt: Date,
        updatedAt: Date,
    },
    actions: Action[],
    id: number,
    name: string,
    stats: {
        attack: number,
        defense: number,
        health: number,
    },
    pos: {
        x: number,
        y: number,
    }
    currentActions: number,
    inventories: Inventory[],
    path?: any[],
};

/**
 * Hit /action/last every 6 seconds.
 * @returns {PlayerData} 
 */
function usePlayer () {
    const { data, error, isLoading } : {data: PlayerData, error: any, isLoading: any} = useSWR("action/last", fetcher, { refreshInterval: 6000 });

    return {
        player: data,
        isLoading,
        error,
    }
}

function useInventory() {
    const { data, error, isLoading } = useSWR("users/inventory", fetcher, { refreshInterval: 1000 });

    return {
        inventory: data,
        isLoading,
        error,
    }
}

export {
    usePlayer,
    useInventory,
}