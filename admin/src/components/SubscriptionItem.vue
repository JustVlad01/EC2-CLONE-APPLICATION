<script setup>
const props = defineProps({
  plan: String,
  price: String
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
  'Custom domain',
  'Loyalty program'
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
  <div class="item" @click="selectPlan">
    <span class="title">{{ props.plan }}</span>
    <ul class="feature-list">
      <li v-for="feature in features" :key="feature" :class="{ unavailable: !featuresByPlan[props.plan].includes(feature) }">
        {{ feature }}
      </li>
    </ul>
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
  color: gray;
}
</style>
