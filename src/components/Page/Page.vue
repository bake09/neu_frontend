<template>
    <div class="page absolute-top fit bg-white" :class="$q.screen.lt.sm ? 'shadow-4' : ''">
        <div 
            class="page-nudger fit"
            :class="{'nudge-left' : hasActiveChildPage}"
            v-touch-swipe.mouse.right="triggerUseGoBack"
        >
            <slot />
        </div>

        <router-view v-slot="{ Component }" >
            <transition 
                appear
                enter-active-class="animated slideInRight"
                leave-active-class="animated slideOutRight"
                :css="navigationStore.usePageTransition"
            >
                <keep-alive>
                    <component 
                        @pageActivated="hasActiveChildPage = true"
                        @pageDeactivated="hasActiveChildPage = false"
                        :is="Component"
                    />
                </keep-alive>
            </transition>
        </router-view>
    </div>
</template>

<script setup>
    import { onActivated, onDeactivated, ref } from 'vue'
    import useGoBack from "src/use/useGoBack";

    import { useNavigationStore } from 'stores/navigation-store'
    const navigationStore = useNavigationStore()
    
    import { useQuasar } from 'quasar'
    const $q = useQuasar()

    let hasActiveChildPage = ref(false)
    const emit = defineEmits(['pageActivated', 'pageDeactivated'])
    
    onActivated(() => {
        emit('pageActivated')
    })

    onDeactivated(() => {
        emit('pageDeactivated')
    })

    // disable swipe right in ChatPage because swiping is used here!
    import { useRoute } from "vue-router"
    const route = useRoute()
    const triggerUseGoBack = (ev) => {
        // console.log('ev :>> ', ev);
        if(route.name != 'chat'){
            useGoBack()
        }
    }
</script>