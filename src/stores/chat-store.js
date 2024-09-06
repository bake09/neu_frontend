import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import { api } from "boot/axios"
import { LocalStorage, useTimeout } from "quasar"

import { echo } from "../boot/echo"
import { useRoute } from "vue-router"

export const useChatStore = defineStore('chat', () => {
  
  const { registerTimeout } = useTimeout()
  
  const route = useRoute()

  // State
  const chats = ref(LocalStorage.getItem('chats') || [])
  const currentChat = ref(LocalStorage.getItem('currentChat') || [])
  const chatsIsLoading = ref(false)
  const chatIsLoading = ref(false)
  const activeChannels = ref([])
  const newMessage = ref('')
  const loadMoreShowingIteration = ref(-1)
  const loadMoreShowing = ref(false)
  const showAttachmentDialog = ref(false)
  const showFileDialog = ref(false)

  const selectedImage = ref(null)
  const selectedImageUrl = ref(null)
  const selectedImageRatio = ref(null)

  // watch showFileDialog to Clear on Close
  watch(showFileDialog, () => {
    if(!showFileDialog.value){
      selectedImage.value = null
      selectedImageUrl.value = null
      selectedImageRatio.value = null
    }
  })

  const vapidKeys = ref({
    public: 'BKneabAy3ho7u9AjgrRH7RXGs77SKinBg4AEWEKGiVp-fVjBq-RdV5Gz3g8MO1lmFYQlWYlSOp68aFmzKV5oWBI',
    private: '6O4xHEx0JPw7qPqI0Gc7LGFPtN1mo3yyrUXJrZ7lZDo'
  })

  // Getters
  const getMessages = computed(() => {
    return currentChat.value ? currentChat.value.messages : []
  })

  // Actions
  async function getAllChats() {
    console.log("getAllChats fired")
    chats.value = []
    chatsIsLoading.value = true
    try {
      const res = await api.get('/chat')
      chats.value = res.data.data
      LocalStorage.setItem('chats', res.data.data)
    } catch (err) {
      console.log(err)
    } finally {
      chatsIsLoading.value = false
    }
  }
  async function setCurrentChat(chat){
    currentChat.value = chat
    LocalStorage.setItem('currentChat', chat)
    clearUnreadMessagesLocally()
  }
  async function getSingleChat(id) {
    chatIsLoading.value = true
    try {
      const res = await api.get(`/chat/${id}`)
      console.log("res : ", res)
      console.log("res.data.messages.data : ", res.data.messages.data)
      currentChat.value.messages = res.data.messages.data
    } catch (err) {
      console.log(err)
    } finally {
      chatIsLoading.value = false
    }
  }
  async function addMessage() {
    chatsIsLoading.value = true
    try {
      // const res = await api.post('/chat', { content: newMessage.value, chat_id: currentChat.value.id })
      // console.log("res : ", res)
      // newMessage.value = ''
      // addMessageLocally(res.data.message)

      const formData = new FormData()

      // Füge die Nachrichten-Daten hinzu
      formData.append('content', newMessage.value)
      formData.append('chat_id', currentChat.value.id)

      // Wenn ein Bild hochgeladen wurde, füge es hinzu
      if (selectedImage.value) {
        formData.append('image', selectedImage.value)
      }

      // API-Anfrage mit FormData senden
      const res = await api.post('/chat', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      // Erfolgreich gesendete Nachricht lokal hinzufügen
      console.log("res : ", res)
      newMessage.value = ''
      selectedImage.value = null
      selectedImageUrl.value = null
      selectedImageRatio.value = null
      addMessageLocally(res.data.message)

      // Hide Dialog
      showFileDialog.value = false
    } catch (err) {
      console.log("task-store : ", err)
      newMessage.value = ''
    } finally {
      chatsIsLoading.value = false
    }
  }
  function addMessageLocally(message) {
    if (currentChat.value) {
      currentChat.value.messages.push(message)
    }
  }
  function addMessageLocallyToUnreadArray(message) {
    const chat = chats.value.find(item => item.id === message.chatId);
    if (chat) {
      chat.unreadMessages.push(message.message);
    } else {
      console.warn(`Chat with ID ${message.chatId} not found`);
    }

    // updateTheCurrentLastMessage
    chat.last_message = message.message
  }
  function addMessageLocallyToInactiveChat(message) {
    const chat = chats.value.find(item => item.id === message.chatId);
    if (chat.messages?.length) {
      chat.messages.push(message.message);
    }
  }
  async function clearUnreadMessagesLocally() {
    if(currentChat.value){
      const chatIndex = chats.value.findIndex(item => {
        return item.id == currentChat.value.id
      })
      if(chats.value[chatIndex].unreadMessages.length){
        chats.value[chatIndex].unreadMessages = []
      }
    }
  }
  const slicedChatId = (chatId) => {
    
    if(chats.value.length > 0){
      return chatId.slice(-4)
    }
    else if(currentChat.value.id){
      return chatId.slice(-4)
    }
    else{
      return null
    }
  }
  const setTypingInfo = (payload) => {

    const chat = chats.value.find(item => item.id === payload.chatId);
    let inhalt = payload.user.name + ' schreibt...'

    chat.isTyping = inhalt
    if(currentChat.value){
      currentChat.value.isTyping = inhalt
    }

    registerTimeout(() => {
      chat.isTyping = null
      if(currentChat.value){
        currentChat.value.isTyping = null
      }
    }, 700)
  }
  const listenForMessagesInAllChats = async() => {
    chats.value.forEach((chatItem) => {
      echo.private(`chatchannel.${chatItem.id}`)
        .listen('.addMessage', (payload) => {
          if(route.name == "chat"){
            addMessageLocally(payload.message)
          }
          if(route.name == "chats"){
            addMessageLocallyToInactiveChat(payload)
            addMessageLocallyToUnreadArray(payload)
          }
        })
        .listenForWhisper('userIsTyping', (e) => {
          setTypingInfo(e)
        })
        activeChannels.value.push(chatItem.id)
    })
  }
  const stopListenForMessagesInAllChats = async () => {
    chats.value.forEach((chatItem) => {
      // echo.private(`chatchannel.${chatItem.id}`)
      //   .stopListening('.addMessage')
      echo.leave(`chatchannel.${chatItem.id}`)
      echo.leaveChannel(`chatchannel.${chatItem.id}`)
    })
    activeChannels.value = []
  }
  const whisperIsTyping = (userName) => {
    echo.private(`chatchannel.${currentChat.value.id}`)
      .whisper('userIsTyping', {
          chatId: currentChat.value.id,
          user: {
            name: userName
          },
          content: newMessage.value
      })
  }
  const handleImageUpload = (event) => {
    const target = event.target
    const file = target.files?.[0]

    if (file) {
      selectedImage.value = file
      selectedImageUrl.value = URL.createObjectURL(file)
      
      // Bild-Element erstellen, um das Verhältnis zu berechnen
      const img = new Image()
      img.src = URL.createObjectURL(file)
      img.onload = () => {
        const width = img.width
        const height = img.height

        // Berechne das Verhältnis
        const aspectRatio = width / height;

        // Standard-Verhältnisse und deren numerische Werte
        const aspectRatios = {
          '16/9': 16 / 9,
          '4/3': 4 / 3,
          '1/1': 1 / 1,
          '3/4': 3 / 4,
          '9/16': 9 / 16,
        };

        // Funktion zum Finden des am nächsten liegenden Verhältnisses
        const closestRatio = Object.keys(aspectRatios).reduce((prev, curr) => {
          return Math.abs(aspectRatios[curr] - aspectRatio) < Math.abs(aspectRatios[prev] - aspectRatio) ? curr : prev;
        });

        selectedImageRatio.value = closestRatio;
      }

      showFileDialog.value = true
    }
  }

  // Return everything
  return {
    // State 
    chats,
    currentChat,
    chatsIsLoading,
    chatIsLoading,
    newMessage,
    activeChannels,
    vapidKeys,
    loadMoreShowing,
    loadMoreShowingIteration,
    showAttachmentDialog,
    showFileDialog,
    selectedImage,
    selectedImageUrl,
    selectedImageRatio,

    // Getters
    getMessages,

    // Actions
    getAllChats,
    getSingleChat,
    addMessage,
    addMessageLocally,
    setCurrentChat,
    addMessageLocallyToUnreadArray,
    clearUnreadMessagesLocally,
    slicedChatId,
    addMessageLocallyToInactiveChat,
    setTypingInfo,
    listenForMessagesInAllChats,
    stopListenForMessagesInAllChats,
    whisperIsTyping,
    handleImageUpload,

  }
})
