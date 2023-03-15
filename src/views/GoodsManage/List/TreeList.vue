<template>
  <div>
    <el-tree :props="props" :load="loadNode" lazy @node-click="clickTree"></el-tree>
  </div>
</template>

<script>
export default {
  data() {
    return {
       props: {
          label: 'name',
          children: 'zones'
        },
        count: 1
    };
  },

  components: {},

  methods: {


    async loadNode(node, resolve) {
      if (node.level === 0) {
        let res = await this.getItemCategory(1)
        return resolve(res);
      }
      if (node.level >= 1) {
        let res = await this.getItemCategory(node.data.cid)
        return resolve(res)
      }
      
     
    },
    // 获取tree数据
    async getItemCategory(type) {
      let res = await this.$api.getItemCategory({type})
        // console.log(res.data);
        if(res.data.status ==200) {
          return res.data.result
        } else {
          return [];
        }
      
    },
    clickTree(data) {
      this.$emit('changetree',data)
    },
  },
};
</script>

<style scoped></style>
