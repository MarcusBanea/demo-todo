<script setup>
import { computed, ref } from "vue";

const todoTitle = ref('');
const todoCompleted = ref(false);

//events
const emit = defineEmits(['todoItemAdded']);

function handleAddition(event) {
    emit('todoItemAdded', todoTitle.value, todoCompleted.value);
    console.log(`${todoTitle.value} - ${todoCompleted.value}`);
    todoTitle.value = "";
}

const isDisabled = computed(() => todoTitle.value === "");

</script>

<template>
    <div class="grid-container">
        <form @submit.prevent="handleAddition">
            <div>
                <p style="text-align: center; font-size: 20px;">
                    Add Todo
                </p>
            </div>
            <div class="grid-container-insider grid-container-insertData-columns-dim">
                <div id="grid-item-setTitle">
                    <label for="set_title">Title: </label>
                    <input id="set_title" type="text" placeholder="Add a title..." v-model="todoTitle" />
                </div>
                <div id="grid-item-setCompleted">
                    <label for="set_completed">Completed? </label>
                    <input id="set_completed" type="checkbox" v-model="todoCompleted">
                </div>
            </div>
            <div style="text-align: center; margin: 10px auto;">
                <input type="submit" value="ADD" style="font-size: 15px; width: 150px"
                    :disabled="isDisabled" />
            </div>
        </form>
    </div>
</template>

<style scoped>
.grid-container {
    color: #f5f5ef;
    margin: 15px auto;
    width: 1000px;
    display: grid;
    background-color: #1f2839;
    padding: 10px;
    border: 7px solid #b69d74;
}

.grid-container-insider {
    color: #f5f5ef;
    display: grid;
    background-color: #1f2839;
    padding: 10px;
    border: 7px solid #b69d74;
}

.grid-container-insertData-columns-dim {
    grid-template-columns: 50% 50%;
}

#grid-item-setTitle {
    margin: auto;
}

#grid-item-setCompleted {
    margin: auto;
}
</style>