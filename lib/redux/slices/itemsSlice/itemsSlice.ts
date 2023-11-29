// Note: Items Slice
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Item {
	id: string;
	name: string;
	price: number;
	image: string;
	weight: string;
	oldPrice?: number;

	state: {
		inCart: boolean;
		quantity: number;
	};
}

interface ItemsSliceState {
	items: Item[];
	item_count: number;
	cart: Item[];
	cart_count: number;
	sum: number;
	saved: number;
}

const initialState: ItemsSliceState = {
	items: [],
	item_count: 0,
	cart: [],
	cart_count: 0,
	sum: 0,
	saved: 0,
};

export const itemsSlice = createSlice({
	name: 'items',
	initialState,
	reducers: {
		loadItems: (state, action: PayloadAction<Item[]>) => {
			state.items = action.payload.map((item) => ({
				...item,
				state: { inCart: false, quantity: 0 },
			}));
			state.item_count = action.payload.length;
		},
		addToCart: (state, action: PayloadAction<string>) => {
			const index = state.items.findIndex((item) => item.id === action.payload);
			state.items[index].state.inCart = true;
			state.items[index].state.quantity = 1;
			state.cart.push(state.items[index]);
			state.cart_count++;

			state.sum += state.items[index].price;

			if (state.items[index].oldPrice) {
				// @ts-ignore
				state.saved += state.items[index].oldPrice - state.items[index].price;
			}
		},

		increaseQuantity: (state, action: PayloadAction<string>) => {
			const index = state.items.findIndex((item) => item.id === action.payload);
			const cartIndex = state.cart.findIndex(
				(item) => item.id === action.payload
			);
			state.items[index].state.quantity++;
			state.cart[cartIndex].state.quantity++;
			state.cart_count++;

			state.sum += state.items[index].price;
			if (state.items[index].oldPrice) {
				// @ts-ignore
				state.saved += state.items[index].oldPrice - state.items[index].price;
			}
		},

		decreaseQuantity: (state, action: PayloadAction<string>) => {
			const index = state.items.findIndex((item) => item.id === action.payload);
			const cartIndex = state.cart.findIndex(
				(item) => item.id === action.payload
			);
			if (state.items[index].state.quantity === 1) {
				state.items[index].state.inCart = false;
			}
			if (state.cart[cartIndex].state.quantity === 1) {
				state.cart.splice(cartIndex, 1);
			} else {
				state.cart[cartIndex].state.quantity--;
			}

			state.items[index].state.quantity--;
			state.cart_count--;

			state.sum -= state.items[index].price;
			if (state.items[index].oldPrice) {
				// @ts-ignore
				state.saved -= state.items[index].oldPrice - state.items[index].price;
			}
		},

		removeFromCart: (state, action: PayloadAction<string>) => {
			const index = state.items.findIndex((item) => item.id === action.payload);
			const cartIndex = state.cart.findIndex(
				(item) => item.id === action.payload
			);
			const quantity = state.items[index].state.quantity;
			state.items[index].state.inCart = false;
			state.items[index].state.quantity = 0;
			state.cart.splice(cartIndex, 1);
			state.cart_count -= quantity;

			state.sum -= state.items[index].price * quantity;
			if (state.items[index].oldPrice) {
				state.saved -=
					// @ts-ignore
					(state.items[index].oldPrice - state.items[index].price) * quantity;
			}
		},
	},
});

export const {
	loadItems,
	addToCart,
	increaseQuantity,
	decreaseQuantity,
	removeFromCart,
} = itemsSlice.actions;
