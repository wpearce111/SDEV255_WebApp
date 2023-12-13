const Element = {
    data() {
      return {
        inputTitle : false,
        inputTask : false,
      }
    },
    template : `
      <li> 
        <button @click="remove()"> Remove </button> 

        <span v-if="!inputTitle"> {{element.text}} </span>
        <input v-else type="text" :value="element.text" @blur="modify($event)" ref="refInputTitle"/>
        <button @click="inputTitle=true"> Modify Task Title </button>

        <span v-if="!inputTask"> {{element.task}} </span>
        <input v-else type="text" :value="element.task" @blur="task($event)" ref="refInputTask"/>
        <button @click="inputTask=true"> Modify Task Description</button>
        
        <label>Date Assigned: </label>
        <input type="date" :value="element.dateA" @blur="dateA($event)"/>
      </li>
    `,
    props : ["element"],
    methods : {
      remove() {
        // process the click on the Remove button
        this.$emit("remove", { id : this.element._id });
      },
      modify(event) {
        var value = event.target.value;
        this.inputTitle = false;
        this.$emit("modify", { id : this.element._id, value : value });
      },
      task(event) {
        var value = event.target.value;
        this.inputTask = false;
        this.$emit("task", { id : this.element._id, value : value });
      },
      dateA(event) {
        var value = event.target.value;
        this.$emit("dateA", { id : this.element._id, value : value });
      }
    },
    emits : ["remove", "modify", "task", "dateA"],
    updated() {
      // check that refInputTitle exists, and if so, give focus to 
      // the input field
      if (this.$refs.refInputTitle) this.$refs.refInputTitle.focus();  
      if (this.$refs.refInputTask) this.$refs.refInputTask.focus(); 
      if (this.$refs.refInputDateA) this.$refs.refInputDateA.focus();  
    }
  }
  export default Element;