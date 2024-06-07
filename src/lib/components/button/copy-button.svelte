<script lang="ts">
	import { cn } from '$lib/utils.js';
	import Icon from '@iconify/svelte';

	let copied = false;
	let className: string | undefined | null = undefined;
	export let value = '';
	export { className as class };

	function copyDone() {
		copied = true;
		setTimeout(() => {
			copied = false;
		}, 1500);
	}

	function copyText() {
		navigator.clipboard.writeText(value);
		copyDone();
	}
</script>

<button
	class={cn(
		'absolute right-4 top-4 z-10 inline-flex h-6 w-6 items-center justify-center rounded-md text-sm font-medium text-zinc-50 transition-colors hover:bg-zinc-700 hover:text-zinc-50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
		className
	)}
	on:click={copyText}
	{...$$restProps}
>
	<span class="sr-only">Copy</span>
	{#if copied}
		<Icon icon="lucide:check" />
	{:else}
		<Icon icon="lucide:copy" />
	{/if}
</button>
