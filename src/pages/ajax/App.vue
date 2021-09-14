<template>
  <van-button type="primary" size="small" @touchstart="getNo"
    >测试GET无参数</van-button
  >
  <van-button type="primary" size="small" @touchstart="getAuto"
    >测试GET自定义参数</van-button
  >
  <van-button type="primary" size="small" @touchstart="getIMG"
    >测试GET获取流</van-button
  >
  <van-button type="primary" size="small" @touchstart="postNo"
    >测试POST无参数</van-button
  >
  <van-button type="primary" size="small" @touchstart="postAuto"
    >测试POST自定义参数</van-button
  >
  <van-button type="primary" size="small" @touchstart="pForm"
    >测试POST表单</van-button
  >
  <van-button type="primary" size="small" @touchstart="exportE"
    >测试Blob导出</van-button
  >
  <van-button type="primary" size="small" @touchstart="putP"
    >测试PUT表单</van-button
  >
  <van-button type="primary" size="small" @touchstart="deleteP"
    >测试DELETE表单</van-button
  >
  <br />
  <van-image width="200" height="400" :src="imgUrl" />
</template>
<script>
import { defineComponent, reactive, toRefs } from 'vue';
import { Button, Image as VanImage } from 'vant';
import {
  getNoParam,
  getAutoParam,
  getInfo,
  postNoParam,
  postParam,
  postForm,
  exportExcel,
  putParam,
  deleteParam,
} from '@/api/server';
export default defineComponent({
  name: 'App',
  components: {
    [Button.name]: Button,
    [VanImage.name]: VanImage,
  },
  setup() {
    const state = reactive({
      imgUrl: '',
    });
    function getNo() {
      getNoParam().then((res) => {});
    }
    function getAuto() {
      getAutoParam({ name: 'zs' }).then((res) => {});
    }
    function getIMG() {
      getInfo({ taskId: '10000000710201' }).then((res) => {
        if (res) {
          state.imgUrl = `${res}`;
          //console.log(state);
        }
      });
    }
    function postNo() {
      postNoParam().then((res) => {});
    }
    function postAuto() {
      postParam({
        name: 'zs',
        id: 123,
        address: '哈萨克东方红尽快撒货到付款技术的',
      });
    }
    function pForm() {
      postForm({ name: 'zs' }).then((res) => {});
    }
    function exportE() {
      exportExcel(1022222).then((res) => {});
    }
    function putP() {
      putParam({
        name: '122',
        age: '23',
        info: { code: 23444, sex: 'man' },
      }).then((res) => {});
    }
    function deleteP() {
      deleteParam(321).then((res) => {});
    }
    return {
      getNo,
      getAuto,
      getIMG,
      postNo,
      postAuto,
      pForm,
      exportE,
      putP,
      deleteP,
      ...toRefs(state),
    };
  },
});
</script>
<style lang="scss" scoped>

.van-button {
  margin-left: 8px;
}
</style>
