<template>
<div>
  <v-btn color="primary" :to="{ name: 'home'}"><v-icon class="mr-2">fas fa-home</v-icon> Home</v-btn>
    <v-toolbar flat color="white">
      <v-toolbar-title>Manage Stories</v-toolbar-title>
      <v-divider
        class="mx-2"
        inset
        vertical
      ></v-divider>
      <v-spacer></v-spacer>
      <!-- <v-dialog v-model="dialog" max-width="500px">
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>

          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.name" label="Dessert name"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.calories" label="Calories"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.fat" label="Fat (g)"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.carbs" label="Carbs (g)"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.protein" label="Protein (g)"></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="close">Cancel</v-btn>
            <v-btn color="blue darken-1" flat @click="save">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog> -->
    </v-toolbar>
    <v-data-table
      :headers="headers"
      :items="stories"
      class="elevation-1"
      :pagination.sync="pagination"
    >
      <template slot="items" slot-scope="props">
        <td style="white-space:nowrap">{{ moment(props.item.posted).format('YYYY-MM-DD hh:mm') }}</td>
        <td>{{ props.item.name }}</td>
        <td>{{ props.item.story }}</td>
        <td>
         
          <v-btn @click="deleteItem(props.item)" small flat color="error"><v-icon>fas fa-trash</v-icon></v-btn>
        </td>
      </template>
      <template slot="no-data">
        <p>No data found</p>
      </template>
    </v-data-table>
  </div></template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data: () => ({
    dialog: false,
    headers: [
      { text: 'Posted', align: 'left', value: 'posted' },
      { text: 'Name', align: 'left', value: 'name' },
      { text: 'Story', align: 'left', value: 'story' },
      { text: 'Actions', value: 'name', sortable: false }
    ],
    pagination: {
      descending: true
    }
  }),

  computed: {
    ...mapGetters({
      stories: 'story/all'
    })
  },

  watch: {
    dialog (val) {
      val || this.close()
    }
  },

  methods: {
    ...mapActions({
      load: 'story/load',
      remove: 'story/remove'
    }),
    initialize() {
      this.load().then()
    },
    deleteItem (item) {
        var result = confirm(`Are you sure you want to delete this item?\n\n ${item.story}`)
        if (result) this.remove(item._id)
    },
  },
  
  created () {
    this.initialize()
  }


}
</script>

<style>

</style>
