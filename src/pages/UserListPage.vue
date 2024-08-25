<template>
  <q-page padding>
    <div class="text-h4">Users Page</div>
    <q-table
      dense
      title="Users Page"
      row-key="name"
      :rows="userStore.users"
      :columns="userStore.columns"
      :loading="userStore.usersIsLoading"
      separator="cell"
      :selected-rows-label="getSelectedString"
      selection="multiple"
      v-model:selected="selected"
    >
      <!-- Example: https://codepen.io/metalsadman/pen/ZgKexK?editors=1010 --> 
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn size="sm" round flat color="grey" @click="userStore.openEditModal(props.row)" icon="edit"></q-btn>
          <q-btn size="sm" round flat color="red-3" @click="deleteUser(props)" icon="delete"></q-btn>
        </q-td>          
      </template>
    </q-table>

    <q-dialog v-model="userStore.editModalShowing" @before-hide="userStore.hideEditModal" :position="$q.screen.gt.sm ? 'standard' : 'bottom'">
      <q-card>
        <q-card-section class="relative-position q-pb-sm">
          <div class="dialoghandle" v-if="$q.screen.lt.md"></div>
          <div class="text-h6">Heading</div>
        </q-card-section>

        <q-separator />

        <q-card-section style="max-height: 50vh" class="scroll">
          <div class="row q-col-gutter-md">
            <!-- <q-form autocorrect="off" autocapitalize="off" autocomplete="off" spellcheck="false">
            </q-form> -->
              <q-input class="col-4 col-md-2"   readonly  dense outlined v-model="userStore.selectedItem.id" label="ID" />
              <q-input class="col-8 col-md-10"  readonly  dense outlined v-model="userStore.selectedItem.email_verified_at" label="Email Verified At" />
              
              <q-input class="col-12 col-md-6"  clearable clear-icon="close" dense outlined v-model="userStore.selectedItem.name" label="Name" />
              <q-input class="col-12 col-md-6"  clearable clear-icon="close" dense outlined v-model="userStore.selectedItem.email" label="Email" />
              
              <q-input class="col-6 col-md-6"  readonly  dense outlined v-model="userStore.selectedItem.created_at" label="Created At" />
              <q-input class="col-6 col-md-6"  readonly  dense outlined v-model="userStore.selectedItem.updated_at" label="Updated At" />
          </div>
          
          <!-- <p v-for="n in 15" :key="n">Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repellendus sit voluptate voluptas eveniet porro. Rerum blanditiis perferendis totam, ea at omnis vel numquam exercitationem aut, natus minima, porro labore.</p> -->
        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
          <q-btn flat label="Decline" color="primary" v-close-popup />
          <q-btn flat label="Accept" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-card class="slide-drawer slide-drawer--bottom text-white fixed-bottom column no-wrap" :style="drawerStyle" >
      <q-card-section class="slide-drawer__handler--horizontal row justify-center" v-touch-pan.mouse="slideDrawer">
        <div></div>
      </q-card-section>
      <q-scroll-area :style="scrollStyle">
        <q-card-section class="col">
          <div class="text-h6">Our Changing Planet</div>
          <div class="text-subtitle2">by John Doe</div>
          <div>{{ lorem }}</div>
          <div class="text-h6">Our Changing Planet</div>
          <div class="text-subtitle2">by John Doe</div>
          <div>{{ lorem }}</div>
          <div class="text-h6">Our Changing Planet</div>
          <div class="text-subtitle2">by John Doe</div>
          <div>{{ lorem }}</div>
          <div class="text-h6">Our Changing Planet</div>
          <div class="text-subtitle2">by John Doe</div>
          <div>{{ lorem }}</div>
          <div class="text-h6">Our Changing Planet</div>
          <div class="text-subtitle2">by John Doe</div>
          <div>{{ lorem }}</div>
          <div class="text-h6">Our Changing Planet</div>
          <div class="text-subtitle2">by John Doe</div>
          <div>{{ lorem }}</div>
          <div class="text-h6">Our Changing Planet</div>
          <div class="text-subtitle2">by John Doe</div>
          <div>{{ lorem }}</div>
          <div class="text-h6">Our Changing Planet</div>
          <div class="text-subtitle2">by John Doe</div>
          <div>{{ lorem }}</div>
          <div class="text-h6">Our Changing Planet</div>
          <div class="text-subtitle2">by John Doe</div>
          <div>{{ lorem }}</div>
          <div class="text-h6">Our Changing Planet</div>
          <div class="text-subtitle2">by John Doe</div>
          <div>{{ lorem }}</div>
        </q-card-section>
      </q-scroll-area>
    </q-card>
  </q-page>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { useQuasar } from 'quasar'
const $q = useQuasar()

import { useUserStore } from "stores/user-store";
const userStore = useUserStore()

const columns = [
  { name: 'id', label: 'id', align: 'left', field: 'id', sortable: true },
  { name: 'name', label: 'name', align: 'left', field: 'name', sortable: true },
  { name: 'email', label: 'email', field: 'email', sortable: true },
  { name: "actions", label: "Actions", field: "actions" }
]

const rows = [
  {
    id: 1,
    name: 'Frozen 1',
    email: 'test@test.com',
  },
  {
    id: 2,
    name: 'Frozen 2',
    email: 'test2@test.com',
  },
  {
    id: 3,
    name: 'Frozen 3',
    email: 'test3@test.com',
  },
]

const selected = ref([])
const getSelectedString = () => {
  return selected.value.length === 0 ? '' : `${selected.value.length} record${selected.value.length > 1 ? 's' : ''} selected of ${rows.length}`
}

onMounted(async () => {
  await userStore.allUsers()
  console.log("$q.screen : ", $q.screen)
  console.log("screen : ", $q.screen.gt.md)
})

const lorem = ref('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.')

const drawerPos = ref(90)

const slideDrawer = (ev) => {
  const { height } = $q.screen
  drawerPos.value = Math.max(40, Math.min(height, drawerPos.value - ev.delta.y))
  
  if (ev.isFinal === true) {
    if (drawerPos.value / height > 0.65) {
      animateDrawerTo(height-50)
    }
    else if (drawerPos.value / height > 0.15) {
      animateDrawerTo(Math.round(height / 2))
    }
    else {
      animateDrawerTo(40)
    }
  }
}
    
const animateDrawerTo = (height) => {
  const diff = height - drawerPos.value
  
  if (diff !== 0) {
    drawerPos.value += Math.abs(diff) < 2 ? diff : Math.round(diff / 2)
    setTimeout(() => {
      animateDrawerTo(height)
    }, 30)
  }
}

const scrollStyle = computed(() => {
  const { height } = $q.screen;
  
  return {
    height: `${drawerMode === 'full' ? (height - 40) : (height / 2 - 40)}px`
  }
})

const drawerStyle = computed(() => {
  return {
    height: `${$q.screen.height}px`,
    transform: `translateY(${-drawerPos.value}px`
  }
})
    
const drawerMode = computed(() => {
  const { height } = $q.screen
  
  if (drawerPos.value / height > 0.65) {
    return 'full'
  }
  
  return drawerPos.value / height > 0.15
    ? 'half'
    : 'handler'
})

</script>

<style >
.desktopdialog{
  width: 70vw;
  max-width: 70vw !important;
}

.dialoghandle{
  position: absolute;
  top: 10px; 
  width: 60px; 
  height: 4px; 
  border-radius: 4px; 
  background-color: rgba(200, 200, 200, 0.7); 
  left: 50%;
  transform: translateX(-50%);
  cursor: grab;
}

::-webkit-scrollbar {
    height: 12px;
    width: 14px;
    background: transparent;
    z-index: 12;
    overflow: visible
}

::-webkit-scrollbar-thumb {
    width: 10px;
    background-color: #00b4ff;
    border-radius: 10px;
    z-index: 12;
    border: 4px solid rgba(0,0,0,0);
    background-clip:padding-box;
    -webkit-transition:background-color .28s ease-in-out;
    transition:background-color .28s ease-in-out;
    margin:4px;
    min-height:32px;
    min-width:32px;
}
</style>

<style lang="sass">
.slide-drawer
  &--bottom
    border-bottom-left-radius: 0
    border-bottom-right-radius: 0
    background: radial-gradient(circle, #35a2ff 0%, #014a88 100%)
    bottom: unset
    top: 100%

    > div:last-child,
    > img:last-child
      border-bottom-left-radius: 0
      border-bottom-right-radius: 0
    
  &__handler
    &--horizontal
      cursor: grab
      
      > div
        width: 60px
        height: 8px
        border-radius: 4px
        background-color: rgba(200, 200, 200, 0.7)
</style>
