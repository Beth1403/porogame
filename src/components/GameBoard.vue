<template>
  <v-container class="background">
    <h1 class="game-title">Poro Memory-Game</h1>

   
    <p class="attempts-counter">
      Nombre d'essais : {{ attempts }}
    </p>

   
    <div class="best-scores">
      Meilleurs scores :
      <ul>
        <li v-for="(score, index) in bestScores" :key="index">
          {{ score }} essais
        </li>
      </ul>
    </div>

    <div class="game-board">
      <GameCard
        v-for="(card, index) in cards"
        :key="index"
        :card="card"
        :index="index"
        @flip="flipCard"
      />
    </div>

    <v-btn
      @click="resetGame"
      color="blue-darken-2"
      variant="flat"
      class="reset-btn"
      rounded="lg"
      size="x-large"
    >
      Recommencer
    </v-btn>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import GameCard from './GameCard.vue';

import poro1 from '@/assets/poro1.jpg';
import poro2 from '@/assets/poro2.jpg';
import poro3 from '@/assets/poro3.jpg';
import poro4 from '@/assets/poro4.jpg';
import poro5 from '@/assets/poro5.jpg';
import poro6 from '@/assets/poro6.jpg';
import poro7 from '@/assets/poro7.jpg';
import poro8 from '@/assets/poro8.jpg';

const images = [
  poro1, poro2, poro3, poro4, poro5, poro6, poro7, poro8,
  poro1, poro2, poro3, poro4, poro5, poro6, poro7, poro8
];

const cards = ref([]);
const flippedCards = ref([]);
const isChecking = ref(false);
const attempts = ref(0);
const bestScores = ref([]);

const initializeGame = () => {
  cards.value = images
    .map((img) => ({ image: img, flipped: false, matched: false }))
    .sort(() => Math.random() - 0.5);

  flippedCards.value = [];
  isChecking.value = false;
  attempts.value = 0;

  loadBestScores(); 
};

const flipCard = (index) => {
  if (isChecking.value || cards.value[index].flipped || cards.value[index].matched) return;

  cards.value[index].flipped = true;
  flippedCards.value.push(index);

  if (flippedCards.value.length === 2) {
    isChecking.value = true;
    attempts.value++;
    setTimeout(checkMatch, 800);
  }
};

const checkMatch = () => {
  const [first, second] = flippedCards.value;
  if (cards.value[first].image === cards.value[second].image) {
    cards.value[first].matched = true;
    cards.value[second].matched = true;
  } else {
    cards.value[first].flipped = false;
    cards.value[second].flipped = false;
  }

  flippedCards.value = [];
  isChecking.value = false;


  if (cards.value.every(card => card.matched)) {
    saveBestScore(attempts.value);
    setTimeout(() => {
      alert(`🎉 Bravo ! Tu as gagné en ${attempts.value} essais !`);
    }, 500);
  }
};


const saveBestScore = (score) => {
  // Récupère les anciens scores depuis le localStorage
  const scores = JSON.parse(localStorage.getItem('bestScores')) || [];
  scores.push(score);

  // Trie les scores du plus petit au plus grand
  scores.sort((a, b) => a - b);

  // Garde uniquement les 5 meilleurs scores
  bestScores.value = scores.slice(0, 5);

  // Sauvegarde dans le localStorage
  localStorage.setItem('bestScores', JSON.stringify(bestScores.value));
};


const loadBestScores = () => {
  const scores = JSON.parse(localStorage.getItem('bestScores')) || [];
  bestScores.value = scores;
};

const resetGame = () => {
  console.log('Game reset!');
  initializeGame();
};

onMounted(() => {
  initializeGame();
});
</script>

<style scoped>
@import '../styles/game.css';

.attempts-counter {
  font-size: 1.2rem;
  color: #ffffff;
  background-color: #3b7eb8;
  padding: 10px;
  border-radius: 8px;
  margin-bottom: 15px;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2);
}

.best-scores {
  font-size: 1rem;
  color: #ffffff;
  background-color: #184e77;
  padding: 10px;
  border-radius: 8px;
  margin-bottom: 15px;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2);
}

.best-scores ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.best-scores li {
  font-size: 0.9rem;
  padding: 5px 0;
}
</style>
