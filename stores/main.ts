import { defineStore } from 'pinia'

export const useMainStore = defineStore('main', {
  state: () => ({
    cat_id: 0,
    userId: '',
    firstName: 'Guest User',
    lastName: '',
    avatar: 'https://apps.programage.com/InshutiManager/view/socialV/assets/images/user/04.jpg'
  }),
  actions: {
    addUserInfo(user) {
      this.userId = user.user_id
      this.firstName = user.first_name
      this.lastName = user.last_name
      this.avatar = 'https://tshaku.com/' + user.avatar
    },
    updateAvatar(p) { this.avatar = 'https://tshaku.com/' + p },
    updatefName(p) { this.firstName = p },
    updatelName(p) { this.lastName = p },
    updateCatId(p) { this.cat_id = p }
  }
})
