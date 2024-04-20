import { ref } from "vue";

export const useLoading = () => {
  const isLoading = ref(false);

  function showLoading() {
    isLoading.value = true;
  }

  function hideLoading() {
    isLoading.value = false;
  }

  return {
    isLoading,
    showLoading,
    hideLoading,
  };
};
