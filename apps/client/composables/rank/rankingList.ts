import { defineStore } from "pinia";
import { ref, watch } from "vue";
import {
  fetchProgressRank,
  type ProgressRankVo,
  type RankingItemType,
  type RankingSelfType,
} from "~/api/rank";
import Message from "~/components/main/Message/useMessage";
import { useLoading } from "~/composables/useLoading";

// 缓存到内存中，避免切换的时候，再次发起请求，因为这个数据的时效性不高
function cacheRanking() {
  let rankingCache: Record<string, ProgressRankVo> = {};

  function cleanRankingCache() {
    rankingCache = {};
  }

  function saveRankingCache(key: string, value: ProgressRankVo) {
    rankingCache[key] = value;
  }

  function getRankingCache(key: string) {
    return rankingCache[key];
  }

  function hasRankingCache(key: string) {
    return !!rankingCache[key];
  }

  return {
    saveRankingCache,
    getRankingCache,
    hasRankingCache,
    cleanRankingCache,
  };
}

export const useRanking = defineStore("ranking", () => {
  const {
    saveRankingCache,
    getRankingCache,
    hasRankingCache,
    cleanRankingCache,
  } = cacheRanking();

  const { isLoading, showLoading, hideLoading } = useLoading();
  const rankModal = ref(false); // 需要作用于不同页面
  const currentPeriod = ref<string>("weekly");
  const rankingList = ref<RankingItemType[]>([]);
  const rankingSelf = ref<RankingSelfType | null>(null);
  const rankingPeriodList = [
    {
      label: "周排行",
      value: "weekly",
    },
    {
      label: "月排行",
      value: "monthly",
    },
    {
      label: "年排行",
      value: "yearly",
    },
  ];

  async function fetchData() {
    let res: ProgressRankVo | null = null;

    if (hasRankingCache(currentPeriod.value)) {
      res = getRankingCache(currentPeriod.value);
    } else {
      showLoading();
      res = await fetchProgressRank(currentPeriod.value);
      hideLoading();
    }

    if (res) {
      rankingList.value = res.list;
      rankingSelf.value = res.self;
      saveRankingCache(currentPeriod.value, res);
    }
  }

  function togglePeriod(period: string) {
    if (currentPeriod.value === period) {
      return;
    }

    // 加载中不允许切换
    if (isLoading.value) {
      Message.warning("请等待当前排行榜加载完成", { duration: 1200 });
      return;
    }

    currentPeriod.value = period;
  }

  async function showRankModal() {
    rankModal.value = true;
    cleanRankingCache();

    fetchData();
  }

  function hideRankModal() {
    rankModal.value = false;
  }

  // 切换视图类型的时候触发
  watch(currentPeriod, fetchData);

  return {
    rankModal,
    isLoading,
    currentPeriod,
    rankingList,
    rankingSelf,
    rankingPeriodList,
    togglePeriod,
    showRankModal,
    hideRankModal,
  };
});
