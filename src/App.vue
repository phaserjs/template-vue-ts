<script setup lang="ts">
import Phaser from 'phaser';
import { ref, toRaw } from 'vue';
import type { MainMenu } from './game/scenes/MainMenu';
import PhaserGame from './game/PhaserGame.vue';

// Only we can move the logo in the main menu
const can_move_logo = ref(false);

// Reference to the PhaserGame component (game and scene are exposed)
const phaser_ref = ref();
const logo_position = ref({ x: 0, y: 0 });

const changeScene = () => {
    const scene = toRaw(phaser_ref.value.scene) as MainMenu;
    if (scene) {
        scene.changeScene();
    }
}

const moveLogo = () => {
    if (phaser_ref.value !== undefined) {

        const scene = toRaw(phaser_ref.value.scene) as MainMenu;
        if (scene) {
            // Get the update logo position
            (scene as MainMenu).moveLogo(({ x, y }) => {
                logo_position.value = { x, y };
            });
        }
    }
}

const addStars = () => {
    const scene = toRaw(phaser_ref.value.scene) as Phaser.Scene;
    if (scene) {
        // Add more stars
        const x = Phaser.Math.Between(100, scene.scale.width - 100);
        const y = Phaser.Math.Between(100, scene.scale.height - 100);
    
        scene.add.image(x, y, 'star');
    }
}

// Event emitted from the PhaserGame component
const currentScene = (scene: MainMenu) => {
    can_move_logo.value = (scene.scene.key !== "MainMenu");
}

</script>

<template>
    <PhaserGame ref="phaser_ref" @current-active-scene="currentScene" />
    <div>
        <div>
            <button class="button-change-scene" @click="changeScene">Change Scene</button>
        </div>
        <div>
            <button :disabled="can_move_logo" class="button-change-scene" @click="moveLogo">Move main Logo</button>
        </div>
        <div class="margin-left">Logo position:
            <pre>{{ logo_position }}</pre>
        </div>
        <div>
            <button class="button-change-scene" @click="addStars">Add stars</button>
        </div>
    </div>
</template>
