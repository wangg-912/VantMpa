<template>
  <van-form validate-first @failed="onFailed">
    <!-- 通过 pattern 进行正则校验 -->
    <van-field
      v-model="value1"
      name="pattern"
      placeholder="正则校验"
      label="正则校验"
      :rules="[{ pattern, message: '请输入正确内容' }]"
    />
    <!-- 通过 validator 进行函数校验 -->
    <van-field
      v-model="value2"
      name="validator"
      placeholder="函数校验"
      label="函数校验"
      :rules="[{ validator, message: '请输入正确内容' }]"
    />
    <!-- 通过 validator 进行异步函数校验 -->
    <van-field
      v-model="value3"
      name="asyncValidator"
      placeholder="异步函数校验"
      label="异步函数校验"
      :rules="[{ validator: asyncValidator, message: '请输入正确内容' }]"
    />
    <van-field name="uploader" label="文件上传">
      <template #input>
        <van-uploader v-model="uploader" />
      </template>
    </van-field>
    <div style="margin: 16px">
      <van-button round block type="primary" native-type="submit"
        >提交</van-button
      >
    </div>
  </van-form>
</template>
<script>
import { defineComponent } from 'vue';
import { Form, Field, Toast, Button, Uploader } from 'vant';
export default defineComponent({
  name: 'App',
  components: {
    [Form.name]: Form,
    [Field.name]: Field,
    [Button.name]: Button,
    [Uploader.name]: Uploader,
    [Toast.name]: Toast,
  },
  data() {
    return {
      value1: '',
      value2: '',
      value3: '',
      pattern: /\d{6}/,
      uploader: [{ url: 'https://img01.yzcdn.cn/vant/leaf.jpg' }],
    };
  },
  methods: {
    // 校验函数返回 true 表示校验通过，false 表示不通过
    validator(val) {
      return /1\d{10}/.test(val);
    },
    // 异步校验函数返回 Promise
    asyncValidator(val) {
      return new Promise((resolve) => {
        Toast.loading('验证中...');

        setTimeout(() => {
          Toast.clear();
          resolve(/\d{6}/.test(val));
        }, 1000);
      });
    },
    onFailed(errorInfo) {
      console.log('failed', errorInfo);
    },
  },
});
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
