<template>
  <v-app id="inspire">
    <div id="background"></div>

    <v-navigation-drawer app clipped temporary v-model="drawer">
    </v-navigation-drawer>

    <v-app-bar app color="indigo" dark clipped-left>
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
      <v-toolbar-title>Script Help</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>cloud</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <v-row>
          <v-col :cols="leftCol">
            <v-treeview
              dense
              hoverable
              activatable
              active-class="LB"
              open-on-click
              return-object
              :items="items"
            >
              <template slot="label" slot-scope="{ item }">
                <a @click="selectItem(item)">{{ item.name }}</a>
              </template>
            </v-treeview>
          </v-col>

          <v-col :cols="centerCol">
            <v-container v-for="item in items" :key="item.id">
              <p class="text-h4 ml-n4">{{ item.name }}</p>
              <div v-if="item.children.length > 0">
                <HelpEntry
                  v-for="entry in item.children"
                  :key="entry.id"
                  :entry="entry"
                ></HelpEntry>
              </div>
            </v-container>
          </v-col>
          <!--           
          <v-col :cols="rightCol">
          </v-col>   -->
        </v-row>
      </v-container>
    </v-main>

    <v-footer color="indigo" app>
      <span class="white--text body-2">
        Made by
        <a href="http://kevinhill.codes" class="blue--text">Kevin Hill</a>
      </span>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HelpEntry from "./components/HelpEntry.vue";
import help from "./help.json";

@Component({
  components: {
    HelpEntry
  }
})
export default class App extends Vue {
  drawer = false;
  selection = [];
  leftCol = 3;
  centerCol = 9;
  rightCol = 2;
  search = null;
  caseSensitive = false;

  selectItem(item) {
    console.log(item);
  }

  items() {
    let id = 1;

    const sections = Object.entries(help).map(([key, section]) => {
      let children = [];

      if (help[key].Methods) {
        const sectionMethods = Object.keys(help[key].Methods);

        children = sectionMethods.map(methodName => {
          return {
            id: id++,
            name: methodName,
            ...help[key].Methods[methodName]
          };
        });
      }

      return {
        id: id++,
        name: section.Name,
        children
      };
    });

    return sections;
  }
}
</script>

<style>
.theme--light.v-application {
  background: transparent !important;
}

/**
 * Shamelessly stolen from strokesplus.net, Thanks Rob!
 */
#background {
  z-index: -999;
  position: fixed;
  top: 56px;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url("./assets/StrokesPlus.net_NoBG.svg");
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: contain;
  background-position: center;
  opacity: 0.05;
  filter: alpha(opacity=05);
}

.LB {
  border-left: 2px solid blue;
}
</style>
