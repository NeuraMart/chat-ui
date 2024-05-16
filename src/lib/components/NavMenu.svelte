<script lang="ts">
	import { base } from "$app/paths";

	import Logo from "$lib/components/icons/Logo.svelte";
	import { switchTheme } from "$lib/switchTheme";
	import { isAborted } from "$lib/stores/isAborted";
	import { PUBLIC_APP_NAME, PUBLIC_ORIGIN } from "$env/static/public";
	import NavConversationItem from "./NavConversationItem.svelte";
	import type { LayoutData } from "../../routes/$types";
	import type { ConvSidebar } from "$lib/types/ConvSidebar";
	import type { Model } from "$lib/types/Model";
	import { page } from "$app/stores";
	import CarbonMoon from "~icons/carbon/moon";
	import CarbonSettings from "~icons/carbon/settings";
	import CarbonAdd from "~icons/carbon/add";
	import CarbonLogin from "~icons/carbon/login";
	import CarbonBot from "~icons/carbon/bot";
	import { useSettingsStore } from "$lib/stores/settings";
	import { goto } from "$app/navigation";

	export let conversations: ConvSidebar[] = [];
	export let canLogin: boolean;
	export let user: LayoutData["user"];

	function handleNewChatClick() {
		isAborted.set(true);
	}

	const dateRanges = [
		new Date().setDate(new Date().getDate() - 1),
		new Date().setDate(new Date().getDate() - 7),
		new Date().setMonth(new Date().getMonth() - 1),
	];

	$: groupedConversations = {
		today: conversations.filter(({ updatedAt }) => updatedAt.getTime() > dateRanges[0]),
		week: conversations.filter(
			({ updatedAt }) => updatedAt.getTime() > dateRanges[1] && updatedAt.getTime() < dateRanges[0]
		),
		month: conversations.filter(
			({ updatedAt }) => updatedAt.getTime() > dateRanges[2] && updatedAt.getTime() < dateRanges[1]
		),
		older: conversations.filter(({ updatedAt }) => updatedAt.getTime() < dateRanges[2]),
	};

	const titles: { [key: string]: string } = {
		today: "Today",
		week: "This week",
		month: "This month",
		older: "Older",
	} as const;

	const nModels: number = $page.data.models.filter((el: Model) => !el.unlisted).length;

	const settings = useSettingsStore();
	// console.log(settings);
	const url: string = "/settings/" + $settings.activeModel;
	// console.log(base);
	// console.log(url);
</script>

<div
	class="sticky top-0 mb-0 flex flex-col items-center justify-between rounded-t-xl from-gray-50 px-3 py-3.5 max-sm:bg-gradient-to-t max-sm:pt-0 md:bg-gradient-to-l dark:from-gray-800/30"
>
	<a
		class="flex items-center rounded-xl pb-4 pt-2 text-lg font-semibold"
		href="{PUBLIC_ORIGIN}{base}/"
	>
		<Logo classNames="mr-1" />
		{"Neuramart"}
	</a>
	<p class="mb-6 h-px w-full bg-white" />
	<a
		href={`${base}/`}
		on:click={handleNewChatClick}
		class="flex h-10 items-center self-start rounded-3xl border bg-white px-2 py-0.5 text-center shadow-sm hover:shadow-none dark:border-gray-600 dark:bg-gray-700"
	>
		<CarbonAdd style="font-size: 22px" />
		<span class="my-2 ml-4 mr-2 w-20 text-left font-normal"> New Chat </span>
	</a>
</div>
<div
	class="scrollbar-custom flex flex-col gap-1 overflow-y-auto rounded-b-xl from-gray-50 px-3 pb-3 pt-2 max-sm:bg-gradient-to-t md:bg-gradient-to-l dark:from-gray-800/30"
>
	{#each Object.entries(groupedConversations) as [group, convs]}
		{#if convs.length}
			<h4 class="mb-1.5 mt-4 pl-0.5 text-sm text-gray-400 first:mt-0 dark:text-gray-500">
				{titles[group]}
			</h4>
			{#each convs as conv}
				<NavConversationItem on:editConversationTitle on:deleteConversation {conv} />
			{/each}
		{/if}
	{/each}
</div>
<div
	class="mt-0.5 flex flex-col gap-1 rounded-r-xl p-3 text-sm md:bg-gradient-to-l md:from-gray-50 md:dark:from-gray-800/30"
>
	{#if user?.username || user?.email}
		<form
			action="{base}/logout"
			method="post"
			class="group flex items-center gap-1.5 rounded-lg pl-2.5 pr-2 hover:bg-gray-100 dark:hover:bg-gray-700"
		>
			<span
				class="flex h-9 flex-none shrink items-center gap-1.5 truncate pr-2 text-gray-500 dark:text-gray-400"
				>{user?.username || user?.email}</span
			>
			<button
				type="submit"
				class="ml-auto h-6 flex-none items-center gap-1.5 rounded-md border bg-white px-2 text-gray-700 shadow-sm group-hover:flex hover:shadow-none md:hidden dark:border-gray-600 dark:bg-gray-600 dark:text-gray-400 dark:hover:text-gray-300"
			>
				Sign Out
			</button>
		</form>
	{/if}

	<form action="{base}/login" method="POST" target="_parent">
		<button
			type="submit"
			class="flex h-9 w-full flex-none items-center gap-1.5 rounded-lg pl-2.5 pr-2 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
		>
			<CarbonLogin style="font-size: 13px" /> Login
		</button>
	</form>

	<button
		on:click={switchTheme}
		type="button"
		class="flex h-9 flex-none items-center gap-1.5 rounded-lg pl-2.5 pr-2 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
	>
		<CarbonMoon style="font-size: 13px" /> Theme
	</button>

	<!-- <a
		href="{base}/models"
		class="flex h-9 flex-none items-center gap-1.5 rounded-lg pl-2.5 pr-2 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
	>
		<CarbonBot style="font-size: 13px" />Models
		<span
			class="ml-auto rounded-full border border-gray-300 px-2 py-0.5 text-xs text-gray-500 dark:border-gray-500 dark:text-gray-400"
			>{nModels}</span
		>
	</a> -->

	{#if $page.data.enableAssistants}
		<a
			href="{base}/assistants"
			class="flex h-9 flex-none items-center gap-1.5 rounded-lg pl-2.5 pr-2 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
		>
			Assistants
			<span
				class="ml-auto rounded-full border border-gray-300 px-2 py-0.5 text-xs text-gray-500 dark:border-gray-500 dark:text-gray-400"
				>New</span
			>
		</a>
	{/if}

	<a
		href="/"
		on:click|preventDefault={() => goto(url)}
		class="flex h-9 flex-none items-center gap-1.5 rounded-lg pl-2.5 pr-2 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
	>
		<CarbonSettings style="font-size: 13px" />Settings
	</a>
	{#if PUBLIC_APP_NAME === "HuggingChat"}
		<a
			href="{base}/privacy"
			class="flex h-9 flex-none items-center gap-1.5 rounded-lg pl-2.5 pr-2 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
		>
			About & Privacy
		</a>
	{/if}
</div>
