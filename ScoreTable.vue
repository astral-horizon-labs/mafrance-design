<template>
  <v-card class="score-card" variant="outlined" rounded="lg">
    <div class="score-card-header">
      <span class="score-card-title">INDICES</span>
    </div>
    <div class="score-card-divider"></div>

    <div v-if="loading" class="d-flex justify-center align-center py-8">
      <v-progress-circular
        indeterminate
        color="secondary"
        size="32"
      ></v-progress-circular>
    </div>

    <div v-else-if="tableRows.length > 0" class="score-body">
      <!-- Column headers (only when comparing) -->
      <div v-if="compareHeader" class="score-columns-header">
        <div class="score-col-label"></div>
        <div class="score-col-value">{{ mainHeader }}</div>
        <div class="score-col-value">{{ compareHeader }}</div>
      </div>

      <template v-for="(row, index) in tableRows" :key="index">
        <!-- Main category row -->
        <div
          v-if="!row.subRow"
          class="score-row"
          :class="{ 'is-expanded': expandedGroups[row.groupId] }"
          @click="handleRowClick(row)"
        >
          <div
            class="score-accent-bar"
            :style="{ backgroundColor: getCategoryColor(row.metricKey) }"
          ></div>
          <div
            class="score-badge"
            :style="{ backgroundColor: getCategoryBgColor(row.metricKey) }"
          >
            <v-icon
              :color="getCategoryColor(row.metricKey)"
              size="18"
            >{{ getIconForMetric(row.metricKey) }}</v-icon>
          </div>
          <div class="score-label">{{ row.title }}</div>
          <v-chip
            :color="getChipBgColor(row.rawMain)"
            :text-color="getChipTextColor(row.rawMain)"
            size="small"
            variant="flat"
            class="score-chip"
          >
            {{ row.main }}
          </v-chip>
          <v-chip
            v-if="compareHeader && row.compare"
            :color="getChipBgColor(row.rawCompare)"
            :text-color="getChipTextColor(row.rawCompare)"
            size="small"
            variant="flat"
            class="score-chip score-chip-compare"
          >
            {{ row.compare }}
          </v-chip>
          <v-icon
            class="score-chevron"
            size="20"
            color="#78909C"
          >{{ expandedGroups[row.groupId] ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
        </div>

        <!-- Sub-row (expanded detail) -->
        <v-expand-transition v-else>
          <div
            v-show="expandedGroups[row.groupId]"
            class="score-subrow"
          >
            <v-icon
              v-if="getIconForMetric(row.metricKey)"
              size="16"
              color="#78909C"
              class="mr-2"
            >{{ getIconForMetric(row.metricKey) }}</v-icon>
            <span class="score-subrow-label">{{ row.title }}</span>
            <span class="score-subrow-value">{{ row.main }}</span>
            <span
              v-if="compareHeader && row.compare"
              class="score-subrow-value"
            >{{ row.compare }}</span>
          </div>
        </v-expand-transition>
      </template>
    </div>

    <div v-else class="text-center py-8" style="color: #78909C">
      {{ noDataMessage }}
    </div>
  </v-card>
</template>

<script>
import { useDataStore } from "../../services/store.js";
import { MetricsConfig } from "../../utils/metricsConfig.js";
import { DepartementNames } from "../../utils/departementNames.js";

const CATEGORY_COLORS = {
  total_score: { color: "#B71C1C", bg: "#FFF5F5" },
  insecurite_score: { color: "#BF650A", bg: "#FFF8F0" },
  immigration_score: { color: "#8D6E0A", bg: "#FFFDF0" },
  islamisation_score: { color: "#2E7D32", bg: "#F0FAF1" },
  defrancisation_score: { color: "#1565C0", bg: "#F0F6FF" },
  wokisme_score: { color: "#6A1B9A", bg: "#F9F0FF" },
};

const CHIP_THRESHOLDS = [
  { max: 80, bg: "#E8F5E9", text: "#2E7D32" },
  { max: 95, bg: "#F1F8E9", text: "#558B2F" },
  { max: 105, bg: "#ECEFF1", text: "#78909C" },
  { max: 125, bg: "#FFF3E0", text: "#E65100" },
  { max: 150, bg: "#FBE9E7", text: "#EF6C00" },
  { max: Infinity, bg: "#FFEBEE", text: "#C62828" },
];

export default {
  name: "ScoreTable",
  props: {
    location: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      loading: false,
      tableRows: [],
      mainHeader: "",
      compareHeader: "",
      expandedGroups: {},
    };
  },
  computed: {
    dataStore() {
      return useDataStore();
    },
    cardTitle() {
      return this.$t("scoreTable.title", { name: this.location.name });
    },
    noDataMessage() {
      return this.$t("scoreTable.noData");
    },
  },
  watch: {
    location: {
      handler() {
        this.updateTable();
      },
      immediate: true,
    },
    "dataStore.country": {
      handler() {
        if (this.location.type === "country") this.updateTable();
      },
      deep: true,
    },
    "dataStore.departement": {
      handler() {
        if (this.location.type === "departement") this.updateTable();
      },
      deep: true,
    },
    "dataStore.commune": {
      handler() {
        if (this.location.type === "commune") this.updateTable();
      },
      deep: true,
    },
    "dataStore.currentLocale": {
      handler() {
        this.updateTable();
      },
      immediate: false,
    },
  },
  methods: {
    getCategoryColor(metricKey) {
      return CATEGORY_COLORS[metricKey]?.color || "#78909C";
    },
    getCategoryBgColor(metricKey) {
      return CATEGORY_COLORS[metricKey]?.bg || "#FAFAFA";
    },
    getChipBgColor(val) {
      if (val === null || val === undefined || isNaN(val)) return "#ECEFF1";
      const v = parseFloat(val);
      const t = CHIP_THRESHOLDS.find((t) => v < t.max);
      return t ? t.bg : "#ECEFF1";
    },
    getChipTextColor(val) {
      if (val === null || val === undefined || isNaN(val)) return "#78909C";
      const v = parseFloat(val);
      const t = CHIP_THRESHOLDS.find((t) => v < t.max);
      return t ? t.text : "#78909C";
    },
    getIconForMetric(metricKey) {
      const icons = {
        total_score: "mdi-gauge-full",
        insecurite_score: "mdi-shield-alert",
        immigration_score: "mdi-account-multiple-plus",
        islamisation_score: "mdi-mosque",
        defrancisation_score: "mdi-drama-masks",
        wokisme_score: "mdi-fist-raised",
      };
      return icons[metricKey] || "";
    },

    handleRowClick(row) {
      if (!row.subRow) {
        this.expandedGroups[row.groupId] = !this.expandedGroups[row.groupId];
      }
    },

    updateTable() {
      if (!this.location || !this.location.type) {
        this.tableRows = [];
        return;
      }

      const level = this.location.type;
      const storeSection = this.dataStore[level];

      if (!storeSection || !storeSection.details) {
        this.loading = true;
        this.tableRows = [];
        return;
      }

      this.loading = false;

      let compareStoreSection = null;

      if (level === "departement") {
        compareStoreSection = this.dataStore.country;
      } else if (level === "commune") {
        compareStoreSection = this.dataStore.departement;
      }

      this.setHeaders(level, storeSection);

      const rows = [];
      const categories = this.getUniqueCategories();

      categories.forEach((category) => {
        const categoryMetrics = MetricsConfig.getMetricsByCategory(
          category,
        ).filter((m) => MetricsConfig.isMetricAvailable(m.value, level));

        if (categoryMetrics.length === 0) return;

        const mainMetric = categoryMetrics[0];
        rows.push(
          this.createRow(mainMetric, storeSection, compareStoreSection, false),
        );

        categoryMetrics.slice(1).forEach((subMetric) => {
          rows.push(
            this.createRow(subMetric, storeSection, compareStoreSection, true),
          );
        });
      });

      this.tableRows = this.addGroupIds(rows);
    },

    setHeaders(level, storeSection) {
      if (level === "country") {
        this.mainHeader = this.$t("scoreTable.metropolitanFrance");
        this.compareHeader = this.$t("scoreTable.entireFrance");
      } else if (level === "departement") {
        this.mainHeader = this.location.name;
        this.compareHeader = this.$t("scoreTable.metropolitanFrance");
      } else if (level === "commune") {
        const communeData = storeSection.details;
        this.mainHeader = this.location.name;
        this.compareHeader = DepartementNames[communeData.departement];
      }
    },

    getUniqueCategories() {
      const seen = new Set();
      return MetricsConfig.metrics
        .map((m) => m.category)
        .filter((c) => {
          if (seen.has(c)) return false;
          seen.add(c);
          return true;
        });
    },

    createRow(metric, storeSection, compareStoreSection, isSubRow = false) {
      const metricKey = metric.value;
      const title = MetricsConfig.getMetricLabel(
        metricKey,
        this.dataStore.currentLocale,
      );
      const source = metric.source || "details";
      const metricObj = MetricsConfig.getMetricByValue(metricKey);
      const format = metricObj ? metricObj.format : "number";

      if (this.location.type === "country" && this.location.name === "France") {
        const main = this.getFormattedValueFromCountryArray(
          storeSection, metricKey, source, "france metro",
        );
        const rawMain = this.getRawValueFromCountryArray(
          storeSection, metricKey, source, "france metro",
        );
        const compare = this.getFormattedValueFromCountryArray(
          storeSection, metricKey, source, "france entiere",
        );
        const rawCompare = this.getRawValueFromCountryArray(
          storeSection, metricKey, source, "france entiere",
        );
        return { title, main, compare, rawMain, rawCompare, format, subRow: isSubRow, metricKey };
      }

      const main = this.getFormattedValue(storeSection, metricKey, source);
      const rawMain = this.getRawValue(storeSection, metricKey, source);

      let compare = "";
      let rawCompare = null;
      if (compareStoreSection) {
        if (this.location.type === "departement") {
          compare = this.getFormattedValueFromCountryArray(
            compareStoreSection, metricKey, source, "france metro",
          );
          rawCompare = this.getRawValueFromCountryArray(
            compareStoreSection, metricKey, source, "france metro",
          );
        } else {
          compare = this.getFormattedValue(compareStoreSection, metricKey, source);
          rawCompare = this.getRawValue(compareStoreSection, metricKey, source);
        }
      }

      return { title, main, compare, rawMain, rawCompare, format, subRow: isSubRow, metricKey };
    },

    getFormattedValue(storeSection, metricKey, source) {
      const sectionData = storeSection[source];
      if (!sectionData) return "N/A";
      let value = MetricsConfig.calculateMetric(metricKey, sectionData);
      if (value == null || value === undefined || isNaN(value)) return "N/A";
      let formatted = MetricsConfig.formatMetricValue(value, metricKey);
      if (source === "names" && sectionData.annais) formatted += ` (${sectionData.annais})`;
      else if (source === "crime" && sectionData.annee) formatted += ` (${sectionData.annee})`;
      return formatted;
    },

    getFormattedValueFromCountryArray(storeSection, metricKey, source, countryType) {
      const sectionData = storeSection[source];
      if (!sectionData || !Array.isArray(sectionData)) return "N/A";
      const data = sectionData.find((item) => item.country === countryType);
      if (!data) return "N/A";
      let value = MetricsConfig.calculateMetric(metricKey, data);
      if (value == null || value === undefined || isNaN(value)) return "N/A";
      let formatted = MetricsConfig.formatMetricValue(value, metricKey);
      if (source === "names" && data.annais) formatted += ` (${data.annais})`;
      else if (source === "crime" && data.annee) formatted += ` (${data.annee})`;
      return formatted;
    },

    addGroupIds(rows) {
      let currentGroupId = null;
      return rows.map((row, index) => {
        if (!row.subRow) currentGroupId = `group-${index}`;
        return { ...row, groupId: currentGroupId };
      });
    },

    getRawValue(storeSection, metricKey, source) {
      const sectionData = storeSection[source];
      if (!sectionData) return null;
      return MetricsConfig.calculateMetric(metricKey, sectionData);
    },

    getRawValueFromCountryArray(storeSection, metricKey, source, countryType) {
      const sectionData = storeSection[source];
      if (!sectionData || !Array.isArray(sectionData)) return null;
      const data = sectionData.find((item) => item.country === countryType);
      if (!data) return null;
      return MetricsConfig.calculateMetric(metricKey, data);
    },
  },
};
</script>

<style scoped>
.score-card {
  border: 1px solid #E0DCD4;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
  overflow: hidden;
  background: #FFFFFF;
}

.score-card-header {
  padding: 16px 24px 8px;
}

.score-card-title {
  font-family: 'DM Sans', sans-serif;
  font-weight: 600;
  font-size: 11px;
  letter-spacing: 0.8px;
  text-transform: uppercase;
  color: #1B3A5C;
}

.score-card-divider {
  height: 2px;
  background: #B71C1C;
  margin: 0 24px 8px;
}

.score-body {
  padding: 0 12px 12px;
}

.score-columns-header {
  display: flex;
  align-items: center;
  padding: 8px 12px;
  font-family: 'DM Sans', sans-serif;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  color: #78909C;
}

.score-columns-header .score-col-label {
  flex: 1;
}

.score-columns-header .score-col-value {
  width: 100px;
  text-align: center;
}

/* Main category row */
.score-row {
  display: flex;
  align-items: center;
  padding: 10px 12px;
  min-height: 48px;
  cursor: pointer;
  border-radius: 8px;
  transition: background-color 0.2s ease;
}

.score-row:hover {
  background-color: #F5F3EF;
}

.score-accent-bar {
  width: 4px;
  height: 32px;
  border-radius: 2px;
  flex-shrink: 0;
}

.score-badge {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 12px;
  flex-shrink: 0;
}

.score-label {
  flex: 1;
  font-family: 'DM Sans', sans-serif;
  font-weight: 600;
  font-size: 14px;
  color: #1A1A1A;
}

.score-chip {
  font-family: 'DM Sans', sans-serif;
  font-weight: 700;
  font-size: 13px;
  font-variant-numeric: tabular-nums;
  border-radius: 100px;
  min-width: 52px;
  justify-content: center;
}

.score-chip-compare {
  margin-left: 8px;
}

.score-chevron {
  margin-left: 8px;
  transition: transform 0.3s ease;
  flex-shrink: 0;
}

.is-expanded .score-chevron {
  transform: rotate(180deg);
}

/* Sub-rows */
.score-subrow {
  display: flex;
  align-items: center;
  padding: 8px 12px 8px 60px;
  min-height: 40px;
  background: #FAFAF8;
  border-radius: 4px;
  margin: 0 4px;
}

.score-subrow-label {
  flex: 1;
  font-family: 'DM Sans', sans-serif;
  font-weight: 400;
  font-size: 13px;
  color: #1A1A1A;
}

.score-subrow-value {
  font-family: 'DM Sans', sans-serif;
  font-weight: 500;
  font-size: 13px;
  font-variant-numeric: tabular-nums;
  color: #1B3A5C;
  width: 100px;
  text-align: center;
}

/* Responsive */
@media (max-width: 768px) {
  .score-card-header {
    padding: 12px 16px 6px;
  }
  .score-card-divider {
    margin: 0 16px 6px;
  }
  .score-body {
    padding: 0 8px 8px;
  }
  .score-row {
    padding: 8px;
  }
  .score-badge {
    width: 28px;
    height: 28px;
    margin: 0 8px;
  }
  .score-label {
    font-size: 13px;
  }
  .score-chip {
    font-size: 12px;
    min-width: 44px;
  }
  .score-subrow {
    padding-left: 48px;
  }
}

@media (max-width: 480px) {
  .score-badge {
    display: none;
  }
  .score-accent-bar {
    margin-right: 8px;
  }
  .score-chip-compare {
    display: none;
  }
  .score-subrow {
    padding-left: 24px;
  }
  .score-subrow-value:nth-child(3) {
    display: none;
  }
}
</style>
