import { persist } from './localStorage';

interface Session {
	user: App.Locals['user'];
	isAuthenticated: boolean;
}

export const session = persist<Session>('session', {
	user: null,
	isAuthenticated: false
});
