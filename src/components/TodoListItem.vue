<script setup>
defineProps({
    id: Number,
    title: String,
    completed: Boolean
})

let secretId = false;

</script>

<template>
    <div v-if="secretId === false" class="grid-container grid-container-columns-dim">
        <div class="grid-item-id">
            <p>{{id}}</p>
        </div>
        <input class="grid-item-checkbox" type="checkbox" :checked="completed" />
        <div class="grid-item-title">
            <p>{{ title }}</p>
        </div>
        <button>Delete</button>
    </div>

    <div v-else class="grid-container grid-container-columns-dim-no-id">
        <input class="grid-item-checkbox" type="checkbox" :checked="completed" />
        <div class="grid-item-title">
            <p>{{ title }}</p>
        </div>
        <button>Delete</button>
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