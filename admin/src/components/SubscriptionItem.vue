<script setup>
import {computed, onMounted, ref, watch} from "vue";

const props = defineProps({
  plan: String,
  price: String,
  recommended: Boolean,
  selected: Boolean
});

const features = [
  'Support 24/7',
  'Online ordering',
  'Statistics',
  'Menu suggestions',
  'Table reservation',
  'Staff roster management',
  'Color scheme customisation',
  'Marketing campaigns',
  'Advanced analytics',
];

const chosenPlan = ref(null);

const featuresByPlan = {
  'Basic': features.slice(0, 3), // Basic plan includes first 3 features
  'Pro': features.slice(0, 5), // Standard includes the first 5 features
  'Premium': features // Premium includes all features
};

const emit = defineEmits(['selectPlan']);

// For animating the percentage value
const animatedPercentage = ref(0);

// Function to animate number from 0 to 100 (or any other value)
const animateNumber = (start, end, duration) => {
  const startTime = performance.now();
  const step = (currentTime) => {
    const elapsedTime = currentTime - startTime;
    const progress = Math.min(elapsedTime / duration, 1); // Ensure progress doesn't exceed 1
    animatedPercentage.value = Math.floor(start + (end - start) * progress); // Update the number smoothly

    if (progress < 1) {
      requestAnimationFrame(step);
    }
  };

  requestAnimationFrame(step);
};

onMounted(() => {
  if (props.selected) {
    animateNumber(0, 100, 300); // Animate from 0 to 100 in 0.3 seconds
  }
});

// Watch for changes in the `selected` prop
watch(
    () => props.selected,
    (newVal) => {
      if (newVal) {
        animateNumber(0, 100, 300); // Animate from 0 to 100 in 0.3 seconds
      } else {
        animateNumber(100, 0, 300);
      }
    }
);

const selectPlan = () => {
  emit('selectPlan', props.plan);
};
</script>

<template>
  <div class="item"
       :style="{
          background: 'radial-gradient(circle, rgb(19 59 154) ' + animatedPercentage + '%, rgba(255,255,255,1) ' + animatedPercentage + '%)'
        }"
       :class="{ selected: props.selected, recommended: props.recommended }" @click="selectPlan">
    <span class="title">{{ props.plan }}</span>
    <ul class="feature-list">
      <li v-for="feature in features" :key="feature" :class="{ unavailable: !featuresByPlan[props.plan].includes(feature) }">
        {{ feature }}
      </li>
    </ul>
    <span class="price">{{props.price + "€ / month"}}</span>
  </div>
</template>

<style scoped>
.feature-list{
  list-style-type: disc;
  text-align: start;
  padding-left: 20px;
}

.item {
  width: 32%;
  background: radial-gradient(circle, rgba(22,51,75,1) 0%, rgba(255,255,255,1) 0%);
  background-size: 150%;
  border-radius: 5px;
  padding: 10px;
  border: 2px solid blue;
  text-align: center;
  cursor: pointer;
  transform: scale(0.9);
  box-shadow: 0 0 8px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s, background-size 0.5s ease-in-out;
}

.item.selected{
  color: white;
}

.item:hover {
  transform: scale(1);
  box-shadow: 0 0 20px 10px rgb(0 0 0 / 32%);
  transition: transform 0.3s, box-shadow 0.3s;
}

.recommended {
  outline: #5757d1 solid 5px;
  outline-offset: 5px;
  position: relative;
}

.recommended:after{
  content: "Recommended";
  position: absolute;
  top: -20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #5757d1;
  color: white;
  padding: 5px;
  border-radius: 5px;
}

.title {
  font-size: 25px;
  margin-bottom: 10px;
}

.feature-list li {
  margin: 5px 0;
  font-size: 14px;
}

.feature-list li.unavailable {
  text-decoration: line-through;
  color: rgb(128, 128, 128);
}

.price {
  font-weight: bold;
  color: rgb(128, 128, 128);
  display: block;
  font-size: 16px;
  margin-top: 15px;
}
</style>
