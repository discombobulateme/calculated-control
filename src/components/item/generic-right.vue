<template>
  <section class="section content">
    <div class="item__info">
      <div v-if="note" class="item__bio note">
        {{ item.abstractNote }}
      </div>
      <div v-else class="item__fields">
        <template v-if="titleAuthorType">
          <div v-if="item.title" class="field">
            <span class="field__label">{{ $t('item.title') }}</span>
            {{ item.title }}
          </div>
          <div v-if="creators && creators.length > 0" class="field">
            <span class="field__label">{{ $t('item.authors') }}</span>
            {{ creators }}
          </div>
          <div v-if="item.itemType" class="field">
            <span class="field__label">{{ $t('item.type') }}</span>
            {{ item.itemType }}
          </div>
        </template>
        <div v-if="item.date" class="field">
          <span class="field__label">{{ $t('item.date') }}</span>
          {{ formatDate(item.date) }}
        </div>
        <div v-if="item.accessDate" class="field">
          <span class="field__label">{{ $t('item.accessDate')}}</span>
          {{ formatDate(item.accessDate) }}
        </div>
        <div v-if="item.dateAdded" class="field">
          <span class="field__label">{{ $t('item.dateAdded') }}</span>
          {{ formatDate(item.dateAdded) }}
        </div>
        <div v-if="item.publisher" class="field">
          <span class="field__label">{{ $t('item.publisher') }}</span>
          {{ item.publisher }}
        </div>
        <div v-if="item.runningTime" class="field">
          <span class="field__label">{{ $t('item.runningTime') }}</span>
          {{ item.runningTime }}
        </div>
        <div v-if="item.DOI" class="field">
          <span class="field__label">DOI</span>
          {{ item.DOI }}
        </div>
        <div v-if="item.ISBN" class="field">
          <span class="field__label">ISBN</span>
          {{ item.ISBN }}
        </div>
        <div v-if="item.language" class="field">
          <span class="field__label">{{ $t('item.language') }}</span>
          {{ item.language }}
        </div>
        <div v-if="item.numPages" class="field">
          <span class="field__label">{{ $t('item.pages') }}</span>
          {{ item.numPages }}
        </div>
        <div v-if="item.archive" class="field">
          <span class="field__label">{{ $t('item.archive') }}</span>
          {{ item.archive }}
        </div>
        <div v-if="item.libraryCatalog" class="field">
          <span class="field__label">{{ $t('item.catalog') }}</span>
          {{ item.libraryCatalog }}
        </div>
        <div v-if="item.url" class="field">
          <span class="field__label">URL</span>
          <a :href="item.url" class="link one-line">{{ item.url }}</a>
        </div>
        <div v-if="image && item.abstractNote" class="field field--long">
          <span class="field__label">{{ $t('item.abstract') }}</span>
          <pre class="field__pre">{{ item.abstractNote }}</pre>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { getItemAuthor, formatDate } from '@/utils';

export default {
  name: 'ItemGenericRight',
  props: {
    item: {
      type: Object,
      required: true,
    },
    titleAuthorType: {
      type: Boolean,
      default: true,
    },
    note: {
      type: Boolean,
      default: false,
    },
    image: {
      type: [String, null],
      default: null,
    },
  },
  computed: {
    creators() {
      console.log(this.titleAuthorType);
      return getItemAuthor(this.item);
    },
  },
  methods: {
    formatDate(date) {
      return formatDate(date);
    },
  },
}
</script>

<style scoped>
.section {
  border: solid 1px black;
  border-top: none;
  border-left: none;
  height: 100%;
  overflow: auto;
}

.note {
  font-size: var(--font-size-small);
  padding: 15px 15px;
  white-space: pre-wrap;
}

.item__info {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.field {
  border: solid 1px black;
  font-size: var(--font-size-small);
  padding: 10px;
}

.field:last-of-type {
  border-bottom: solid 2px black;
}

.field__label {
  display: block;
}

.field--long .field_label {
  display: block;
  margin: 0 0 5px;
}

.field__pre {
  white-space: pre-wrap;
  font-family: inherit;
}

@media screen and (min-width: 1200px) {
  .item__fields {
    max-height: calc(100vh - 60px);
    overflow: auto;
  }
}
</style>
