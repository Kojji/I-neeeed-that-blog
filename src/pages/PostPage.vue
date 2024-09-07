<template>
  <q-page class="row post-container">
    <div class="col">
      <p class="text-h4 text-weight-bolder q-my-lg">
        {{ postSelected.title }}
      </p>
      <q-separator color="teal-9" inset />
      <q-list>
        <PostSection v-for="section in postSection" :key="section.order" v-bind:section="section" />
      </q-list>
    </div>
  </q-page>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from "vue-router";
import { usePostSelectedStore } from 'stores/BlogPost';
import PostSection from 'src/components/PostSection.vue';


const store = usePostSelectedStore();
const route = useRoute();

// const postSelected = computed(() => store.getPostSelected);
const postSelected = {
  title: 'Getting SSR to work with Quasar Framework with Vue Composition as the State Management Choice',
  photoUrl: 'https://ae-pic-a1.aliexpress-media.com/kf/S3a417784280a4979a195eae718cfe28fF.jpg_640x640Q90.jpg_.webp',
  urlAlias: 'cooking-gadgets',
  active: true
};

defineOptions({
  name: 'PostPage'
});

// console.log(postSelected.value)
console.log(route.params)

const postSection = [{
  order: 1,
  type: "text",
  data: `<p><b>Lorem ipsum dolor sit amet</b>, consectetur adipiscing elit. Nulla elementum fermentum sagittis. Sed vehicula semper erat at porta. Phasellus urna felis, ornare eu ornare ut, efficitur vel quam. Duis id posuere purus, sed convallis massa. Nulla viverra, libero nec mollis tincidunt, risus ante euismod ante, id pharetra erat lectus nec risus. Curabitur purus tellus, pellentesque vel arcu in, tempus tincidunt nulla. Proin vestibulum suscipit hendrerit. Fusce lacinia magna egestas finibus maximus. Aliquam bibendum leo nec leo posuere, eu sollicitudin purus interdum. Donec scelerisque aliquam orci, a maximus orci posuere pulvinar. Mauris erat elit, egestas quis hendrerit non, interdum sit amet tellus. Nunc vel mi nec ex ullamcorper commodo et nec nisi. Donec dapibus laoreet ante, id viverra mi bibendum pharetra. Donec volutpat elit ut nisl dignissim, sit amet aliquam ante mattis.<br><br>
        Pellentesque scelerisque luctus sapien. Nunc nec vulputate quam. Proin vestibulum lacinia mauris, eu convallis enim pellentesque sed. Donec vitae fringilla nunc. Phasellus aliquam, ante non vehicula volutpat, lorem ante suscipit neque, sed tempus dui dui vel eros. Pellentesque congue pharetra velit, ac euismod diam consequat vehicula. Donec elementum turpis sed odio laoreet egestas. Vestibulum nisl dolor, mollis at dignissim sit amet, viverra ac nunc. Donec vehicula eleifend sem, vitae pharetra massa commodo at. Integer scelerisque varius sem vel vestibulum. Integer maximus porttitor rutrum. Fusce at nulla sit amet tortor ultricies laoreet vel vel libero. Maecenas a facilisis est, at interdum est. Aenean congue purus vitae sem tincidunt, blandit porttitor metus efficitur. Suspendisse felis ligula, malesuada vitae lorem ac, accumsan imperdiet enim. Phasellus congue ornare accumsan.</p>`
},
{
  order: 2,
  type: "image",
  link: "https://images.mid-day.com/images/images/2022/nov/christmas_d.jpg",
  alt: "christmas presents",
  ratio: 16 / 9,
  col: "10" //corrigir - add label
},
{
  order: 3,
  type: "title",
  data: "Example Title for a section",
  identifier: "example-title"
},
{
  order: 4,
  type: "embed",
  label: "Related Videos",
  links: [
    "1O3uY2WUyzQ",
    "CxF6juFptfM"
  ],
  origin: "https://www.youtube.com/embed/"
},
{ //corrigir - implementar componente
  order: 5,
  type: "cta",
  products: [
    // ids
  ],
}];

/* data types
    embed
      links
      origin
      label
    text
      data
    image
      link
      alt
      ratio
      col
    cta
      links
    title
      data
      identifier

    compare *

    add preview post page
*/
</script>

<style lang="scss">
.post-container {
  max-width: 720px;
  width: 100%;
  margin: 0 auto;

  font-family: sans-serif, Helvetica, Arial, sans-serif;
  font-weight: 400;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
