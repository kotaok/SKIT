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
      <v-list-item @click="timeline_load">
        <v-toolbar-items>
            <v-list-item-icon>
          <v-icon>mdi-forum-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>タイムライン</v-list-item-title>
          </v-list-item-content>
        </v-toolbar-items>
      </v-list-item>
      <v-divider></v-divider>

      <v-list-item v-for="menu_list in menu_lists" :key="menu_list.name" @click="transition(menu_list.name); drawer=!drawer">
        <v-toolbar-items>
        <v-list-item-icon>
          <v-icon>{{ menu_list.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ menu_list.name }}</v-list-item-title>
        </v-list-item-content>
        </v-toolbar-items>
      </v-list-item>

      </v-list>
      </v-container>
    </v-navigation-drawer>

    <v-app-bar color="primary" dark app>
      <v-app-bar-nav-icon @click="drawer=!drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>chat work</v-toolbar-title>
    </v-app-bar>  




    <v-main>
      <v-card>
        <v-card-title class="chat_text" v-model="current_channel">
          {{ current_channel }}
        </v-card-title>
      </v-card>

      <v-list three-line dense>
      
      <template v-for="chat in this.chats">
          <v-list-item-content :key="chat.id">
            <v-list-item-title>user</v-list-item-title>
            <v-list-item-subtitle v-html="chat.text"></v-list-item-subtitle>
          </v-list-item-content>
      </template>
      </v-list>
    <v-container>
      <v-text-field outlined v-model="inputdata.name"></v-text-field>
      <v-btn @click="create">send</v-btn>
    </v-container>
    </v-main>



    <v-footer color="primary" dark app>
      chat work
    </v-footer>


  </v-app>
</template>

<script>
import firebase from 'firebase/app';

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
    ],
    inputdata: {
      name: ''
    },
    db: null,
    chats: [],
    current_channel: "開発部署"

  }),

  created: function (){
    this.db=firebase.firestore()
    var _this=this
    var CurrentChannel = _this.current_channel
    this.db.collection('chats/'+CurrentChannel+'/text').orderBy("timestamp").onSnapshot(function(querySnapshot) {
      _this.chats=[]
      querySnapshot.forEach(function (doc) {
        var data=doc.data()
        data.id=doc.id
        _this.chats.push(data)
      })
      element=document.documentElement;
      bottom=element.scrollHeight-element.clientHeight;
      window.scroll(0,bottom);
    })
    var element=document.documentElement;
    var bottom=element.scrollHeight-element.clientHeight;
    window.scroll(0,bottom);
  },

  methods: {
    create(){
      var _this=this
      var CurrentChannel = _this.current_channel
      this.db.collection('chats/'+CurrentChannel+'/text').add({
        text: this.inputdata.name,
        timestamp: firebase.firestore.Timestamp.now()
      })
      this.inputdata.name = ""
    },

    transition(channel_name){
      this.db=firebase.firestore()
      var _this=this
      this.db.collection('chats/'+channel_name+'/text').orderBy("timestamp").onSnapshot(function(querySnapshot) {
        _this.chats=[]
        querySnapshot.forEach(function (doc) {
          var data=doc.data()
          data.id=doc.id
          _this.chats.push(data)
        })
        element=document.documentElement;
        bottom=element.scrollHeight-element.clientHeight;
        window.scroll(0,bottom);
      })
      _this.current_channel = channel_name
      var element=document.documentElement;
      var bottom=element.scrollHeight-element.clientHeight;
      window.scroll(0,bottom);
    },

    timeline_load(){
      this.db=firebase.firestore()
      var _this=this
      var channel_lists = _this.menu_lists
      console.log(channel_lists)

    }
  }
};
</script>
