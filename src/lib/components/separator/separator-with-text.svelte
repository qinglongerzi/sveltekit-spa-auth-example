<script lang="ts">
	import { cn } from '$lib/utils';
	import type { HTMLAttributes } from 'svelte/elements';
	type $$Props = HTMLAttributes<HTMLDivElement>;
	let className: $$Props['class'] = undefined;
	export { className as class };
</script>

<div class={cn('relative', className)}>
	<div class="absolute inset-0 flex items-center">
		<span class="w-full border-t" />
	</div>
	<div class="relative flex justify-center text-xs uppercase">
		<span class="bg-card px-2 text-muted-foreground"><slot /></span>
	</div>
</div>
