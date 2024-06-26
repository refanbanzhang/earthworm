import { useLocalStorageBoolean } from "~/utils/localStorage";

export const AUTO_PRONUNCIATION = "autoPronunciation";
export const KEYBOARD_SOUND_KEY = "keyboardSoundEnabled";
export const AUTO_PLAYENGLISH = "autoPlayEnglish";

// 用useLocalStorageBoolean派生出三个自定义hook，分别用于处理自动发音、键盘声音、自动播放英文的逻辑。
export function useAutoPronunciation() {
  const {
    value: autoPlaySound,
    isTrue: isAutoPlaySound,
    toggle: toggleAutoPlaySound,
    remove: removeAutoPlaySound,
  } = useLocalStorageBoolean(AUTO_PRONUNCIATION, true); // 默认开启

  return {
    autoPlaySound,
    isAutoPlaySound,
    toggleAutoPlaySound,
    removeAutoPlaySound,
  };
}

export function useKeyboardSound() {
  const {
    value: keyboardSound,
    isTrue: isKeyboardSoundEnabled,
    toggle: toggleKeyboardSound,
    remove: removeKeyboardSound,
  } = useLocalStorageBoolean(KEYBOARD_SOUND_KEY, true); // 默认开启

  return {
    keyboardSound,
    isKeyboardSoundEnabled,
    toggleKeyboardSound,
    removeKeyboardSound,
  };
}

export function useAutoPlayEnglish() {
  const {
    value: autoPlayEnglish,
    isTrue: isAutoPlayEnglish,
    toggle: toggleAutoPlayEnglish,
    remove: removeAutoPlayEnglish,
  } = useLocalStorageBoolean(AUTO_PLAYENGLISH, true); // 默认开启

  return {
    autoPlayEnglish,
    isAutoPlayEnglish,
    toggleAutoPlayEnglish,
    removeAutoPlayEnglish,
  };
}
