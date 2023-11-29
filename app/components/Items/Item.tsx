import React from 'react';
import style from './Item.module.css';
import CartIcon from '@/assets/icons/cart.svg';
import {
	addToCart,
	decreaseQuantity,
	increaseQuantity,
	useDispatch,
} from '@/lib/redux';
import Image from 'next/image';
interface ItemProps {
	id: string;
	name: string;
	price: number;
	state: {
		quantity: number;
		inCart: boolean;
	};
}

const Item: React.FC<ItemProps> = ({ id, name, price, state }) => {
	const [istooltipVisible, setTooltipVisible] = React.useState(false);
	const dispatch = useDispatch();
	const { quantity, inCart } = state;
	return (
		<div className={style.item_div}>
			<div
				onMouseEnter={() => setTooltipVisible(true)}
				onMouseLeave={() => setTooltipVisible(false)}
				className={style.item_img}
			>
				{istooltipVisible && (
					<div className={style.cart_actions_div}>
						{inCart && (
							<div className={style.cart_actions_container}>
								<button
									onClick={() => dispatch(decreaseQuantity(id))}
									className={style.cart_actions_button}
								>
									-
								</button>
								<label className={style.cart_actions_label}>{quantity}</label>
								<button
									onClick={() => dispatch(increaseQuantity(id))}
									className={style.cart_actions_button}
								>
									+
								</button>
							</div>
						)}
						<button
							onClick={() => dispatch(addToCart(id))}
							className={style.cart_actions_icon}
						>
							<Image alt='Cart' src={CartIcon} />
						</button>
					</div>
				)}
			</div>
			<h2 className={style.item_name}>{name}</h2>
			<h1 className={style.item_price}>
				<label>{price}</label> <label>RSD</label>
			</h1>
		</div>
	);
};

export default Item;
