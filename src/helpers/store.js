import create from 'zustand'

const useStore = create(() => {
  return {
    router: null,
    dom: null,
    os: null,
  }
})

export default useStore


export const localStore = {

  set: function (key, value) {
    if(!global.localStorage) return
    if (!key || !value) {return;}
    console.log('setter', key, value);
    if (typeof value === "object") {
      value = JSON.stringify(value);
    }
    global.localStorage.setItem(key, value);

  },
  get: function(key) {
    const value = global.localStorage ? global.localStorage.getItem(key) : null;

    if (!value) {return;}

    // assume it is an object that has been stringified
    if (value[0] === "{") {
      value = JSON.parse(value);
    }

    return value;
  }
}