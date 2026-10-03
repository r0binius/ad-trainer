<script setup lang="ts">
import { computed } from 'vue';

import { renderRich } from '@/domain/content/rich';
import type { RichText } from '@/domain/content/types';
import { renderTex } from '@/platform/math';

const { source } = defineProps<{
  /** The text to show, with its formulas. */
  source: RichText;
}>();

// Safe to bind as HTML: `renderRich` escapes everything that isn't a formula it rendered itself.
const html = computed(() => renderRich(source, renderTex));
</script>

<template>
  <!-- eslint-disable-next-line vue/no-v-html -- escaped by renderRich -->
  <div class="rich" v-html="html" />
</template>

<style scoped>
/*
 * The text is bound as HTML, so its elements carry no scope: every rule reaches them with :deep().
 * The rules are written flat, each starting at .rich; nested under .rich, :deep() would compile to
 * a selector that never matches.
 */
.rich {
  overflow-wrap: break-word;
}

.rich :deep(p + p),
.rich :deep(p + ul),
.rich :deep(ul + p),
.rich :deep(pre + p),
.rich :deep(pre + ul),
.rich :deep(p + pre),
.rich :deep(ul + pre),
.rich :deep(pre + pre) {
  margin-top: 0.7em;
}

.rich :deep(ul) {
  padding-left: 1.2em;
}

.rich :deep(li + li) {
  margin-top: 0.35em;
}

.rich :deep(strong) {
  font-weight: 600;
}

/* Code and drawn trees keep their spacing and scroll on their own, like a wide formula. */
.rich :deep(pre.code) {
  padding: 8px 10px;
  overflow-x: auto;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-box);
  background-color: var(--color-fill);
  font-family: var(--font-mono);
  font-size: 0.86em;
  line-height: 1.45;
  white-space: pre;
  tab-size: 2;
}

.rich :deep(code) {
  padding: 0.05em 0.3em;
  border-radius: 3px;
  background-color: var(--color-fill);
  font-family: var(--font-mono);
  font-size: 0.9em;
}

/* A displayed formula scrolls on its own, so a wide one never widens the page. */
.rich :deep(mjx-container[display='true']) {
  display: block;
  margin: 0.7em 0;
  padding: 2px 0;
  overflow-x: auto;
  overflow-y: hidden;
  text-align: center;
}

.rich :deep(mjx-container svg) {
  max-width: none;
}
</style>
