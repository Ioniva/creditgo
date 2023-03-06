<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { writable } from 'svelte/store';

	import { AppRail, AppRailTile, AppShell, Avatar } from '@skeletonlabs/skeleton';
	import SvgIcon from '../../lib/components/ui-library/SvgIcon/SvgIcon.svelte';

	// local Store
	let storeCategory = writable('transactions');

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
					<Avatar initials="L" width="w-full" rounded="rounded-3xl" fill="fill-green-400" />
					<p class="p-1">Lender</p>
				</div>
			</svelte:fragment>

			<hr class="opacity-30" />
			<AppRailTile label="Transacciones" value={'transactions'}>
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
