import { onMounted, ref } from 'vue'

export default function useTheme() {
  const isDark = ref(false)

  const setTheme = (dark: boolean) => {
    isDark.value = dark
    const html = document.documentElement
    dark
      ? html.setAttribute('data-theme', 'dark')
      : html.removeAttribute('data-theme')
    localStorage.setItem('theme', dark ? 'dark' : 'light')
  }

  const toggleTheme = () => setTheme(!isDark.value)

  onMounted(() => {
    const savedTheme = localStorage.getItem('theme')
    const prefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches

    setTheme(savedTheme === 'dark' || (!savedTheme && prefersDark))
  })

  return { isDark, toggleTheme }
}
