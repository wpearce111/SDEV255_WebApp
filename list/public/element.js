const Element = {
  data() {
    return {
      inputTitle: false,
      inputTask: false,
    };
  },
  template: `
      <li> 
        <button @click="remove()"> Remove </button> 

        <span v-if="!inputTitle"> {{element.text}} </span>
        <input v-else type="text" :value="element.text" @blur="modify($event, 'text')" ref="refInputTitle"/>
        <button @click="inputTitle=true"> Modify Task Title </button>

        <span v-if="!inputTask"> {{element.task}} </span>
        <input v-else type="text" :value="element.task" @blur="modify($event, 'task')" ref="refInputTask"/>
        <button @click="inputTask=true"> Modify Task Description</button>
        
        <label>Date Assigned: </label>
        <input type="date" :value="element.dateA" @blur="modify($event, 'dateA')"/>
        
        <label>Date Completed: </label>
        <input type="date" :value="element.dateC" @blur="modify($event, 'dateC')"/>
      </li>
    `,
  props: ["element"],
  methods: {
    remove() {
      // process the click on the Remove button
      this.$emit("remove", { id: this.element._id });
    },
    modify(event, field) {
      const value = event.target.value;
      if (field === "text") {
        this.inputTitle = false;
      }
      if (field === "task") {
        this.inputTask = false;
      }
    
      this.$emit("modify", { field, id: this.element._id, value });
    },
  },
  emits: ["remove", "modify"],
  updated() {
    // check that refInputTitle exists, and if so, give focus to
    // the input field
    if (this.$refs.refInputTitle) this.$refs.refInputTitle.focus();
    if (this.$refs.refInputTask) this.$refs.refInputTask.focus();
    if (this.$refs.refInputDateA) this.$refs.refInputDateA.focus();
  },
};
export default Element;
