import { ref } from "vue";

export enum GameMode {
  Dictation = "DICTATION",
  ChineseToEnglish = "CHINESE_TO_ENGLISH",
}

export const gameModeLabels: { [key in GameMode]: string } = {
  [GameMode.ChineseToEnglish]: "中译英",
  [GameMode.Dictation]: "听写",
};

const GameModeKey = "gameMode";
const currentGameMode = ref<GameMode>(GameMode.ChineseToEnglish);

function getFromLocalStorage(key: string) {
  const data = localStorage.getItem(key)

  if (data === null) {
    return null;
  }

  try {
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error parsing data from localStorage key "${key}": ${error}`);
    return null;
  }
}

function loadCache() {
  const mode = getStore() || currentGameMode.value;
  currentGameMode.value = mode;
}

function getStore() {
  return getFromLocalStorage(GameModeKey) as GameMode;
}

function setStore(value: GameMode) {
  localStorage.setItem(GameModeKey, value);
}

loadCache();

export function useGameMode() {
  function getGameModeOptions() {
    // 对象转数组
    return Object.entries(gameModeLabels).map(([key, value]) => {
      return {
        label: value,
        value: key,
      };
    });
  }

  function toggleGameMode(mode: GameMode) {
    currentGameMode.value = mode;
    // 缓存到本地
    setStore(mode);
  }

  return {
    toggleGameMode,
    getGameModeOptions,
    currentGameMode,
  };
}
