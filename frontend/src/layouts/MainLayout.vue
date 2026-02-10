<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          Quasar App
        </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label
          header
        >
          Student Information
        </q-item-label>

        <q-item v-if="student">
          <q-item-section avatar>
            <q-icon name="person" color="primary" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ student.firstName }} {{ student.lastName }}</q-item-label>
            <q-item-label caption>{{ student.studentId }}</q-item-label>
          </q-item-section>
        </q-item>
        <q-item v-else-if="loadingStudent">
          <q-item-section avatar>
            <q-spinner color="primary" size="20px" />
          </q-item-section>
          <q-item-section>
            <q-item-label caption>กำลังโหลด...</q-item-label>
          </q-item-section>
        </q-item>
        <q-item v-else>
          <q-item-section avatar>
            <q-icon name="error" color="negative" />
          </q-item-section>
          <q-item-section>
            <q-item-label caption>ไม่พบข้อมูล</q-item-label>
          </q-item-section>
        </q-item>

        <q-separator spaced />

        <q-item-label
          header
        >
          Essential Links
        </q-item-label>

        <EssentialLink
          v-for="link in linksList"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import EssentialLink from 'components/EssentialLink.vue'

const API_URL = process.env.API_URL || '';

const student = ref(null);
const loadingStudent = ref(false);

const fetchStudent = async () => {
  loadingStudent.value = true;
  try {
    const res = await axios.get(API_URL + '/api/students');
    if (res.data.data && res.data.data.length > 0) {
      student.value = res.data.data[0];
    }
  } catch (err) {
    console.error('API /api/students error:', err);
  } finally {
    loadingStudent.value = false;
  }
};

onMounted(fetchStudent);

const linksList = [
  {
    title: 'Docs',
    caption: 'quasar.dev',
    icon: 'school',
    link: 'https://quasar.dev'
  },
  {
    title: 'Github',
    caption: 'github.com/quasarframework',
    icon: 'code',
    link: 'https://github.com/quasarframework'
  },
  {
    title: 'Discord Chat Channel',
    caption: 'chat.quasar.dev',
    icon: 'chat',
    link: 'https://chat.quasar.dev'
  },
  {
    title: 'Forum',
    caption: 'forum.quasar.dev',
    icon: 'record_voice_over',
    link: 'https://forum.quasar.dev'
  },
  {
    title: 'Twitter',
    caption: '@quasarframework',
    icon: 'rss_feed',
    link: 'https://twitter.quasar.dev'
  },
  {
    title: 'Facebook',
    caption: '@QuasarFramework',
    icon: 'public',
    link: 'https://facebook.quasar.dev'
  },
  {
    title: 'Quasar Awesome',
    caption: 'Community Quasar projects',
    icon: 'favorite',
    link: 'https://awesome.quasar.dev'
  }
]

const leftDrawerOpen = ref(false)

function toggleLeftDrawer () {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>
