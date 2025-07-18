<!-- Licensed to the Apache Software Foundation (ASF) under one or more
contributor license agreements.  See the NOTICE file distributed with
this work for additional information regarding copyright ownership.
The ASF licenses this file to You under the Apache License, Version 2.0
(the "License"); you may not use this file except in compliance with
the License.  You may obtain a copy of the License at

  http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License. -->
<template>
  <div class="nav-bar flex-h" :class="{ dark: theme === 'dark' }">
    <div class="title">{{ t(pageName) }}</div>
    <div class="app-config">
      <span class="red" v-show="timeRange">{{ t("timeTips") }}</span>
      <TimePicker
        v-model="time"
        :value="time"
        position="bottom"
        format="YYYY-MM-DD HH:mm"
      />
      <span>
        UTC{{ utcHour >= 0 ? "+" : ""
        }}{{ `${appStore.utcHour}:${appStore.utcMin}` }}
      </span>
      <!-- <span @click="handleReload" title="refresh">
        <Icon icon="retry" :loading="auto" class="middle" />
      </span> -->
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, watch, computed } from "vue";
import { useRoute } from "vue-router";
import { useI18n } from "vue-i18n";
import timeFormat from "@/utils/timeFormat";
import { useAppStoreWithOut } from "@/store/modules/app";

const { t } = useI18n();
const appStore = useAppStoreWithOut();
const route = useRoute();
const pageName = ref<string>("");
const timeRange = ref<number>(0);
const theme = ref<string>("light");
let utc = localStorage.getItem("utc") || "";
if (!utc.includes(":")) {
  utc =
    (localStorage.getItem("utc") || -(new Date().getTimezoneOffset() / 60)) +
    ":0";
}
const utcArr = (utc || "").split(":");
const utcHour = isNaN(Number(utcArr[0])) ? 0 : Number(utcArr[0]);
const utcMin = isNaN(Number(utcArr[1])) ? 0 : Number(utcArr[1]);

appStore.setUTC(utcHour, utcMin);
console.log(route);
const setConfig = (value: string) => {
  pageName.value = value || "";
  theme.value = route.path.includes("/infrastructure/") ? "dark" : "light";
};
const time = computed({
  get() {
    return [appStore.durationRow.start, appStore.durationRow.end];
  },
  set(val: Date[]) {
    timeRange.value =
      val[1].getTime() - val[0].getTime() > 60 * 24 * 60 * 60 * 1000 ? 1 : 0;
    if (timeRange.value) {
      return;
    }
    appStore.setDuration(timeFormat(val));
  },
});
setConfig(String(route.meta.title));
watch(
  () => route.meta.title,
  (title: unknown) => {
    setConfig(String(title));
  }
);
</script>
<style lang="scss" scoped>
.nav-bar {
  padding: 5px 10px 5px 28px;
  text-align: left;
  justify-content: space-between;
  background-color: #fafbfc;
  border-bottom: 1px solid #dfe4e8;
  color: #222;
}
.nav-bar.dark {
  background-color: #333840;
  border-bottom: 1px solid #252a2f;
  color: #fafbfc;
}
.title {
  font-size: 14px;
  font-weight: 500;
  height: 28px;
  line-height: 28px;
}
.nav-tabs {
  padding: 10px;
}
</style>
