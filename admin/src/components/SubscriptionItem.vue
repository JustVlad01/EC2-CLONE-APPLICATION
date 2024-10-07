<script setup>
const props = defineProps({
  plan: String,
  price: String,
  recommended: Boolean
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

const featuresByPlan = {
  'Basic': features.slice(0, 3), // Basic plan includes first 3 features
  'Pro': features.slice(0, 5), // Standard includes the first 5 features
  'Premium': features // Premium includes all features
};

const emit = defineEmits(['selectPlan']);

const selectPlan = () => {
  emit('selectPlan', props.plan);
};
</script>

<template>
  <div class="item" :class="{recommended: recommended}" @click="selectPlan">
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
  background-color: white;
  border-radius: 5px;
  padding: 10px;
  border: 2px solid blue;
  text-align: center;
  cursor: pointer;
  transform: scale(0.9);
  box-shadow: 0 0 8px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
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
