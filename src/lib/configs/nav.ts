import type { NavItem, SidebarNavItem } from '$lib/types/nav.ts';

type NavConfig = {
	mainNav: NavItem[];
	sidebarNav: SidebarNavItem[];
};

export const navConfig: NavConfig = {
	mainNav: [
		{
			title: 'Home',
			href: '/'
		},
		{
			title: 'Documentation',
			href: '/docs'
		}
	],
	sidebarNav: [
		{
			title: 'Home',
			items: [
				{
					href: '/',
					title: 'Dashboard',
					label: 'dashboard',
					icon: 'line-md:home-md',
					items: []
				}
			]
		},
		{
			title: 'Discover',
			items: [
				{
					href: '/dis',
					title: 'dis',
					icon: 'line-md:arrow-left-circle',
					items: []
				}
			]
		},
		{
			title: 'Discover',
			items: [
				{
					href: '/dis',
					title: 'dis',
					icon: 'line-md:arrow-left-circle',
					items: []
				}
			]
		},
		{
			title: 'Discover',
			items: [
				{
					href: '/dis',
					title: 'dis',
					icon: 'line-md:arrow-left-circle',
					items: []
				}
			]
		},
		{
			title: 'Discover',
			items: [
				{
					href: '/dis',
					title: 'dis',
					icon: 'line-md:arrow-left-circle',
					items: []
				}
			]
		},
		{
			title: 'Discover',
			items: [
				{
					href: '/dis',
					title: 'dis',
					icon: 'line-md:arrow-left-circle',
					items: []
				}
			]
		},
		{
			title: 'Discover',
			items: [
				{
					href: '/dis',
					title: 'dis',
					icon: 'line-md:arrow-left-circle',
					items: []
				}
			]
		},
		{
			title: 'Discover',
			items: [
				{
					href: '/dis',
					title: 'dis',
					icon: 'line-md:arrow-left-circle',
					items: []
				}
			]
		},
		{
			title: 'Discover',
			items: [
				{
					href: '/dis',
					title: 'dis',
					icon: 'line-md:arrow-left-circle',
					items: []
				}
			]
		},
		{
			title: 'Discover',
			items: [
				{
					href: '/dis',
					title: 'dis',
					icon: 'line-md:arrow-left-circle',
					items: []
				}
			]
		},
		{
			title: 'Discover',
			items: [
				{
					href: '/dis',
					title: 'dis',
					icon: 'line-md:arrow-left-circle',
					items: []
				}
			]
		},
		{
			title: 'Discover',
			items: [
				{
					href: '/dis',
					title: 'dis',
					icon: 'line-md:arrow-left-circle',
					items: []
				}
			]
		},
		{
			title: 'Discover',
			items: [
				{
					href: '/dis',
					title: 'dis',
					icon: 'line-md:arrow-left-circle',
					items: []
				}
			]
		},
		{
			title: 'Discover',
			items: [
				{
					href: '/dis',
					title: 'dis',
					icon: 'line-md:arrow-left-circle',
					items: []
				}
			]
		},
		{
			title: 'Discover',
			items: [
				{
					href: '/dis',
					title: 'dis',
					icon: 'line-md:arrow-left-circle',
					items: []
				}
			]
		}
	]
};
