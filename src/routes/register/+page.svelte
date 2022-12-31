<script>
	import { ProgressBar, Step, Stepper } from "@skeletonlabs/skeleton";
    import { writable } from "svelte/store";
	import AccountData from "../../lib/components/register/AccountData.svelte";
    const active = writable(0);
    const onComplete = () => {
        alert("Has completado!")
    }
</script>

<div class="container mx-auto">
    <h1 class="my-8">Register page</h1>
    <Stepper {active} length={2} on:complete={onComplete}>
        <Step index={0}>
            <svelte:fragment slot="header">
                <span class="text-3xl font-bold">Datos de tu cuenta</span>
            </svelte:fragment>
            <AccountData></AccountData>
        </Step>
        <Step index={1} locked={false}>(content)</Step>
    </Stepper>
</div>
