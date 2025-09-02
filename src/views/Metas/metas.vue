<template>
    <LayoutMain>
        <template #slotLayout>
          <el-row :gutter="16">
            <el-col :xs="24" :sm="12" :md="8" class="mb-4">
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
            <el-col :xs="24" :sm="12" :md="8" class="mb-4">
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
            <el-col :xs="24" :sm="12" :md="8" class="mb-4">
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
      </template>
    </LayoutMain>
</template>

<script lang="ts" setup>
  import LayoutMain from '../../components/LayoutMain.vue';

</script>

<style scoped>
body{
  margin: 0;
}
.el-table{
    color: rgb(0, 0, 0);
}
.el-table > label{
    width: 100px;
    color: rgb(0, 0, 0);
}
.imageUpload{
  text-decoration: underline;
  text-align: center;
  margin-top: -30px;
  margin-bottom: 10px;
}
.example-showcase .el-loading-mask {
  z-index: 9;
}
</style>
