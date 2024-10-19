<template>
    <header 
        class="page-header 
                q-header 
                q-layout__section--marginal 
                fixed-top 
                q-header--bordered 
                absolute-top">
        <div class="q-toolbar row no-wrap q-px-xs" role="toolbar">
            <slot name="buttons-left" />
            <div class="col q-ml-xs q-mr-xl q-my-none">
                <slot name="title"/>
            </div>
            <slot name="buttons-right"/>
        </div>
    </header>
</template>

<script setup>

</script>