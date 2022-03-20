
<template>
  <div class="list">
    <div class="column" align="center">
      <v-form ref="form" v-model="valid" lazy-validation>
        <td>
          <v-text-field
            v-model="newTask"
            :counter="30"
            class="pa-6"
            label="Task"
            append-icon="mdi-plus-circle-outline"
            clearable
          ></v-text-field>
        </td>
        <td>
          <v-text-field
            v-model="newDescription"
            :counter="50"
            class="pa-6"
            label="Description"
            append-icon="mdi-plus-circle-outline"
            clearable
          ></v-text-field>
        </td>
        <td>
          <v-text-field
            v-model="newAssigned"
            class="pa-6"
            hint = "https://i.pravatar.cc/300?img= + number"
            label="assigned"
            append-icon="mdi-account-circle"
            clearable
          ></v-text-field>
        </td>
        <td>
          <v-text-field
            v-model="newDueDate"
            :rules="[v => !!v || 'Date is required']"
            :counter="10"
            class="pa-6"
            label="due-date"
            hint="YYYY/DD/MM format"
            persistent-hint
            append-icon="mdi-calendar"
          ></v-text-field>
        </td>
        <td>
          <v-text-field
            v-model="newStatus"
            class="pa-6"
            label="Status"
            hint="approved/pending"
            append-icon="mdi-list-status"
          ></v-text-field>
        </td>
        <td>
          <v-btn @click.stop ="addTask" icon :disabled="!valid">
            <v-icon color="green" class="pa-5"
              >mdi-checkbox-marked-circle-plus-outline</v-icon
            >
          </v-btn>
        </td>
      </v-form>
    </div>
    <v-list two-line flat outlined>
      <div v-for="task in tasks" :key="task.id">
        <v-divider></v-divider>
        <div>
          <v-list-item
            @click="doneTask(task.id)"
            :class="{ 'blue lighten-5': task.done }"
          >
            <template v-slot:default>
              <v-list-item-action>
                <v-checkbox
                  :input-value="task.done"
                  color="primary"
                ></v-checkbox>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>{{ task.title }}</v-list-item-title>
                <v-list-item-subtitle>{{
                  task.description
                }}</v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-avatar>
                <v-img :src="task.assigned"></v-img>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title>{{ task.dueDate }}</v-list-item-title>
              </v-list-item-content>
              <v-btn
                :class="{
                  success: task.statusB,
                  'red darken-1': !task.statusB,
                }"
              >
                {{ task.status }}
              </v-btn>
              <v-list-item-action>
                <v-btn @click.stop="deleteTask(task.id)" icon>
                  <v-icon color="grey lighten-1">mdi-delete</v-icon>
                </v-btn>
              </v-list-item-action>
            </template>
          </v-list-item>
        </div>
      </div>
      <v-divider></v-divider>
    </v-list>
  </div>
</template>

<script>
export default {
  name: "List",
  data() {
    return {
      newTask: "",
      newDescription: "",
      newdueDate: "",
      newAssigned: "",
      newStatus: "",
      tasks: [
        {
          id: 1,
          title: "clean",
          description: "clean the house",
          assigned: "https://i.pravatar.cc/300?img=1",
          dueDate: "2022-04-09",
          status: "pending",
          statusB: false,
          done: false,
        },
        {
          id: 2,
          title: "buy",
          description: "buy a new car",
          assigned: "https://i.pravatar.cc/300?img=2",
          dueDate: "2022-04-09",
          status: "approved",
          statusB: true,
          done: false,
        },
      ],
    };
  },

  methods: {
    doneTask(id) {
      let task = this.tasks.filter((task) => task.id === id)[0];
      task.done = !task.done;
    },
    deleteTask(id) {
      this.tasks = this.tasks.filter((task) => task.id !== id);
    },
    addTask() {
      if (this.newStatus == "approved") {
        this.tasks.push({
          id: this.tasks.length + 1,
          title: this.newTask,
          description: this.newDescription,
          assigned: this.newAssigned,
          dueDate: this.newDueDate,
          done: false,
          status: this.newStatus,
          statusB: true,
        });
      } else {
        this.tasks.push({
          id: this.tasks.length + 1,
          title: this.newTask,
          description: this.newDescription,
          assigned: this.newAssigned,
          dueDate: this.newDueDate,
          done: false,
          status: "pending",
          statusB: false,
        });
      }
      this.newTask = "";
      this.newDescription = "";
      this.newDueDate = "";
      this.newAssigned = "";
      this.newStatus = "";
    },
  },
};
</script>


<style scoped>
.v-list-item__subtitle {
  font-size: 0.875rem;
  display: flex;
  justify-content: center;
}
.v-list-item__title {
  align-self: center;
  font-size: 1rem;
  display: flex;
  justify-content: center;
}
</style>