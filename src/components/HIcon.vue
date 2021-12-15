<script lang="ts">
import { defineComponent, h } from "vue"
export default defineComponent({
  props: ['icon'],
  setup(props) {
    return () => h(props.icon);
  },
});
</script>