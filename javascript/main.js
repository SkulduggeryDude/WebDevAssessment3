
Vue.component('product', {
    props: {
        premium: {
            type: Boolean,
            required: true
        }
    },
    template: `
  
        <div class="product">

            <div class="cart card text-bg-success bg-success mb-3">
                <p>Cart: {{ cart }}</p>
                <p>Items:</p>
                <ul
                    <li v-for="card in cartItems">
                    <p>{{card.title}}</p>
                    </li>
                </ul>
            </div>

            <div class="cards">
                <div class="row row-cols-1 row-cols-md-3">
                    <div class="col" v-for="(card, index) in cards" :key="index">
                        <div class="card text-center text-bg-success border-success mb-3" style="max-width: 18rem; border-width: 10px; margin:auto">
                        <img :src="card.image" class="card-img-top" :alt="card.alt">
                            <div class="card-body">
                                <h5 class="card-title">{{ card.title }}</h5>
                                <p class="card-text">{{ card.description }}</p>
                                <p v-if="card.inStock">In Stock</p>
                                <p v-else>Out of Stock</p>
                                <p>Shipping: {{ shipping }}</p>
                                <button @click="addToCart(card.title)" :disabled="!card.inStock">Add to Cart</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        
            <div class="product-tabs">
                <span class="tab text-bg-success bg-success" v-on:click="selectedTab = 'reviews'">Reviews</span>
                <span class="tab text-bg-success bg-success" v-on:click="selectedTab = 'add-review'">Add Review</span>
            </div>

            <div v-show="selectedTab === 'reviews'" class="product-reviews card text-bg-success bg-success mb-3">
                <h2>Product Reviews</h2>
                <ul
                    <li v-for="review in reviews">
                    <p>{{review.name}} says:</p>
                    <p>{{review.review}}</p>
                    </li>
                </ul>
            </div>

            <div v-show="selectedTab === 'add-review'" class="review-form card text-bg-success bg-success mb-3">
                    <h3>Leave a review</h3>
                    <form v-on:submit.prevent="submitReview">
                        <label for="name"><h5>Name:</h5></label>
                        <input type="text" id="name" v-model="newReview.name" required>
                        <label for="review"><h5>Review:</h5></label>
                        <textarea id="review" v-model="newReview.review" required></textarea>
                        <button type="submit">Submit</button>
                    </form>
            </div>
            
        </div>
    `,
    data() {
        return {

            cards: [
                {
                    image: './images/charizard.jpg',
                    alt: 'Holographic Charizard',
                    title: 'Holographic Charizard',
                    description: '1999 Pokemon Game Charizard Holo 1st Edition',
                    inStock: true
                },
                {
                    image: './images/blacklotus.jpg',
                    alt: 'Black Lotus',
                    title: 'Black Lotus Alpha',
                    description: '1993 Magic the Gathering Black Lotus Alpha',
                    inStock: true
                },
                {
                    image: './images/aerodactyl.jpg',
                    alt: 'Holographic Aerodactyl',
                    title: 'Aerodactyl 1st Edition',
                    description: '1999 Pokemon Fossil Aerodactyl Holo 1st Edition'
                },
                {
                    image: './images/trophypikachu.jpg',
                    alt: 'Trophy Pikachu',
                    title: 'Trophy Pikachu Gold',
                    description: '1997 Trophy Pikachu Gold 1st - 1st Tournament'
                },
                {
                    image: './images/wigglytuff.jpg',
                    alt: 'Holographic Wigglytuff',
                    title: 'Holographic Wigglytuff',
                    description: '1999 Pokemon Jungle Wigglytuff Holo'
                },
                {
                    image: './images/magikarp.jpg',
                    alt: 'University Magikarp',
                    title: 'University Magikarp',
                    description: '1998 University Magikarp Tamamushi University Prize'
                },
                {
                    image: './images/gyarados.jpg',
                    alt: "Giovanni's Gyarados",
                    title: "Giovanni's Gyarados Holo 1st Edition",
                    description: "2000 Pokemon Gym Giovanni's Gyarados Holo 1st Edition"
                },
                {
                    image: './images/arcanine.jpg',
                    alt: 'Holographic Arcanine',
                    title: 'Holographic Arcanine',
                    description: "2000 Pokemon Gym Chal Blaine's Arcanine Holo 1st Edition"
                },
                {
                    image: './images/darkraichu.jpg',
                    alt: 'Dark Raichu',
                    title: 'Holographic Dark Raichu',
                    description: '2000 Pokemon Rocket Dark Raichu Holo 1st Edition'
                }
            ],
            reviews: [{name: 'Thomas', review: 'This is a real review'}],
            newReview: {
                name: '',
                review: ''
            },
            selectedTab: 'reviews',
            cart: 0,
            cartItems: [],


        };
    },
    methods: {
        addToCart(title) {
            this.cart++;
            this.cartItems.push({title})
            console.log(title)
        },
        submitReview() {
            if (this.newReview.name && this.newReview.review) {
                this.reviews.push({ name: this.newReview.name, review: this.newReview.review });
                this.newReview.name = '';
                this.newReview.review = '';
                this.selectedTab = 'reviews';
            }
        }
    },
    computed: {
        shipping() {
            return this.premium ? 'Free' : '$2.99';
        }
    }
});

new Vue({
    el: '#app',
    data: {
        premium: true
    }
});