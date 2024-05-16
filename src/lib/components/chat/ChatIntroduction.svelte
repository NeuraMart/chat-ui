<script lang="ts">
	import { PUBLIC_APP_NAME, PUBLIC_VERSION } from "$env/static/public";
	import { PUBLIC_ANNOUNCEMENT_BANNERS } from "$env/static/public";
	import { PUBLIC_APP_DESCRIPTION } from "$env/static/public";
	import Logo from "$lib/components/icons/Logo.svelte";
	import { createEventDispatcher } from "svelte";
	import IconGear from "~icons/bi/gear-fill";
	import AnnouncementBanner from "../AnnouncementBanner.svelte";
	import type { Model } from "$lib/types/Model";
	import ModelCardMetadata from "../ModelCardMetadata.svelte";
	import { findCurrentModel } from "$lib/utils/models";
	import { base } from "$app/paths";
	import { useSettingsStore } from "$lib/stores/settings";
	import JSON5 from "json5";

	export let currentModel: Model;
	export let models: Model[];

	const settings = useSettingsStore();

	$: currentModelMetadata = findCurrentModel(models, $settings.activeModel);

	const announcementBanners = PUBLIC_ANNOUNCEMENT_BANNERS
		? JSON5.parse(PUBLIC_ANNOUNCEMENT_BANNERS)
		: [];

	const dispatch = createEventDispatcher<{ message: string }>();
</script>

<div class="my-auto mt-0 flex flex-col gap-8">
	<div class="lg:row-span-2 lg:mt-6">
		<p class="text-5xl">Hello Subham</p>
		<p class="text-5xl">How can I assist you today?</p>
	</div>
	<div class="lg:col-span-4 lg:mt-6">
		<p class="mb-3 text-gray-600 dark:text-gray-300">
			Confused what to search? Start with our recommendations
		</p>
		<div class="grid gap-3 lg:grid-cols-4 lg:gap-4">
			{#each currentModelMetadata.promptExamples as example}
				<button
					type="button"
					class="h-48 rounded-xl border bg-gray-50 p-3 text-gray-600 hover:bg-gray-100 max-xl:text-sm xl:p-3.5 dark:border-gray-800 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
					on:click={() => dispatch("message", example.prompt)}
				>
					{example.title}
				</button>
			{/each}
		</div>
	</div>
	<div class="h-60 sm:h-24" />
</div>
