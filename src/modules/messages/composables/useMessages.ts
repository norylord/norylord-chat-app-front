import { computed, ref } from 'vue'
import type { IMessage } from '../enitity/Messages.ts'
import { SocketService } from '../../socket/service/socketService.ts'
import { useSocketStore } from '../../socket/store'
import { useUserStore } from '../../user/store'
import { UserService } from '../../user/services/userService.ts'
import { setToLocalStorage } from '../../../core/utils/localStorage.ts'

export const useMessages = () => {
  const socketStore = useSocketStore()
  const userStore = useUserStore()

  const userService = new UserService(userStore)
  const socketService = new SocketService(socketStore, userStore)

  const showUserList = ref(false)
  const messageText = ref('')
  const messageList = ref(null)
  const messageImg = ref<string | null>(null)
  const replyMessage = ref<IMessage | null>(null)

  const messages = computed(() => {
    return userService.getMessages()
  })

  const sendMessage = () => {
    if ((messageText.value.length === 0 && messageText.value.length > 500)) {
      messageText.value = ''
      if (!messageImg.value) {
        return
      }
    }
    let newMessage: IMessage = {
      id: Date.now(),
      message: messageText.value.trim(),
      event: 'message',
      time: new Date().getTime(),
      username: userService.getUsername(),
      usernameId: userService.getUsernameId()
    }
    if (replyMessage.value) {
      newMessage = { ...newMessage, reply_message: replyMessage.value }
    }
    if (messageImg.value) {
      newMessage = { ...newMessage, message_img: messageImg.value }
    }
    replyMessage.value = null
    messageImg.value = null
    messageText.value = ''
    socketService.sendMessage(newMessage)
  }

  const handleOpenUserList = () => showUserList.value = !showUserList.value

  const handleReplyMessage = (message: IMessage) => {
    replyMessage.value = message
  }

  const messageImgSrc = computed(() => {
    if (!messageImg.value) return null
    const image = new Image()
    image.src = messageImg.value
    return image
  })

  const isUsernameUpdating = ref(false)
  const handleConfirmUsernameUpdating = (username: string) => {
    setToLocalStorage('username', username)
    username = username.trim()
    if (username.length === 0) {
      return
    }
    userService.setUsername(username)
    isUsernameUpdating.value = false
  }

  return {
    showUserList,
    messages,
    messageText,
    messageList,
    messageImg,
    replyMessage,
    isUsernameUpdating,
    handleOpenUserList,
    handleReplyMessage,
    handleConfirmUsernameUpdating,
    messageImgSrc,
    sendMessage
  }
}
