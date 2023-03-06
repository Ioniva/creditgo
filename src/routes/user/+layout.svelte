<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { writable } from 'svelte/store';

	import { AppRail, AppRailTile, AppShell, Avatar } from '@skeletonlabs/skeleton';
	import SvgIcon from '../../lib/components/ui-library/SvgIcon/SvgIcon.svelte';
	import { page } from '$app/stores';

	// local Store
	let storeCategory = writable('home');

	page.subscribe((p) => {
		let pathMatch = p.url.pathname.split('/user/')[1];
		if (!pathMatch) return;
		if (['home', 'order'].includes(pathMatch)) {
			storeCategory.set(pathMatch);
		}
	});

	onMount(() => {
		storeCategory.subscribe((url) => {
			goto(url);
		});
	});
</script>

<!-- App Shell -->
<AppShell slotFooter="bg-black p-4">
	<!-- Header -->
	<svelte:fragment slot="header">
		<!-- <DocsAppBar /> -->
	</svelte:fragment>

	<!-- Sidebar (Left) -->
	<svelte:fragment slot="sidebarLeft">
		<!-- <DocsSidebar class="hidden lg:grid w-[360px] overflow-hidden" /> -->
		<!-- App Rail -->
		<AppRail selected={storeCategory} background="bg-white/30 dark:bg-black/30" width="w-36">
			<svelte:fragment slot="lead">
				<div class="p-4 text-center">
					<!-- <Avatar src="https://i.pravatar.cc/" width="w-full" rounded="rounded-3xl" /> -->
					<Avatar initials="JP" width="w-full" rounded="rounded-3xl" fill="fill-yellow-500" />
					<p class="p-1">Juan Perez</p>
				</div>
			</svelte:fragment>

			<hr class="opacity-30" />
			<AppRailTile label="Home" value={'home'}>
				<SvgIcon name="book" width="w-6" height="h-6" />
			</AppRailTile>
			<hr class="opacity-30" />
			<AppRailTile label="Order" value={'order'}>
				<SvgIcon name="cubes" width="w-6" height="h-6" />
			</AppRailTile>
		</AppRail>
	</svelte:fragment>

	<!-- Page Content -->
	<slot />

	<!-- Page Footer -->
	<svelte:fragment slot="pageFooter">
		<!-- <DocsFooter /> -->
	</svelte:fragment>
</AppShell>
