<template>
<div class="container" v-if="btnStatus">
  <el-row :gutter="16">
    <el-col :span="8">
      <div class="statistic-card">
        <el-statistic :value="98500">
          <template #title>
            <div style="display: inline-flex; align-items: center">
              Daily active users
              <el-tooltip
                effect="dark"
                content="Number of users who logged into the product in one day"
                placement="top"
              >
                <el-icon style="margin-left: 4px" :size="12">
                  <Warning />
                </el-icon>
              </el-tooltip>
            </div>
          </template>
        </el-statistic>
        <div class="statistic-footer">
          <div class="footer-item">
            <span>than yesterday</span>
            <span class="green">
              24%
              <el-icon>
                <CaretTop />
              </el-icon>
            </span>
          </div>
        </div>
      </div>
    </el-col>
    <el-col :span="8">
      <div class="statistic-card">
        <el-statistic :value="693700">
          <template #title>
            <div style="display: inline-flex; align-items: center">
              Monthly Active Users
              <el-tooltip
                effect="dark"
                content="Number of users who logged into the product in one month"
                placement="top"
              >
                <el-icon style="margin-left: 4px" :size="12">
                  <Warning />
                </el-icon>
              </el-tooltip>
            </div>
          </template>
        </el-statistic>
        <div class="statistic-footer">
          <div class="footer-item">
            <span>month on month</span>
            <span class="red">
              12%
              <el-icon>
                <CaretBottom />
              </el-icon>
            </span>
          </div>
        </div>
      </div>
    </el-col>
    <el-col :span="8">
      <div class="statistic-card">
        <el-statistic :value="72000" title="New transactions today">
          <template #title>
            <div style="display: inline-flex; align-items: center">
              New transactions today 
            </div>
          </template>
        </el-statistic>
        <div class="statistic-footer">
          <div class="footer-item">
            <span>than yesterday</span>
            <span class="green">
              16%
              <el-icon>
                <CaretTop />
              </el-icon>
            </span>
          </div>
          <div class="footer-item">
            <el-icon :size="14">
              <ArrowRight />
            </el-icon>
          </div>
        </div>
      </div>
    </el-col>
  </el-row>
  </div>
  <div class="btnStatus">
      <el-button type="primary" @click="btnStatusFnc" :icon="ArrowRight">
        {{ btnText }}
    </el-button>
  </div>
</template>

<script >
import {
  ArrowRight,
  CaretBottom,
  CaretTop,
  Warning,
  Hide
} from '@element-plus/icons-vue'

export default {
  components: {
    ArrowRight,
    CaretBottom,
    CaretTop,
    Warning,
    Hide
  },
  data() {
    return {
      btnStatus: false,
      btnText: 'Mostrar',
    }
  },
  methods: {
    btnStatusFnc() {
      this.btnStatus = !this.btnStatus
      this.btnText = this.btnStatus ? 'Ocultar' : 'Mostrar'
    },
  },
}
</script>


<style scoped>

:global(h2#card-usage ~ .example .example-showcase) {
  background-color: var(--el-fill-color) !important;
}

.el-row{
    background-size: cover;
    width:auto;
    height: auto;
    margin-right: auto;
    margin-left: auto;
    background-color: rgb(30, 30, 30);
    border-radius: 10px;
}
.el-col{
    border-radius: 10px;
}
.el-statistic {
  --el-statistic-content-font-size: 28px;
}

.statistic-card {
  height: 100%;
  padding: 20px;
  border-radius: 4px;
  background-color: var(--el-bg-color-overlay);
}

.statistic-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  font-size: 12px;
  color: var(--el-text-color-regular);
  margin-top: 16px;
}

.statistic-footer .footer-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.statistic-footer .footer-item span:last-child {
  display: inline-flex;
  align-items: center;
  margin-left: 4px;
}

.green {
  color: var(--el-color-success);
}
.red {
  color: var(--el-color-error);
}

.el-button{
    border-radius: 10px;
    color: rgb(181, 181, 181);
    background-color: #101113;
}
.el-button:hover{
    color: rgb(115, 115, 115);
    border-color: rgb(89, 0, 255);
}
.btnStatus{
    margin-top: 10px;
    text-align:start;
    margin-bottom: 10px;
}
</style>
