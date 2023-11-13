
Vue.component('product',{
    props:{
        premium:{
            type: Boolean,
            required: true
        }
    },
    template: `
    <div class="product">
    this is a product

    <div class="product-info">
        <h1>{{ product }}</h1>
        <p v-if="inStock">In Stock</p>
        <p v-else>Out of Stock</p>
        <p>Shipping: {{ shipping }}</p>
        <ul>
            <li v-for="detail in details">{{detail}}</li>
        </ul>
        <button @click="addToCart" :disabled="!inStock">Add to Cart</button>
        <div class="cart">
            <p>Cart: {{ cart }}</p>
        </div>
        </div>

    <p class="product-tabs">
        <span class="tab" v-on:click="selectedTab = 'reviews'">Reviews</span>
        <span class="tab" v-on:click="selectedTab = 'add-review'">Add Review</span>
    </p>    

    <div v-show="selectedTab === 'reviews'" class="product-reviews">
        <h2>Product Reviews</h2>
        <ul
            <li v-for="review in reviews">
            <p>{{review.name}} says:</p>
            <p>{{review.review}}</p>
            </li>
        </ul>
    </div>

    <div v-show="selectedTab === 'add-review'" class="review-form">
        <h3>leave a review</h3>
        <form v-on:submit.prevent="submitReview">
            <label for="name">Name:</label>
            <input type="text" id="name" v-model="newReview.name" required>

            <label for="review">Review:</label>
            <textarea id="review" v-model="newReview.review" required></textarea>
            <button type="submit">Submit</button>
            </form>
            </div>




    </div>
    `,
    data(){
        return {
            product: 'Socks',
            inStock: true,
            details: ['80% cotton', '20% polyester','Gender-neutral'],
            cart: 0,
            reviews: [],
            newReview: {
                name: '',
                review: ''
            },
            selectedTab: 'reviews'
        };
    },
    methods: {
        addToCart() {
            this.cart++;
        },
        submitReview(){
            if(this.newReview.name && this.newReview.review){
                this.reviews.push({name: this.newReview.name, review: this.newReview.review});
                this.newReview.name = '';
                this.newReview.review = '';
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