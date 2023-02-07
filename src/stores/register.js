import { writable } from 'svelte/store';

export const accountStore = writable(

    {
        email: '',
        password: '',
        isLast: false
    }

);
