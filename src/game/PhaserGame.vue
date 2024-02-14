<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { EventBus } from './EventBus';
import StartGame from './main';
import Phaser from 'phaser';

// Save the current scene instance
const scene = ref();
const game = ref();

const emit = defineEmits(['current-active-scene'])

onMounted(() => {
    game.value = StartGame('game-container');
    EventBus.on('current-scene-ready', (scene_instance: Phaser.Scene) => {
        emit('current-active-scene', scene_instance);
        scene.value = scene_instance;
    });
});

defineExpose({ scene, game });

</script>

<template>
    <div id="game-container"></div>
</template>