export enum KEYS {
  MEMBER = "MEMBER",
  BOOKING = "BOOKING",
}

export function getItem(key: KEYS) {
  if (typeof localStorage !== 'undefined'){
    const value = localStorage.getItem(key);
    if (value !== null) {
      console.log("getItem",value);
      return JSON.parse(value);
    }
  }else{
    console.log("localStorage未対応")
  }
  return "";
}

export function removeItem(key: KEYS) {
  if (typeof localStorage !== 'undefined'){
    localStorage.removeItem(key);
  }else{
    console.log("localStorage未対応")
  }
}

export function setItem(key: KEYS, value: any) {
  if (typeof localStorage !== 'undefined'){
    localStorage.setItem(key,JSON.stringify( value));
    console.log("setItem",JSON.stringify(value))
  }else{
    console.log("localStorage未対応")
  }
}