<script lang="ts">
	export let classNames = "";
	import { Skeleton } from "$lib/components/ui/skeleton/index.js";
</script>

<div class={"inline-flex h-8 flex-none items-center gap-1 " + classNames}>
	<div class="flex items-center space-x-4">
		<Skeleton class="h-12 w-12 rounded-full" />
		<div class="space-y-2">
			<Skeleton class="h-4 w-[500px]" />
			<Skeleton class="h-4 w-[200px]" />
		</div>
	</div>
</div>
