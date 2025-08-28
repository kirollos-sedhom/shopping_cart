<!-- ✅ Day 1: Setup + Design
Goal: Pick the UI and set up your React project with Tailwind.

Choose a design from Tailwind UI, Tailwind-Kit, or Dribbble (limit to 30–60 mins).

Initialize project (Vite + React + Tailwind + Redux Toolkit)

Setup file structure and routes (React Router)

Deliverable: Project initialized with working homepage and navigation structure. -->
<!--
✅ Day 2: Product Listing Page
Goal: Create the product list page with static or dummy data.

Build ProductCard component

Map over 4–6 dummy products and render them

Style with Tailwind (hover effects, grid layout, etc.)

Deliverable: Homepage shows grid of clothes/products.  -->

<!-- ✅ Day 3: Product Details Page + Routing
Goal: View product details on a new route.

Use useParams() from React Router to fetch product ID

Show more details (price, description, image, etc.)

"Add to Cart" button

Deliverable: Clicking on a product shows a detailed view. -->

<!-- ✅ Day 4: Cart Page + Redux Setup
Goal: Build a working cart with Redux Toolkit

Create cartSlice.js (add/remove logic) ✅✅

Add to Cart from Product Details ✅✅

Create Cart Page — show products in cart ✅✅

Deliverable: Items are added and displayed in cart via Redux state. -->

<!-- ✅ Day 5: Local Storage + Quantity
Goal: Make the cart state persist + add quantity controls.

Use localStorage to persist cart state

Add "Increase/Decrease quantity" buttons

Show total price calculation

Deliverable: Cart behaves like a real cart.

مرحلة انتقالية -->

<!--  -->

/checkout: empty or placeholder for now

🧠 4. You Understand:
Why we’re using Supabase (auth, database, user-specific cart/orders)

🛠️ 5. You're Ready to Learn:
Basic Supabase Auth (signup, login, logout)

How to protect /checkout if user is not logged in

How to store user info or cart in Supabase (later)

<!--  -->

✅ Day 6: Protect Routes (Auth Placeholder)
Goal: Set up basic login system (temporary or Firebase optional)

Option 1 (Simple): Hardcoded dummy login form + store auth state in Redux

Option 2 (Advanced): Use Firebase Auth (Google Sign-In)

Redirect unauthenticated users from cart/checkout

Deliverable: Only logged-in users can access cart/checkout.

✅ Day 7: Polish UI + Responsiveness
Goal: Make everything look good on all screen sizes

Responsive Navbar + Cart badge

Mobile grid for products

Smooth transitions, hover states, loading states

Deliverable: The app is clean, responsive, and presentable.

✅ Day 8–9: Bonus Features (Optional)
Add filter/sort functionality (e.g. by price)

Add a wishlist/favorites

Add pagination or infinite scroll

Add product categories in navbar

✅ Day 10: Deployment + ReadMe
Goal: Publish your work like a professional.

Push to GitHub

Deploy to Vercel or Netlify

Write a clean README: features, tools used, how to run

📌 Phase 1: Finalize Redux Toolkit Integration
Store product data (fetched from API or dummy for now)

Add to cart / remove from cart

Persist cart state (optional: localStorage)

Show total price in /cart

Handle product details (/products/:id)

Use slices, selectors, good structure

If you finish this and can look at your code thinking “This is clean and scalable” — you're 💯 ready to move on.

📌 Phase 2: Start Supabase Integration
Here’s what you’ll be doing in that phase:

Set up a Supabase project + products table

Move product fetching to Supabase

Set up Supabase Auth (email/password)

Create login & register pages

Store logged-in user in Redux (or React Context)

Protect the /cart route

<!-- todo: ✅ fix the area of selection on each product card. i can select it by clicking outside the card -->
<!-- todo: ❌refactor local storage for saving state to use redux-persist -->
<!-- todo: ✅add on hover for user name to show message, like a small modal or a bubble/cloud, that will allow logout. -->
<!-- todo: fix emailjs logic -->
<!-- todo: ✅fix sometimes when you logout exactly after checkout, and log back in. your items are still there in cart -->
<!-- todo: fix that you can login while already logged in -->
<!-- todo: add admin page to upload products and manage site -->
