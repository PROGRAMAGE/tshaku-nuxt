import { defineNuxtRouteMiddleware, navigateTo } from '#app'

export default defineNuxtRouteMiddleware((to) => {
  // This middleware is intended to be attached only to pages that require auth
  // It runs on both server and client; localStorage exists only in client
  if (process.client) {
    const token = localStorage.getItem('token')
    if (!token) {
      return navigateTo('/login')
    }
  }
})
