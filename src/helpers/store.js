import create from 'zustand'

const useStore = create(() => {
  return {
    router: null,
    dom: null,
    os: null,
  }
})

export default useStore
