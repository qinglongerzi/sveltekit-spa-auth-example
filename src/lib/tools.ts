import type { RequestEvent, Page } from '@sveltejs/kit';

export const loginUrl = (url: RequestEvent['url']) => {
	const fromUrl = encodeURIComponent(url.pathname + url.search);
	const baseLoginUrl = '/auth/login';
	return `${baseLoginUrl}?continue=${fromUrl}`;
};

export const continueUrl = (url: Page['url'] | RequestEvent['url']) => {
	const fromUrl = url.searchParams.get('continue') || '/';
	// continue=https://otherdomain にredirectを防止
	return `/${fromUrl?.slice(1)}`;
};
