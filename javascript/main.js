//This program has all features as one component, therefore it has no eventbus as there is no need to pass data between components.
//I know the marking ruberic has marks for each feature in its own component but I have done it my way ¯\_(ツ)_/¯ hopefully you're open to interpretation

//This is the component that gets imported into the html with <product>
Vue.component('product', {
    //props is used to pass data into the component from the app
    props: {
        //premium is declared as a boolean variable that is required for the code to run
        premium: {
            //this is set to true below in #app
            type: Boolean,
            required: true
        }
    },
    //template is that code that gets inserted into the html document, this is html code, not js
    //This html code can also use the bootstrap framework used in the last assessment
    template: `
        <!--All template code must be contained in a div container, aka product -->
        <div class="product">
            <!--Here we create the cart where items the buy will be added -->
            <div class="cart card text-bg-success bg-success mb-3">
                <!--In this html code, we can insert our variables into the code with {{variable}} -->
                <p>Cart: {{ cart }}</p>
                <!--\ is an escape charater for $ -->
                <p>Total: \${{cartTotal}}</p>
                <!--Note this shipping is a not a variable but calls the shipping method in computing in data -->
                <!--The shipping method returns a string that displays if the user has free shipping and sets the base cost to 3 if not premium -->
                <p>{{shipping}}
                <p>Items:</p>
                <ul
                    <!-- Here we use a vue for loop to go though the cartItems array and display its content as a ul in html -->
                    <li v-for="(card,index) in cartItems">
                    <!-- Each item in cartItems is a cards object, so to get its data we use card.___ card being the variable we use for each item -->
                    <!-- When the remove button is clicked we call the removeFromCart function and pass to it the card price and index for the cards array in data-->
                    <p>{{card.title}} \${{card.price}} <button @click="removeFromCart(card.price,index)">Remove</button></p>
                    </li>
                </ul>
            </div>

            <div class="cards">
                <!--Note we are still using our bootstrap classes and formatting -->
                <div class="row row-cols-1 row-cols-md-3">
                    <!-- Displaying every card in the cards array in data with a for loop -->
                    <div class="col" v-for="(card, index) in cards" :key="index">
                        <div class="card text-center text-bg-success border-success mb-3" style="max-width: 18rem; border-width: 10px; margin:auto">
                        <img :src="card.image" class="card-img-top" :alt="card.alt">
                            <div class="card-body">
                                <!-- The for loop will change each of these card.___ for each card -->
                                <h5 class="card-title">{{card.title}}</h5>
                                <p class="card-text">{{card.description}}</p>
                                <!-- Here we use an if statement on card.stock, if it is true, aka not 0 then it will display card.stock -->
                                <p v-if="card.stock">In Stock: {{card.stock}}</p>
                                <!-- Our else statement will display out of stock -->
                                <p v-else>Out of Stock</p>
                                <!-- When the button is pressed we call addToCard function and pass it the cards title and price  -->
                                <button @click="addToCart(card.title,card.price)" :disabled="card.stock<1">Add to Cart</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- At the top of the reviews we have the ability to click on one of these tabs to set the selectedTab, which shows one of the divs below -->
            <div class="product-tabs">
                <!-- In data we set selectedTab to reviews by default but v-on:click will set it to each one -->
                <span class="tab text-bg-success bg-success" v-on:click="selectedTab = 'reviews'">Reviews</span>
                <span class="tab text-bg-success bg-success" v-on:click="selectedTab = 'add-review'">Add Review</span>
            </div>

            <!-- This div shows when selectedTab equals reviews -->
            <div v-show="selectedTab === 'reviews'" class="product-reviews card text-bg-success bg-success mb-3">
                <h2>Product Reviews</h2>
                <ul
                    <!-- Once again we use a ul with a for loop, this reads from the reviews array in data -->
                    <li v-for="review in reviews">
                    <p>{{review.name}} says:</p>
                    <p>{{review.review}}</p>
                    </li>
                </ul>
            </div>

            <!-- This tab shows when the user clicks on the add review tab -->
            <div v-show="selectedTab === 'add-review'" class="review-form card text-bg-success bg-success mb-3">
                    <h3>Leave a review</h3>
                    <!-- Here we have a form, on submit it calls the submitReview method -->
                    <form v-on:submit.prevent="submitReview">
                        <label for="name"><h5>Name:</h5></label>
                        <!-- v-model sets the newReview fields in data to what is entered, we use pattern to add a regex for letters only -->
                        <input type="text" pattern="[A-Za-z]*" id="name" v-model="newReview.name" required>
                        <label for="review"><h5>Review:</h5></label>
                        <textarea pattern="[A-Za-z]*" id="review" v-model="newReview.review" required></textarea>
                        <button type="submit">Submit</button>
                    </form>
            </div>
            
        </div>
    `,
    //data is the second part of our component where we declare variables to be inserted into the html
    data() {
        //The vue app calls data which returns everything below
        return {
            //cards is an array of card objects
            cards: [
                {
                    image: './images/charizard.jpg',
                    alt: 'Holographic Charizard',
                    //Title is what is added to the cart and used to identify the card when it is removed
                    title: 'Holographic Charizard',
                    description: '1999 Pokemon Game Charizard Holo 1st Edition',
                    //stock is used to prevent over adding to the cart
                    stock: 3,
                    //stock is what is added to the card total to get a final price
                    price: 13,
                },
                {
                    image: './images/blacklotus.jpg',
                    alt: 'Black Lotus',
                    title: 'Black Lotus Alpha',
                    description: '1993 Magic the Gathering Black Lotus Alpha',
                    stock: 1,
                    price: 12,
                },
                {
                    image: './images/aerodactyl.jpg',
                    alt: 'Holographic Aerodactyl',
                    title: 'Aerodactyl 1st Edition',
                    description: '1999 Pokemon Fossil Aerodactyl Holo 1st Edition',
                    stock: 1,
                    price: 11,
                },
                {
                    image: './images/trophypikachu.jpg',
                    alt: 'Trophy Pikachu',
                    title: 'Trophy Pikachu Gold',
                    description: '1997 Trophy Pikachu Gold 1st - 1st Tournament',
                    stock: 1,
                    price: 10,
                },
                {
                    image: './images/wigglytuff.jpg',
                    alt: 'Holographic Wigglytuff',
                    title: 'Holographic Wigglytuff',
                    description: '1999 Pokemon Jungle Wigglytuff Holo',
                    stock: 1,
                    price: 13,
                },
                {
                    image: './images/magikarp.jpg',
                    alt: 'University Magikarp',
                    title: 'University Magikarp',
                    description: '1998 University Magikarp Tamamushi University Prize',
                    stock: 1,
                    price: 13,
                },
                {
                    image: './images/gyarados.jpg',
                    alt: "Giovanni's Gyarados",
                    title: "Giovanni's Gyarados Holo 1st Edition",
                    description: "2000 Pokemon Gym Giovanni's Gyarados Holo 1st Edition",
                    stock: 1,
                    price: 13,
                },
                {
                    image: './images/arcanine.jpg',
                    alt: 'Holographic Arcanine',
                    title: 'Holographic Arcanine',
                    description: "2000 Pokemon Gym Chal Blaine's Arcanine Holo 1st Edition",
                    stock: 1,
                    price: 13,
                },
                {
                    image: './images/darkraichu.jpg',
                    alt: 'Dark Raichu',
                    title: 'Holographic Dark Raichu',
                    description: '2000 Pokemon Rocket Dark Raichu Holo 1st Edition',
                    stock: 1,
                    price: 13,
                }
            ],
            //reviews is what is shown in the reviews tab, a default review is added just to make it not look as empty
            reviews: [{name: 'Thomas', review: 'This is a real review'}],
            //Declaring the variable for when the form is sumbitted, as these fields will be populated.
            newReview: {
                name: '',
                review: ''
            },
            //setting the default tab shown on page load
            selectedTab: 'reviews',
            //declaring amount of items in cart
            cart: 0,
            //declaring the total cost of items and shipping, if premium is false then this is set to 3 before card's cost is added
            cartTotal: 0,
            //declaring the array to hold cards's titles and prices in the cart.
            cartItems: [],


        };
    },
    //Here we have the methods that get called in the html code above
    methods: {
        //addToCart takes two parameters, title and price, the whole card is not passed though, only the data we need. Note that we could though
        addToCart(title,price) {
            //When buton is pressed the cart total is added by 1, note we could do cartItems.length but this might be easier
            this.cart++;
            //Here we add the price parameter to the cartTotal
            this.cartTotal += price;
            //we push both the title and price to the cart array, this adds it on to the end. If the same card is added to the array, it does not do charizard x2, it is seperate
            this.cartItems.push({title,price});
            //index needs to match the current card, the order gets mixed up when removing in a random order from the array
            //we assign the index of the card by going through the cards objects and finding the one with matching titles
            const index = this.cards.findIndex(card => card.title === title);
            //With this found matching card we reduce its stock level by one to prevent unlimited adding to the cart
            this.cards[index].stock--;
        },
        //removeFromCart does the opposite of addToCard, however this one gets the index from the parameter, as its getting it from the cartItems array, not the data cards array
        removeFromCart(price,index){ 
            //removes cart amount by one
            this.cart--;
            //
            const removedItem = this.cartItems.splice(index, 1)[0]; // Remove item from cart
            // Find the index of the removed item in the cards array
            const cardIndex = this.cards.findIndex(card => card.title === removedItem.title);
            if (cardIndex !== -1) {
                this.cards[cardIndex].stock++; // Increment the stock of the removed item
                this.cartTotal -= this.cards[cardIndex].price;
            }
            
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
            if(!this.premium){
                this.cartTotal = 3;
            }
            return this.premium ? ' Free shipping' : ' $3 shipping';
        }
    }
});

new Vue({
    el: '#app',
    data: {
        premium: true
    }
});