<template>
  <div>
    <!-- <g-cascader :source="source" popover-height="200" :selected.sync="selected">
    </g-cascader> -->
    <g-cascader
      :source.sync="source"
      popoverHeight="200"
      :selected.sync="selected"
      :loadData="loadData"
    >
    </g-cascader>
    <g-cascader
      :source.sync="source"
      popoverHeight="200"
      :selected.sync="selected"
      :loadData="loadData"
    >
    </g-cascader>
  </div>
</template>
<script>
import db from "@/assets/js/db.js";
import { removeListener } from "@/click-outside.js";
// function ajax(parent_id = 0, success) {
//   let id = setTimeout(() => {
//     let result = db.filter((item) => item.parent_id == parent_id)
//     success(result)
//   }, 3000)
//   return id
// }

function ajax(parent_id = 0) {
  return new Promise((resolve) => {
    setTimeout(() => {
      let result = db.filter((item) => item.parent_id == parent_id);
      result.forEach((node) => {
        if (db.filter((item) => item.parent_id === node.id).length > 0) {
          node.isLeaf = false;
        } else {
          node.isLeaf = true;
        }
      });

      resolve(result);
    }, 300);
  });
}
export default {
  data() {
    return {
      source: [
        {
          id: 1,
          name: "勃拉姆斯",
          children: [
            {
              id: 11,
              name: "匈牙利舞曲",
            },
          ],
        },
      ],
      selected: [],
    };
  },
  destroyed() {
    removeListener();
  },
  created() {
    // ajax(0, (result) => {
    //   this.source = result
    // })
    ajax(0)
      .then((result) => {
        this.source = result;
        //console.log(result)
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    // xxx() {
    //   //console.log('xxx')
    //   //console.log(this.selected)
    //   ajax(this.selected[0].id).then((result) => {
    //     let lastLevelSelected = this.source.filter(
    //       (item) => item.id === this.selected[0].id
    //     )[0];
    //     //lastLevelSelected.children = result
    //     this.$set(lastLevelSelected, "children", result);
    //   });
    // },
    loadData({ id }, callBack) {
      ajax(id).then((result) => {
        callBack(result);
      });
    },
  },
};
</script>
