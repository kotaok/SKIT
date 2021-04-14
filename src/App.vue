<template>
  <v-app>
    <v-navigation-drawer app v-model="drawer" clipped>
      <v-container>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="title">
              chat work社
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      <v-divider></v-divider>
      <v-list dense nav>
      <v-list-item v-for="menu_list in menu_lists" :key="menu_list.name">
        <v-list-item-icon>
          <v-icon>{{ menu_list.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ menu_list.name }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      </v-list>
      </v-container>
    </v-navigation-drawer>

    <v-app-bar color="primary" dark app>
      <v-app-bar-nav-icon @click="drawer=!drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>chat work</v-toolbar-title>
    </v-app-bar>  

    <v-footer color="primary" dark app>
      chat work
    </v-footer>


  </v-app>
</template>

<script>

export default {

  components: {
    
  },

  data: () => ({
    drawer: null,
    menu_lists:[
      {name: '開発部署',icon: 'mdi-lock'},
      {name: 'デザイン部署',icon: 'mdi-lock'},
      {name: 'お知らせ',icon: 'mdi-pound'},
      {name: 'ヘルプ',icon: 'mdi-pound'},
    ]
  }),
};
</script>
