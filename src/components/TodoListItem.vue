<script setup>
import { computed, onMounted, ref } from "@vue/runtime-core";
import printTodoItem from "../utils/printTodoItem";
import { test } from "../utils/printTodoItem";

//date intrare - proprietati
//by default - toate props sunt reactive!!
//defineProps() ~= reactive()
const props = defineProps({
    id: Number,
    title: String,
    completed: Boolean
});


//date iesire - evenimente
const emit = defineEmits(['todoItemDeleted', 'todoItemCompleted']);

//computed este reactive!!
//monitorizeaza, si utilizam automat valorile actuale
//completed il modificam in afara, dar valoarea noua nu se intoarce :(
//const newTitle = computed(() => `${props.id} . ${props.title}[${props.completed}]`);
const newTitle = computed(() => printTodoItem(props.id, props.title, props.completed));

function handleChange(event){
    emit('todoItemCompleted', event.target.checked);
}


let secretId = false;
</script>

<template>
    <div v-if="secretId === false" class="grid-container grid-container-columns-dim">
        <div class="grid-item-id">
            <p>{{id}}</p>
        </div>
        <input class="grid-item-checkbox" type="checkbox" :checked="completed " @change="handleChange" />
        <div class="grid-item-title">
            <p>{{ newTitle }}</p>
        </div>
        <button @click="$emit('todoItemDeleted')">Delete</button>
    </div>

    <div v-else class="grid-container grid-container-columns-dim-no-id">
        <input class="grid-item-checkbox" type="checkbox" :checked="completed " @change="handleChange" />
        <div class="grid-item-title">
            <p>{{ newTitle }}</p>
        </div>
        <button @click="$emit('todoItemDeleted')">Delete</button>
    </div>
</template>

<style scoped>
    .grid-item-id {
        text-align: center;
    }

    .grid-item-title {
        text-align: center;
        width: auto;
    }

    .grid-item-button {
        align-self: center;
    }

    .grid-container-columns-dim {
        grid-template-columns: 35px 100px auto 150px;
    }

    .grid-container-columns-dim-no-id {
        grid-template-columns: 100px auto 150px;
    }
</style>