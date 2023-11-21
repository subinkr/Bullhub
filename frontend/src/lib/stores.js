import { readable, writable } from 'svelte/store';

export let storeName = writable('subin');
export let hostName = readable('http://localhost:4000');
export let user = writable();
export let message = writable();
