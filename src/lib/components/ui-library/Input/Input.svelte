<script>
    export let value = '';
    export let placeholder = '';
    export let id;
    export let label;
    export let type = 'text';
    export let disabled = false;
    export let required = false;
    export let errors;
</script>

<div class="mb-6 w-full group">
    <label>
        <span class="text-base font-bold">{label}</span>
        <input {type} {id} name={id} {placeholder} {required} {disabled} {value} />
    </label>
    {#if errors}
        <ul>
            {#each errors as error}
                <label for={id} class="text-red-500 py-0 pt-1">
                    {error}
                </label>
            {/each}
        </ul>
    {/if}
</div>
