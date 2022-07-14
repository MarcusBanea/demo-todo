<script setup>

import TodoListItem from './TodoListItem.vue';


const response = await fetch('https://jsonplaceholder.typicode.com/todos');
const todos = await response.json();
const nameVar = "def";

let secretId = false;

</script>

<template>
    <div>
        <div v-if="secretId === false" class="grid-container grid-container-columns-dim">
            <div id="grid-item-id-text">
                Id
            </div>
            <div id="grid-item-checkbox-text">
                Completed
            </div>
            <div id="grid-item-title-text">
                Title
            </div>
            <div id="grid-item-delete-text">
                Delete
            </div> 
        </div>

        <div v-else class="grid-container grid-container-columns-dim-no-id">
            <div id="grid-item-checkbox-text">
                Completed
            </div>
            <div id="grid-item-title-text">
                Title
            </div>
            <div id="grid-item-delete-text">
                Delete
            </div> 
        </div>


        <TodoListItem 
            v-for="todo of todos"
            :key="todo.id"
            :id="todo.id"
            :title="todo.title"
            :completed="todo.completed"
        />
    </div>

    <ul>
        
    </ul>
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

    .grid-container-columns-dim {
        grid-template-columns: 35px 100px auto 150px;
    }

    .grid-container-columns-dim-no-id {
        grid-template-columns: 100px auto 150px;
    }

    #grid-item-id-text {
        font-size: 20px;
        text-align: center;
    }

    #grid-item-checkbox-text {
        font-size: 20px;
        text-align: center;
    }

    #grid-item-title-text {
        font-size: 25px;
        text-align: center;
        width: auto;
    }

    #grid-item-delete-text {
        font-size: 20px;
        text-align: center;
    }

</style>