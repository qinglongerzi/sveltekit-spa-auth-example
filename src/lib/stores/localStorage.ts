import { writable, type Writable } from 'svelte/store';

export function persist<T>(key: string, initial: T): Writable<T> {
	let data: T = initial;

	if (typeof window !== 'undefined') {
		const storedValue = localStorage.getItem(key);
		if (storedValue) {
			data = JSON.parse(storedValue) as T;
		}
	}

	const store = writable<T>(data);

	if (typeof window !== 'undefined') {
		store.subscribe((value) => {
			localStorage.setItem(key, JSON.stringify(value));
		});
	}

	return store;
}
