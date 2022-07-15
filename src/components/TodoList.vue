<script setup>

import { computed, reactive, ref, watch } from 'vue';
import TodoListItem from './TodoListItem.vue';
import AddTodoItemVue from './AddTodoItem.vue';

const response = await fetch('https://jsonplaceholder.typicode.com/todos');
let todos = await response.json();
todos = todos.slice(0, 10);

//variabila reactiva (prima varianta)
const reactiveTodos = ref(todos);
//reactiveTodos.value
//in script trebuie .value
//in template NU trebuie .value

//variabila reactiva (a doua varianta)
//proxy pe tot obiectul, nu pe fiecare element

let nextTodoId = reactiveTodos.value.length + 1;

const counter = reactive({
    deleted: 0,
    updated: 0
});


//destructurare => nu mai este reactive!!
//chiar daca in syntaxa folosim = reactive({})
//...toRefs(counter) ? (solves some problems:
//building objects based on other objects data
const counter2 = {
    ...counter,
    total: 0
};

/*
//extragerea unui singur element elimina reactivitatea!!
function incDel(deleted){
    deleted++;
}
incDel(counter.deleted)
*/

//dorim sa monitorizam modificarea unui element
//const counter = ref(0);

//putem monitoriza intregul ref
//sau doar un element (reactive)
//structura: 
    //prima parte: valoarea se modifica
    //a doua parte: functia apelata cand valorea se modifica
//watch(counter, (newValue, oldValue) => {
watch(() => counter.updated, (newValue, oldValue) => {
    console.log(`Counter updated ${oldValue} -> ${newValue}`);
})

//echivalent la () => counter.updated este:
function getUpdatedCounter(){
    return counter.updated;
}


function handleTodoItemDeleted(todoItemId){
    //console.log(`item deleted: ${todoItemId}`);
    reactiveTodos.value = reactiveTodos.value.filter(item => item.id !== todoItemId);
    //console.log(reactiveTodos.value);
    //proxy = reactive things, usefull
    counter.deleted++;
    //counter.value++;
    //nu e necesar sa folosim .value
}

function handleTodoItemCompleted(todoItemId, completed){
    //actualizarea valorii lui completed
    //mapping pentru a returna valorile array-ului
    //si totodata, pentru obiectul curent, sa actualizam completed
    reactiveTodos.value = reactiveTodos.value.map(todo => {
        if(todo.id === todoItemId) {
            return {
                ...todo,
                completed: completed
            }
        }
        else {
            return todo;
        }

    });
    console.log(`item completed: ${todoItemId} >> ${completed}`);
    counter.updated++;
    //counter.value++;
}

function handleTodoItemAdded(todoTitle, todoCompleted){
    console.log(`Hello there: ${todoTitle} ---> ${todoCompleted}`);
    reactiveTodos.value.push({
        id: nextTodoId++,
        title: todoTitle,
        completed: todoCompleted
    });
}


const checkbox = ref(true);

watch(checkbox, newValue => {
    console.log(`checkbox: ${newValue}`)
});


let secretId = false;
</script>

<template>
    <input type ="checkbox" v-model="checkbox" /> 

    <div>
    
        <AddTodoItemVue 
            @todo-item-added="handleTodoItemAdded"
        />

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
            v-for="todo of reactiveTodos"
            :key="todo.id"
            :id="todo.id"
            :title="todo.title"
            :completed="todo.completed"
            @todo-item-completed="completed => handleTodoItemCompleted(todo.id, completed)"
            @todo-item-deleted="handleTodoItemDeleted(todo.id)"
        />
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