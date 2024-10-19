<template>
    <!-- <div class="page-header-btn-right absolute-bottom-right q-mb-xs q-mr-xs"> -->
        <q-btn icon="more_vert" round flat>
            <q-menu
                :offset="[-38, 0]"
                transition-show="scale"
                transition-hide="scale"
                self="top right"
            >
                <q-tabs
                    style="min-width: 140px"
                    inline-label
                    align="justify"
                    vertical
                    indicator-color="transparent"
                    class="text-grey-8"
                    >
                    <q-route-tab to="/home" exact icon="mail" label="Home" style="justify-content: start;" active-class="text-black" />
                    <q-route-tab to="/whatsapp" exact icon="lab la-whatsapp" label="Whatsapp" style="justify-content: start;" active-class="text-black" />
                    <q-route-tab to="/home/child" exact  icon="alarm" label="Child" style="justify-content: start;" active-class="text-black" />
                    <q-separator />
                    <q-route-tab to="/home/child/grandchild" exact icon="movie" label="Grandchild" style="justify-content: start;" active-class="text-black" />
                </q-tabs>
            </q-menu>
        </q-btn>
    <!-- </div> -->
</template>

<script setup>

</script>